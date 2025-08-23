export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // This is a mock implementation for testing purposes
  // In a real application, you would validate credentials against a database
  
  const { email, password } = body
  
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email und Passwort sind erforderlich'
    })
  }
  
  // Mock user validation
  if (email === 'admin@gym.com' && password === 'admin123') {
    return {
      token: 'mock-admin-jwt-token',
      user: {
        id: '1',
        email: 'admin@gym.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  }
  
  if (email === 'user@gym.com' && password === 'user123') {
    return {
      token: 'mock-user-jwt-token',
      user: {
        id: '2',
        email: 'user@gym.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  }
  
  throw createError({
    statusCode: 401,
    statusMessage: 'Ungültige Anmeldedaten'
  })
})