export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  
  // Initialize auth state if not already done
  if (process.client) {
    authStore.initializeAuth()
  }
  
  // Check authentication
  if (!authStore.isAuthenticated) {
    return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
  
  // If user data is not loaded but we have a token, fetch user data
  if (authStore.isAuthenticated && !authStore.user && authStore.token) {
    await authStore.fetchCurrentUser()
  }
  
  // Final check - if still no user data, redirect to login
  if (!authStore.user) {
    authStore.clearAuthState()
    return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
  
  // Check if user has the required role (user or admin)
  const hasValidRole = authStore.user && (
    authStore.user.roles.includes(USER_ROLES.USER) || 
    authStore.user.roles.includes(USER_ROLES.ADMIN) || 
    authStore.user.roles.includes(USER_ROLES.TRAINER)
  )
  
  if (!hasValidRole) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access forbidden - insufficient permissions'
    })
  }
})