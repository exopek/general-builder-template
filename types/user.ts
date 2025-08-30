/**
 * User domain model (for frontend)
 */
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'user' | 'admin'
  isActive: boolean
}

/**
 * User DTO interfaces (from backend)
 */
export interface UserReadDto {
  id: string
  email: string
  firstName: string
  lastName: string
  userName: string
  phoneNumber?: string
  password: string
  role: 'user' | 'admin'
}

export interface AuthResponse {
  token: string
}

export interface LoginCredentials {
  userName: string
  password: string
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}