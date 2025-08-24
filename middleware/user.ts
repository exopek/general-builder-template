export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, user } = useAuth()
  
  // Protect user routes - requires authentication with user or admin role
  if (!isAuthenticated.value) {
    return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
  
  // Check if user has the required role (user or admin)
  const hasValidRole = user.value && (user.value.role === 'user' || user.value.role === 'admin')
  
  if (!hasValidRole) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access forbidden - insufficient permissions'
    })
  }
})