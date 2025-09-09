// 'https://exopekdemo-araxgmg9gqf6eyds.germanywestcentral-01.azurewebsites.net/api'

export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.exopek.de/api' 
  : 'https://api.exopek.de/api'

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/users/login',
    REGISTER: '/users/register', 
    LOGOUT: '/users/logout',
    ME: '/users',
    CHANGE_PASSWORD: '/v1/users/change-password'
  },
  COURSES: {
    LIST: '/v1/courses',
    DETAIL: (id: string) => `/v1/courses/${id}`,
    CREATE: '/v1/courses',
    UPDATE: (id: string) => `/v1/courses/${id}`,
    DELETE: (id: string) => `/v1/courses/${id}`,
    BOOKINGS: (id: string) => `/courses/${id}/bookings`
  },
  BOOKINGS: {
    ME: '/v1/bookings/me',
    LIST: '/v1/bookings',
    CREATE: '/v1/bookings',
    DELETE: (id: string) => `/v1/bookings/${id}`
  }
} as const

export const USER_ROLES = {
  USER: 'User',
  ADMIN: 'Admin',
  TRAINER: 'Trainer'
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