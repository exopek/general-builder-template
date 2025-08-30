import { computed } from 'vue'
import { 
  BookingStatusUtils,
  CourseCategoryUtils, 
  CourseLevelUtils 
} from '~/types'
import { UserMapperUtils } from '~/utils/mappers/userMapper'
import type { Booking, Course, User } from '~/types'

/**
 * Composable for formatting values throughout the application
 */
export function useFormatters() {
  
  // Date and time formatters
  const formatDate = (dateString: string | Date): string => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string | Date): string => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString
    return date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDateTime = (dateString: string | Date): string => {
    return `${formatDate(dateString)} um ${formatTime(dateString)}`
  }

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} Min`
    }
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    if (remainingMinutes === 0) {
      return `${hours} Std`
    }
    return `${hours} Std ${remainingMinutes} Min`
  }

  // Course formatters
  const formatCourseLevel = (level: string): string => {
    return CourseLevelUtils.toLabel(level as any)
  }

  const formatCourseCategory = (category: string): string => {
    return CourseCategoryUtils.toLabel(category)
  }

  const formatCourseAvailability = (current: number, max: number): string => {
    const available = Math.max(0, max - current)
    if (available === 0) {
      return 'Ausgebucht'
    }
    if (available === 1) {
      return '1 Platz frei'
    }
    return `${available} Plätze frei`
  }

  // Booking formatters
  const formatBookingStatus = (status: number): string => {
    return BookingStatusUtils.toLabel(status)
  }

  const getBookingStatusClasses = (status: number): string => {
    return BookingStatusUtils.toClasses(status)
  }

  const canCancelBooking = (status: number): boolean => {
    return BookingStatusUtils.canCancel(status)
  }

  // User formatters
  const formatUserName = (user: User): string => {
    return UserMapperUtils.getDisplayName(user)
  }

  const getUserInitials = (user: User): string => {
    return UserMapperUtils.getInitials(user)
  }

  // Price formatters
  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatPriceShort = (amount: number): string => {
    if (amount === 0) return 'Kostenlos'
    return `${amount.toFixed(2).replace('.', ',')} €`
  }

  // Relative time formatter
  const formatRelativeTime = (dateString: string | Date): string => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString
    const now = new Date()
    const diffInMs = date.getTime() - now.getTime()
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInMs < 0) {
      // Past dates
      const absDays = Math.abs(diffInDays)
      const absHours = Math.abs(diffInHours)
      const absMinutes = Math.abs(diffInMinutes)

      if (absDays > 0) return `vor ${absDays} Tag${absDays > 1 ? 'en' : ''}`
      if (absHours > 0) return `vor ${absHours} Stunde${absHours > 1 ? 'n' : ''}`
      if (absMinutes > 0) return `vor ${absMinutes} Minute${absMinutes > 1 ? 'n' : ''}`
      return 'gerade eben'
    } else {
      // Future dates
      if (diffInDays > 0) return `in ${diffInDays} Tag${diffInDays > 1 ? 'en' : ''}`
      if (diffInHours > 0) return `in ${diffInHours} Stunde${diffInHours > 1 ? 'n' : ''}`
      if (diffInMinutes > 0) return `in ${diffInMinutes} Minute${diffInMinutes > 1 ? 'n' : ''}`
      return 'jetzt'
    }
  }

  // Course-specific helpers
  const getCourseTimeSlot = (course: Course): string => {
    return `${formatTime(course.startTime)} - ${formatTime(course.endTime)}`
  }

  const getCourseDateAndTime = (course: Course): string => {
    return `${formatDate(course.date)} • ${getCourseTimeSlot(course)}`
  }

  const getCourseFullDateTime = (course: Course): string => {
    return `${formatDate(course.startTime)} um ${formatTime(course.startTime)}`
  }

  // Booking-specific helpers  
  const getBookingDisplayInfo = (booking: Booking) => {
    return {
      statusLabel: formatBookingStatus(booking.status),
      statusClasses: getBookingStatusClasses(booking.status),
      canCancel: canCancelBooking(booking.status),
      courseDate: booking.course ? formatDate(booking.course.startTime) : '',
      courseTime: booking.course ? formatTime(booking.course.startTime) : '',
      courseDateTime: booking.course ? getCourseFullDateTime(booking.course) : '',
      bookingDate: formatDate(booking.bookingDate)
    }
  }

  return {
    // Date/time formatters
    formatDate,
    formatTime, 
    formatDateTime,
    formatDuration,
    formatRelativeTime,

    // Course formatters
    formatCourseLevel,
    formatCourseCategory, 
    formatCourseAvailability,
    getCourseTimeSlot,
    getCourseDateAndTime,
    getCourseFullDateTime,

    // Booking formatters
    formatBookingStatus,
    getBookingStatusClasses,
    canCancelBooking,
    getBookingDisplayInfo,

    // User formatters
    formatUserName,
    getUserInitials,

    // Price formatters
    formatPrice,
    formatPriceShort
  }
}

/**
 * Reactive formatters for use with computed properties
 */
export function useReactiveFormatters() {
  const formatters = useFormatters()

  const createReactiveFormatter = <T extends (...args: any[]) => any>(
    formatter: T
  ) => {
    return (...args: Parameters<T>) => computed(() => formatter(...args))
  }

  return {
    ...formatters,
    
    // Reactive versions return computed refs
    formatDateReactive: createReactiveFormatter(formatters.formatDate),
    formatTimeReactive: createReactiveFormatter(formatters.formatTime), 
    formatCourseAvailabilityReactive: createReactiveFormatter(formatters.formatCourseAvailability),
    getBookingDisplayInfoReactive: createReactiveFormatter(formatters.getBookingDisplayInfo)
  }
}