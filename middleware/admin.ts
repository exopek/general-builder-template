export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, user } = useAuth()
  
  // Protect admin routes - requires authentication with admin role
  if (!isAuthenticated.value) {
    return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
  
  // Check if user has admin role
  if (user.value?.role !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access forbidden - admin permissions required'
    })
  }
})