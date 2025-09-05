export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, user } = useAuth()
  
  // Protect admin routes - requires authentication with admin role
  if (!isAuthenticated.value) {
    return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
  
  const hasValidRole = user.value && (user.value.roles.includes(USER_ROLES.ADMIN) || user.value.roles.includes(USER_ROLES.TRAINER))
  // Check if user has admin role
  if (!user.value || !hasValidRole) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access forbidden - admin permissions required'
    })
  }
})