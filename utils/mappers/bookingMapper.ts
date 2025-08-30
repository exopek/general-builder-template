import { BaseMapper } from './base'
import type { Booking, BookingReadDto, BookingUser, Course } from '~/types'
import { BookingStatusUtils } from '~/types'
import { SharedMapperUtils } from './shared'

// Re-export main types for compatibility
export type { Booking, BookingReadDto, BookingCreateDto, BookingUser } from '~/types'

/**
 * Booking mapper implementation
 */
class BookingMapperImpl extends BaseMapper<BookingReadDto, Booking> {
  /**
   * Maps BookingReadDto to Booking domain model
   */
  toModel(dto: BookingReadDto, user?: BookingUser): Booking {
    return {
      id: dto.id,
      userId: user?.id || '',
      courseId: dto.courseSetting.courseId,
      bookingDate: dto.bookedAt,
      status: dto.status,
      notes: '', // Could be extended in DTO
      createdAt: dto.createdAt,
      updatedAt: dto.createdAt, // Use createdAt as default
      course: this.mapCourse(dto),
      user: user
    }
  }

  /**
   * Maps course data from booking DTO to Course model
   */
  private mapCourse(dto: BookingReadDto): Course {
    const scheduledDate = new Date(dto.courseSetting.scheduledAt)
    
    return {
      id: dto.course.id,
      title: dto.course.title,
      description: dto.course.description,
      instructor: 'Trainer', // Default
      date: this.parseDate(dto.courseSetting.scheduledAt),
      startTime: dto.courseSetting.scheduledAt,
      endTime: this.calculateEndTime(scheduledDate, 60), // Default 60min
      duration: 60, // Default duration
      maxParticipants: dto.courseSetting.maxParticipants,
      currentParticipants: dto.course.bookingsCount,
      category: this.mapCategoryFromTitle(dto.course.title),
      level: this.mapLevelFromDifficulty(dto.course.difficulty),
      location: 'EXOPEK GYM',
      equipment: [],
      image: dto.course.imageUrl,
      isActive: true,
      courseSettingsId: dto.courseSetting.id,
      bookable: false // Booking exists, so not bookable anymore by same user
    }
  }

  /**
   * Calculate end time based on start time and duration
   */
  private calculateEndTime(startTime: Date, durationMinutes: number): string {
    return SharedMapperUtils.calculateEndTime(startTime, durationMinutes)
  }

  /**
   * Map course title to category (simple heuristic)
   */
  private mapCategoryFromTitle(title: string): string {
    return SharedMapperUtils.mapCategoryFromTitle(title)
  }

  /**
   * Map difficulty number to course level
   */
  private mapLevelFromDifficulty(difficulty: number): 'beginner' | 'intermediate' | 'advanced' {
    return SharedMapperUtils.mapLevelFromDifficulty(difficulty)
  }

  /**
   * Map array of BookingReadDto to Booking array
   */
  toModelArray(dtos: BookingReadDto[], user?: BookingUser): Booking[] {
    return dtos.map(dto => this.toModel(dto, user))
  }
}

/**
 * Singleton booking mapper instance
 */
export const bookingMapper = new BookingMapperImpl()

/**
 * Utility functions for booking mapping
 */
export const BookingMapperUtils = {
  /**
   * Map single booking DTO to domain model
   */
  mapBooking: (dto: BookingReadDto, user?: BookingUser): Booking => {
    return bookingMapper.toModel(dto, user)
  },

  /**
   * Map array of booking DTOs to domain models
   */
  mapBookings: (dtos: BookingReadDto[], user?: BookingUser): Booking[] => {
    return bookingMapper.toModelArray(dtos, user)
  },

  /**
   * Create booking request DTO
   */
  createBookingRequest: (userId: string, courseSettingsId: string): BookingCreateDto => {
    return {
      userId,
      courseSettingId: courseSettingsId
    }
  },

  /**
   * Get formatted booking status
   */
  getStatusInfo: (booking: Booking) => {
    return {
      label: BookingStatusUtils.toLabel(booking.status),
      classes: BookingStatusUtils.toClasses(booking.status),
      canCancel: BookingStatusUtils.canCancel(booking.status),
      isActive: BookingStatusUtils.isActive(booking.status)
    }
  },

  /**
   * Filter bookings by status
   */
  filterByStatus: (bookings: Booking[], status: number): Booking[] => {
    return bookings.filter(booking => booking.status === status)
  },

  /**
   * Filter upcoming bookings
   */
  filterUpcoming: (bookings: Booking[]): Booking[] => {
    const now = new Date()
    return bookings.filter(booking => {
      if (!booking.course) return false
      const courseDate = new Date(booking.course.startTime)
      return courseDate >= now && BookingStatusUtils.isActive(booking.status)
    })
  },

  /**
   * Filter past bookings
   */
  filterPast: (bookings: Booking[]): Booking[] => {
    const now = new Date()
    return bookings.filter(booking => {
      if (!booking.course) return false
      const courseDate = new Date(booking.course.startTime)
      return courseDate < now
    })
  },

  /**
   * Sort bookings by course date
   */
  sortByDate: (bookings: Booking[], ascending = true): Booking[] => {
    return [...bookings].sort((a, b) => {
      const dateA = a.course ? new Date(a.course.startTime) : new Date(0)
      const dateB = b.course ? new Date(b.course.startTime) : new Date(0)
      return ascending 
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    })
  }
}