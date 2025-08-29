import { USER_ROLES } from '~/utils/constants'
import type { User } from '~/stores/auth'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  // Reactive getters
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.user)
  const isAdmin = computed(() => authStore.isAdmin)
  const isUser = computed(() => authStore.isUser)
  const isLoading = computed(() => authStore.isLoading)

  // Authentication methods
  const login = async (credentials: { userName: string; password: string }) => {
    console.log('Attempting login with credentials:', credentials)
    const result = await authStore.login(credentials)
    
    if (result.success && authStore.user) {
      // Redirect based on user role
      await redirectAfterLogin(authStore.user)
    }
    
    return result
  }

  const register = async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) => {
    const result = await authStore.register(userData)
    
    if (result.success && authStore.user) {
      // Redirect to user dashboard after registration
      await navigateTo('/user')
    }
    
    return result
  }

  const logout = async () => {
    await authStore.logout()
  }

  // Role-based redirects
  const redirectAfterLogin = async (user: User) => {
    const redirectTo = router.currentRoute.value.query.redirect as string
    
    if (redirectTo) {
      // Redirect to intended page
      await navigateTo(redirectTo)
    } else if (user.role === USER_ROLES.ADMIN) {
      // Admin goes to admin dashboard
      await navigateTo('/admin')
    } else {
      // Regular user goes to user dashboard
      await navigateTo('/user')
    }
  }

  // Permission checking
  const hasRole = (role: 'user' | 'admin'): boolean => {
    return authStore.checkPermission(role)
  }

  const requireAuth = (redirectTo?: string) => {
    if (!isAuthenticated.value) {
      const currentRoute = router.currentRoute.value.fullPath
      const redirect = redirectTo || currentRoute
      navigateTo(`/auth/login?redirect=${encodeURIComponent(redirect)}`)
      return false
    }
    return true
  }

  const requireRole = (role: 'user' | 'admin', redirectTo?: string) => {
    if (!requireAuth(redirectTo)) {
      return false
    }

    if (!hasRole(role)) {
      // Redirect to appropriate dashboard based on current role
      if (authStore.user?.role === USER_ROLES.ADMIN) {
        navigateTo('/admin')
      } else {
        navigateTo('/user')
      }
      return false
    }

    return true
  }

  const requireAdmin = (redirectTo?: string) => {
    return requireRole('admin', redirectTo)
  }

  const requireUser = (redirectTo?: string) => {
    return requireRole('user', redirectTo)
  }

  // Initialize auth state on app startup
  const initAuth = () => {
    authStore.initializeAuth()
  }

  // Refresh current user data
  const refreshUser = async () => {
    return await authStore.fetchCurrentUser()
  }

  // Route protection utilities
  const canAccess = (requiredRole?: 'user' | 'admin'): boolean => {
    if (!isAuthenticated.value) return false
    if (!requiredRole) return true
    return hasRole(requiredRole)
  }

  const shouldRedirect = (requiredRole?: 'user' | 'admin'): string | null => {
    if (!isAuthenticated.value) {
      return '/auth/login'
    }
    
    if (requiredRole && !hasRole(requiredRole)) {
      // Redirect to appropriate dashboard
      return authStore.user?.role === USER_ROLES.ADMIN ? '/admin' : '/user'
    }
    
    return null
  }

  // Navigation guards
  const protectRoute = (requiredRole?: 'user' | 'admin') => {
    const redirect = shouldRedirect(requiredRole)
    if (redirect) {
      const currentRoute = router.currentRoute.value.fullPath
      if (redirect === '/auth/login') {
        navigateTo(`${redirect}?redirect=${encodeURIComponent(currentRoute)}`)
      } else {
        navigateTo(redirect)
      }
      return false
    }
    return true
  }

  return {
    // State
    isAuthenticated,
    user,
    isAdmin,
    isUser,
    isLoading,

    // Actions
    login,
    register,
    logout,
    initAuth,
    refreshUser,

    // Permissions
    hasRole,
    canAccess,
    shouldRedirect,

    // Guards
    requireAuth,
    requireRole,
    requireAdmin,
    requireUser,
    protectRoute,

    // Utilities
    redirectAfterLogin
  }
}

