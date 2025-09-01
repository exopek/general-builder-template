import type { CourseLevel } from './enums'

/**
 * Course domain model (for frontend)
 */
export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  date: string
  startTime: string
  endTime: string
  duration: number
  maxParticipants: number
  currentParticipants: number
  category: string
  level: CourseLevel
  location: string
  equipment?: string[]
  image?: string
  isActive: boolean
  courseSettingsId?: string
  bookable: boolean
}

/**
 * Course DTO interfaces (from backend)
 */
export interface CourseReadDto {
  id: string
  title: string
  description: string
  imageUrl: string
  difficulty: number
  bookingsCount: number
  courseSettings?: CourseSettingsDto[]
  bookable?: boolean
}

export interface CourseSettingsDto {
  id: string
  scheduledAt: string
  maxParticipants: number
  courseId: string
  bookingsCount: number
  trainerName: string
}