import type { Course } from './course'

/**
 * Booking domain model (for frontend)
 */
export interface Booking {
  id: string
  userId: string
  courseId: string
  bookingDate: string
  status: number
  notes?: string
  createdAt: string
  updatedAt: string
  course?: Course
  user?: BookingUser
}

/**
 * User info for booking
 */
export interface BookingUser {
  id: string
  firstName: string
  lastName: string
  email: string
}

/**
 * Booking DTO interfaces (from backend)
 */
export interface BookingReadDto {
  id: string
  courseSettingId: string
  bookedAt: string
  status: number
  statusAsString: string
  createdAt: string
  courseSetting: CourseSettingsDto
  course: CourseDto
}

export interface BookingCreateDto {
  userId: string
  courseSettingId: string
}

/**
 * Simplified DTOs for booking context
 */
export interface CourseSettingsDto {
  id: string
  scheduledAt: string
  maxParticipants: number
  courseId: string
  trainerName: string
}

export interface CourseDto {
  id: string
  title: string
  description: string
  imageUrl: string
  difficulty: number
  bookingsCount: number
}