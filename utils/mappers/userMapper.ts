import { BaseMapper } from './base'
import type { User, UserReadDto, AuthResponse, LoginCredentials, RegisterData } from '~/types'

// Re-export main types for compatibility
export type { User, UserReadDto, AuthResponse, LoginCredentials, RegisterData } from '~/types'

/**
 * User mapper implementation
 */
class UserMapperImpl extends BaseMapper<UserReadDto, User> {
  /**
   * Maps UserReadDto to User domain model
   */
  toModel(dto: UserReadDto): User {
    return {
      id: dto.id,
      email: this.mapField(dto.email, ''),
      firstName: this.mapField(dto.firstName, ''),
      lastName: this.mapField(dto.lastName, ''),
      roles: this.mapField(dto.roles, []),
      isActive: true // Assume active if returned from API
    }
  }

  /**
   * Maps login credentials to API format
   */
  mapLoginCredentials(email: string, password: string): LoginCredentials {
    return {
      userName: email, // Backend expects userName field
      password
    }
  }

  /**
   * Maps register data to API format
   */
  mapRegisterData(data: RegisterData): Omit<RegisterData, 'confirmPassword'> & { userName: string } {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      userName: data.email, // Use email as username
      password: data.password
    }
  }
}

/**
 * Singleton user mapper instance
 */
export const userMapper = new UserMapperImpl()

/**
 * Utility functions for user mapping
 */
export const UserMapperUtils = {
  /**
   * Map user DTO to domain model
   */
  mapUser: (dto: UserReadDto): User => {
    return userMapper.toModel(dto)
  },

  /**
   * Map array of user DTOs to domain models
   */
  mapUsers: (dtos: UserReadDto[]): User[] => {
    return userMapper.toModelArray(dtos)
  },

  /**
   * Create login request
   */
  createLoginRequest: (email: string, password: string): LoginCredentials => {
    return userMapper.mapLoginCredentials(email, password)
  },

  /**
   * Create register request
   */
  createRegisterRequest: (data: RegisterData) => {
    return userMapper.mapRegisterData(data)
  },

  /**
   * Get user display name
   */
  getDisplayName: (user: User): string => {
    return `${user.firstName} ${user.lastName}`.trim() || user.email
  },

  /**
   * Get user initials
   */
  getInitials: (user: User): string => {
    const firstInitial = user.firstName.charAt(0).toUpperCase()
    const lastInitial = user.lastName.charAt(0).toUpperCase()
    return `${firstInitial}${lastInitial}` || user.email.charAt(0).toUpperCase()
  },

  /**
   * Check if user has admin role
   */
  isAdmin: (user: User): boolean => {
    return user.roles.includes('admin')
  },

  /**
   * Check if user is active
   */
  isActiveUser: (user: User): boolean => {
    return user.isActive
  },

  /**
   * Validate email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * Validate password strength (basic)
   */
  isValidPassword: (password: string): boolean => {
    return password.length >= 6
  },

  /**
   * Get validation errors for registration data
   */
  validateRegistrationData: (data: RegisterData): string[] => {
    const errors: string[] = []

    if (!data.firstName.trim()) {
      errors.push('Vorname ist erforderlich')
    }

    if (!data.lastName.trim()) {
      errors.push('Nachname ist erforderlich')
    }

    if (!UserMapperUtils.isValidEmail(data.email)) {
      errors.push('Gültige E-Mail-Adresse ist erforderlich')
    }

    if (!UserMapperUtils.isValidPassword(data.password)) {
      errors.push('Passwort muss mindestens 6 Zeichen lang sein')
    }

    if (data.password !== data.confirmPassword) {
      errors.push('Passwörter stimmen nicht überein')
    }

    return errors
  }
}