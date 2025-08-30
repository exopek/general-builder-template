/**
 * Main types barrel export
 * Domain models are exported first, followed by DTOs
 */

// Domain Models
export type { Course } from './course'
export type { Booking, BookingUser } from './booking'
export type { User } from './user'

// DTOs
export type { 
  CourseReadDto,
  CourseSettingsDto 
} from './course'

export type {
  BookingReadDto,
  BookingCreateDto,
  CourseSettingsDto as BookingCourseSettingsDto,
  CourseDto as BookingCourseDto
} from './booking'

export type {
  UserReadDto,
  AuthResponse,
  LoginCredentials,
  RegisterData
} from './user'

// Enums
export * from './enums'