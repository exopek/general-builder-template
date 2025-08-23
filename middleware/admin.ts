export default defineNuxtRouteMiddleware((to, from) => {
  const { requireAdmin } = useAuth()
  
  // Protect admin routes - requires authentication with admin role
  if (!requireAdmin()) {
    return false // Navigation will be handled by requireAdmin
  }
})