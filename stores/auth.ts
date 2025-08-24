import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { API_ENDPOINTS, USER_ROLES, STORAGE_KEYS, ERROR_MESSAGES } from '~/utils/constants'
import { findUser, delay } from '~/utils/mockData'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'user' | 'admin'
  createdAt: string
  updatedAt: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

interface AuthResponse {
  token: string
  user: User
}

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
    isAdmin: (state) => state.user?.role === USER_ROLES.ADMIN,
    isUser: (state) => state.user?.role === USER_ROLES.USER,
    fullName: (state) => state.user ? `${state.user.firstName} ${state.user.lastName}` : ''
  },

  actions: {
    async login(credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> {
      try {
        this.isLoading = true
        
        // Use mock data instead of API call
        await delay(800) // Simulate network delay
        
        const mockUser = findUser(credentials.email, credentials.password)
        if (!mockUser) {
          return { 
            success: false, 
            error: 'Ungültige Anmeldedaten' 
          }
        }

        // Create a mock JWT token
        const mockToken = `mock-jwt-token-${mockUser.id}-${Date.now()}`
        
        // Map mock user to store user format
        const user: User = {
          id: mockUser.id,
          email: mockUser.email,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          role: mockUser.role,
          createdAt: mockUser.memberSince,
          updatedAt: mockUser.memberSince
        }

        this.token = mockToken
        this.user = user
        this.isAuthenticated = true

        // Store in localStorage for persistence
        if (process.client) {
          localStorage.setItem(STORAGE_KEYS.TOKEN, mockToken)
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
        this.user = response.user
        this.isAuthenticated = true

        // Store in localStorage for persistence
        if (process.client) {
          localStorage.setItem(STORAGE_KEYS.TOKEN, response.token)
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user))
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

    checkPermission(requiredRole: 'user' | 'admin'): boolean {
      if (!this.isAuthenticated || !this.user) return false
      
      if (requiredRole === 'admin') {
        return this.user.role === 'admin'
      }
      
      // For 'user' role, both 'user' and 'admin' are allowed
      return this.user.role === 'user' || this.user.role === 'admin'
    }
  }
})