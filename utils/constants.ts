export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com/api' 
  : '/api'

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register', 
    LOGOUT: '/auth/logout',
    ME: '/auth/me'
  },
  COURSES: {
    LIST: '/courses',
    DETAIL: (id: string) => `/courses/${id}`,
    CREATE: '/courses',
    UPDATE: (id: string) => `/courses/${id}`,
    DELETE: (id: string) => `/courses/${id}`,
    BOOKINGS: (id: string) => `/courses/${id}/bookings`
  },
  BOOKINGS: {
    LIST: '/bookings',
    CREATE: '/bookings',
    DELETE: (id: string) => `/bookings/${id}`
  }
} as const

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
} as const

export const STORAGE_KEYS = {
  TOKEN: 'gym_auth_token',
  USER: 'gym_user'
} as const

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Netzwerkfehler. Bitte versuchen Sie es später erneut.',
  UNAUTHORIZED: 'Sie sind nicht berechtigt, diese Aktion auszuführen.',
  FORBIDDEN: 'Zugriff verweigert.',
  NOT_FOUND: 'Die angeforderte Ressource wurde nicht gefunden.',
  VALIDATION_ERROR: 'Eingabefehler. Bitte überprüfen Sie Ihre Daten.',
  BOOKING_FULL: 'Der Kurs ist bereits ausgebucht.',
  BOOKING_DEADLINE: 'Die Anmeldefrist ist abgelaufen.',
  CANCELLATION_DEADLINE: 'Die Stornierungsfrist ist abgelaufen.'
} as const