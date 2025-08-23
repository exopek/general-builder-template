export default defineNuxtRouteMiddleware((to, from) => {
  const { requireUser } = useAuth()
  
  // Protect user routes - requires authentication with user or admin role
  if (!requireUser()) {
    return false // Navigation will be handled by requireUser
  }
})