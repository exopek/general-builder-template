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
    console.log('user roles on login:', user.roles)
    if (redirectTo) {
      console.log('Navigating to redirect URL:', redirectTo)
      // Redirect to intended page
      await navigateTo(redirectTo)
    } else if (user.roles.includes(USER_ROLES.ADMIN) || user.roles.includes(USER_ROLES.TRAINER)) {
      console.log('User is admin or trainer, redirecting to /admin')
      // Admin goes to admin dashboard
      await navigateTo('/admin')
    } else {
      console.log('User is regular user, redirecting to /user')
      // Regular user goes to user dashboard
      await navigateTo('/user')
    }
  }

  // Permission checking
  const hasRole = (role: string): boolean => {
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

  const requireRole = (role: string, redirectTo?: string) => {
    if (!requireAuth(redirectTo)) {
      return false
    }

    if (!hasRole(role)) {
      // Redirect to appropriate dashboard based on current role
      if (authStore.user?.roles.includes(USER_ROLES.ADMIN) || authStore.user?.roles.includes(USER_ROLES.TRAINER)) {
        navigateTo('/admin')
      } else {
        navigateTo('/user')
      }
      return false
    }

    return true
  }

  const requireAdmin = (redirectTo?: string) => {
    return requireRole(USER_ROLES.ADMIN, redirectTo)
  }

  const requireUser = (redirectTo?: string) => {
    return requireRole(USER_ROLES.USER, redirectTo)
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
  const canAccess = (requiredRole?: string): boolean => {
    if (!isAuthenticated.value) return false
    if (!requiredRole) return true
    return hasRole(requiredRole)
  }

  const shouldRedirect = (requiredRole?: string): string | null => {
    if (!isAuthenticated.value) {
      return '/auth/login'
    }
    
    if (requiredRole && !hasRole(requiredRole)) {
      // Redirect to appropriate dashboard
      return authStore.user?.roles.includes(USER_ROLES.ADMIN) || authStore.user?.roles.includes(USER_ROLES.TRAINER) ? '/admin' : '/user'
    }
    
    return null
  }

  // Navigation guards
  const protectRoute = (requiredRole?: string) => {
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

