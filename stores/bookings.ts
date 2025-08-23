import { defineStore } from 'pinia'
import { API_ENDPOINTS, ERROR_MESSAGES } from '~/utils/constants'
import type { Course } from './courses'

export interface Booking {
  id: string
  userId: string
  courseId: string
  bookingDate: string
  status: 'confirmed' | 'cancelled' | 'pending'
  notes?: string
  createdAt: string
  updatedAt: string
  course?: Course
  user?: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
}

export interface BookingRequest {
  courseId: string
  notes?: string
}

export interface BookingValidation {
  isValid: boolean
  errors: string[]
}

export const useBookingsStore = defineStore('bookings', {
  state: () => ({
    bookings: [] as Booking[],
    isLoading: false,
    error: null as string | null
  }),

  getters: {
    userBookings: (state) => {
      const authStore = useAuthStore()
      return state.bookings.filter(booking => 
        booking.userId === authStore.user?.id && booking.status === 'confirmed'
      )
    },

    upcomingBookings: (state) => {
      const authStore = useAuthStore()
      const now = new Date()
      return state.bookings
        .filter(booking => {
          if (booking.userId !== authStore.user?.id || booking.status !== 'confirmed') {
            return false
          }
          const courseDate = booking.course ? new Date(booking.course.date) : null
          return courseDate && courseDate >= now
        })
        .sort((a, b) => {
          const dateA = a.course ? new Date(a.course.date) : new Date(0)
          const dateB = b.course ? new Date(b.course.date) : new Date(0)
          return dateA.getTime() - dateB.getTime()
        })
    },

    bookingHistory: (state) => {
      const authStore = useAuthStore()
      const now = new Date()
      return state.bookings
        .filter(booking => {
          if (booking.userId !== authStore.user?.id) return false
          const courseDate = booking.course ? new Date(booking.course.date) : null
          return courseDate && courseDate < now
        })
        .sort((a, b) => {
          const dateA = a.course ? new Date(a.course.date) : new Date(0)
          const dateB = b.course ? new Date(b.course.date) : new Date(0)
          return dateB.getTime() - dateA.getTime() // Most recent first
        })
    },

    hasBookingForCourse: (state) => (courseId: string) => {
      const authStore = useAuthStore()
      return state.bookings.some(booking => 
        booking.courseId === courseId && 
        booking.userId === authStore.user?.id &&
        booking.status === 'confirmed'
      )
    }
  },

  actions: {
    async fetchBookings(): Promise<{ success: boolean; error?: string }> {
      try {
        this.isLoading = true
        this.error = null

        const authStore = useAuthStore()
        if (!authStore.token) {
          return { success: false, error: ERROR_MESSAGES.UNAUTHORIZED }
        }

        const bookings = await $fetch<Booking[]>(API_ENDPOINTS.BOOKINGS.LIST, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })

        this.bookings = bookings

        return { success: true }
      } catch (error: any) {
        console.error('Fetch bookings error:', error)
        this.error = error?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
        return { 
          success: false, 
          error: this.error || undefined 
        }
      } finally {
        this.isLoading = false
      }
    },

    validateBooking(courseId: string): BookingValidation {
      const errors: string[] = []
      const coursesStore = useCoursesStore()
      const authStore = useAuthStore()

      // Check if user is authenticated
      if (!authStore.isAuthenticated) {
        errors.push('Sie müssen angemeldet sein, um einen Kurs zu buchen.')
      }

      // Find the course
      const course = coursesStore.courses.find(c => c.id === courseId)
      if (!course) {
        errors.push('Kurs nicht gefunden.')
        return { isValid: false, errors }
      }

      // Check if course is active
      if (!course.isActive) {
        errors.push('Dieser Kurs ist nicht mehr verfügbar.')
      }

      // Check course capacity
      if (course.currentParticipants >= course.maxParticipants) {
        errors.push(ERROR_MESSAGES.BOOKING_FULL)
      }

      // Check if user already has booking for this course
      if (this.hasBookingForCourse(courseId)) {
        errors.push('Sie sind bereits für diesen Kurs angemeldet.')
      }

      // Check booking deadline (e.g., 2 hours before course starts)
      const courseDateTime = new Date(`${course.date}T${course.startTime}`)
      const bookingDeadline = new Date(courseDateTime.getTime() - 2 * 60 * 60 * 1000)
      const now = new Date()

      if (now > bookingDeadline) {
        errors.push(ERROR_MESSAGES.BOOKING_DEADLINE)
      }

      return {
        isValid: errors.length === 0,
        errors
      }
    },

    async createBooking(bookingData: BookingRequest): Promise<{ success: boolean; error?: string; booking?: Booking }> {
      try {
        this.isLoading = true
        this.error = null

        const authStore = useAuthStore()
        if (!authStore.token) {
          return { success: false, error: ERROR_MESSAGES.UNAUTHORIZED }
        }

        // Validate booking
        const validation = this.validateBooking(bookingData.courseId)
        if (!validation.isValid) {
          return { success: false, error: validation.errors.join(', ') }
        }

        const booking = await $fetch<Booking>(API_ENDPOINTS.BOOKINGS.CREATE, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          },
          body: bookingData
        })

        this.bookings.push(booking)

        // Update course participant count in courses store
        const coursesStore = useCoursesStore()
        const course = coursesStore.courses.find(c => c.id === bookingData.courseId)
        if (course) {
          course.currentParticipants += 1
        }

        return { success: true, booking }
      } catch (error: any) {
        console.error('Create booking error:', error)
        this.error = error?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
        return { 
          success: false, 
          error: this.error || undefined 
        }
      } finally {
        this.isLoading = false
      }
    },

    async cancelBooking(bookingId: string): Promise<{ success: boolean; error?: string }> {
      try {
        this.isLoading = true
        this.error = null

        const authStore = useAuthStore()
        if (!authStore.token) {
          return { success: false, error: ERROR_MESSAGES.UNAUTHORIZED }
        }

        // Find the booking
        const booking = this.bookings.find(b => b.id === bookingId)
        if (!booking) {
          return { success: false, error: 'Buchung nicht gefunden.' }
        }

        // Check if user owns this booking
        if (booking.userId !== authStore.user?.id) {
          return { success: false, error: ERROR_MESSAGES.UNAUTHORIZED }
        }

        // Check cancellation deadline
        if (booking.course) {
          const courseDateTime = new Date(`${booking.course.date}T${booking.course.startTime}`)
          const cancellationDeadline = new Date(courseDateTime.getTime() - 4 * 60 * 60 * 1000) // 4 hours before
          const now = new Date()

          if (now > cancellationDeadline) {
            return { success: false, error: ERROR_MESSAGES.CANCELLATION_DEADLINE }
          }
        }

        await $fetch(API_ENDPOINTS.BOOKINGS.DELETE(bookingId), {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })

        // Remove booking from state
        this.bookings = this.bookings.filter(b => b.id !== bookingId)

        // Update course participant count in courses store
        const coursesStore = useCoursesStore()
        const course = coursesStore.courses.find(c => c.id === booking.courseId)
        if (course) {
          course.currentParticipants = Math.max(0, course.currentParticipants - 1)
        }

        return { success: true }
      } catch (error: any) {
        console.error('Cancel booking error:', error)
        this.error = error?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
        return { 
          success: false, 
          error: this.error || undefined 
        }
      } finally {
        this.isLoading = false
      }
    },

    canCancelBooking(booking: Booking): { canCancel: boolean; reason?: string } {
      if (!booking.course) {
        return { canCancel: false, reason: 'Kursinformationen nicht verfügbar.' }
      }

      if (booking.status !== 'confirmed') {
        return { canCancel: false, reason: 'Nur bestätigte Buchungen können storniert werden.' }
      }

      const courseDateTime = new Date(`${booking.course.date}T${booking.course.startTime}`)
      const cancellationDeadline = new Date(courseDateTime.getTime() - 4 * 60 * 60 * 1000) // 4 hours before
      const now = new Date()

      if (now > cancellationDeadline) {
        return { canCancel: false, reason: ERROR_MESSAGES.CANCELLATION_DEADLINE }
      }

      return { canCancel: true }
    },

    clearError(): void {
      this.error = null
    }
  }
})