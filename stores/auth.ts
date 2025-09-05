import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { API_ENDPOINTS, USER_ROLES, STORAGE_KEYS, ERROR_MESSAGES } from '~/utils/constants'
import { 
  UserMapperUtils,
  type User,
  type UserReadDto,
  type LoginCredentials,
  type RegisterData,
  type AuthResponse
} from '~/utils/mappers/userMapper'

interface JwtPayload {
  sub: string
  email: string
  role: string
  exp: number
  iat: number
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isLoading: false,
    isAuthenticated: false
  }),

  getters: {
    isAdmin: (state) => state.user?.roles.includes(USER_ROLES.ADMIN) === true,
    isUser: (state) => state.user?.roles.includes(USER_ROLES.USER) === true,
    isTrainer: (state) => state.user?.roles.includes(USER_ROLES.TRAINER) === true,
    fullName: (state) => state.user ? `${state.user.firstName} ${state.user.lastName}` : '',
    hasActiveMembership: (state) => state.user?.isActive === true
  },

  actions: {
    async login(credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> {
      try {
        this.isLoading = true
        
        const tokenResult = await $fetch<AuthResponse>(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
          method: 'POST',
          body: credentials
        })

        console.log('Login token result:', tokenResult.token)
        
        
        if (!tokenResult) {
          return { 
            success: false, 
            error: 'Ungültige Anmeldedaten' 
          }
        }

        const userResult = await $fetch<UserReadDto>(`${API_BASE_URL}${API_ENDPOINTS.AUTH.ME}`, {
          headers: {
            Authorization: `Bearer ${tokenResult.token}`
          }
        })

        console.log('Fetched user data:', userResult)

        if (!userResult) {
          return { 
            success: false, 
            error: 'Fehler beim Abrufen der Benutzerdaten' 
          }
        }
        
        // Map user to store user format using mapper
        const user = UserMapperUtils.mapUser(userResult)

        this.token = tokenResult.token
        this.user = user
        this.isAuthenticated = true

        // Store in localStorage for persistence
        if (process.client) {
          localStorage.setItem(STORAGE_KEYS.TOKEN, tokenResult.token)
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
        }

        return { success: true }
      } catch (error: any) {
        console.error('Login error:', error)
        return { 
          success: false, 
          error: error?.message || ERROR_MESSAGES.NETWORK_ERROR 
        }
      } finally {
        this.isLoading = false
      }
    },

    async register(userData: RegisterData): Promise<{ success: boolean; error?: string }> {
      try {
        this.isLoading = true
        
        const response = await $fetch<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, {
          method: 'POST',
          body: userData
        })

        this.token = response.token
        
        this.isAuthenticated = true

        // Store in localStorage for persistence
        if (process.client) {
          localStorage.setItem(STORAGE_KEYS.TOKEN, response.token)
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(null))
        }

        return { success: true }
      } catch (error: any) {
        console.error('Register error:', error)
        return { 
          success: false, 
          error: error?.data?.message || ERROR_MESSAGES.NETWORK_ERROR 
        }
      } finally {
        this.isLoading = false
      }
    },

    async logout(): Promise<void> {
      try {
        // Simulate API call delay
        await delay(300)
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        // Clear state
        this.user = null
        this.token = null
        this.isAuthenticated = false

        // Clear localStorage
        if (process.client) {
          localStorage.removeItem(STORAGE_KEYS.TOKEN)
          localStorage.removeItem(STORAGE_KEYS.USER)
        }

        // Redirect to home page
        await navigateTo('/')
      }
    },

    async fetchCurrentUser(): Promise<void> {
      if (!this.token) return

      try {
        const user = await $fetch<User>(API_ENDPOINTS.AUTH.ME, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })

        this.user = user
        this.isAuthenticated = true

        if (process.client) {
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
        }
      } catch (error) {
        console.error('Fetch current user error:', error)
        // Token might be invalid, clear auth state
        this.clearAuthState()
      }
    },

    initializeAuth(): void {
      if (!process.client) return

      const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
      const userData = localStorage.getItem(STORAGE_KEYS.USER)

      if (token && userData) {
        try {
          // For mock tokens, just check if they exist
          if (token.startsWith('mock-jwt-token-')) {
            this.token = token
            this.user = JSON.parse(userData)
            this.isAuthenticated = true
          } else {
            // For real JWT tokens, check expiration
            const decoded = jwtDecode<JwtPayload>(token)
            if (decoded.exp * 1000 > Date.now()) {
              this.token = token
              this.user = JSON.parse(userData)
              this.isAuthenticated = true
            } else {
              // Token expired, clear storage
              this.clearAuthState()
            }
          }
        } catch (error) {
          console.error('Token decode error:', error)
          this.clearAuthState()
        }
      }
    },

    clearAuthState(): void {
      this.user = null
      this.token = null
      this.isAuthenticated = false

      if (process.client) {
        localStorage.removeItem(STORAGE_KEYS.TOKEN)
        localStorage.removeItem(STORAGE_KEYS.USER)
      }
    },

    checkPermission(requiredRole: string): boolean {
      if (!this.isAuthenticated || !this.user) return false
      
      if (requiredRole === USER_ROLES.ADMIN) {
        return true
      }

      if (requiredRole === USER_ROLES.TRAINER) {
        return this.user.roles.includes(USER_ROLES.TRAINER) || this.user.roles.includes(USER_ROLES.ADMIN)
      }
      
      // For 'user' role, both 'user' and 'admin' are allowed
      return this.user.roles.includes(USER_ROLES.ADMIN) || this.user.roles.includes(USER_ROLES.USER) || this.user.roles.includes(USER_ROLES.TRAINER)
    },

    async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
      if (!this.isAuthenticated || !this.token) {
        return { 
          success: false, 
          error: 'Sie müssen angemeldet sein, um das Passwort zu ändern' 
        }
      }

      try {
        this.isLoading = true
        
        await $fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.CHANGE_PASSWORD}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          body: {
            currentPassword,
            newPassword
          }
        })

        return { success: true }
      } catch (error: any) {
        console.error('Change password error:', error)
        return { 
          success: false, 
          error: error?.data?.message || 'Fehler beim Ändern des Passworts' 
        }
      } finally {
        this.isLoading = false
      }
    }
  }
})