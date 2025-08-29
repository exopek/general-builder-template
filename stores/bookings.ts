import { defineStore } from 'pinia'
import { API_ENDPOINTS, ERROR_MESSAGES } from '~/utils/constants'
import type { Course } from './courses'
import { mockBookings, mockCourses, mockUsers, getUserBookings, delay, type MockBooking } from '~/utils/mockData'

export interface Booking {
  id: string
  userId: string
  courseId: string
  bookingDate: string
  status: number // 0=booked, 1=cancelled, 2=attended, 3=noShow
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

export interface BoookingReadDto {
  id: string
  courseSettingId: string
  bookedAt: string
  status: number
  statusAsString: string
  createdAt: string
  courseSetting: CourseSettingsReadDto
  course: CourseReadDto
}

export interface BookingRequest {
  courseId: string
  notes?: string
}

export interface BookingCreateDto {
  userId: string
  courseSettingId: string
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
        booking.userId === authStore.user?.id
      )
    },

    upcomingBookings: (state) => {
      const authStore = useAuthStore()
      const now = new Date()
      return state.bookings
        .filter(booking => {
          if (booking.userId !== authStore.user?.id) {
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
        booking.userId === authStore.user?.id
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

        const result = await $fetch<BoookingReadDto[]>(`${API_ENDPOINTS.BOOKINGS.LIST}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })

        console.log('Fetch bookings result:', result)

        if (!result) {
          return { success: false, error: 'Fehler beim Abrufen der Buchungen' }
        }

        // Get bookings with course and user details
        const bookingsWithDetails: Booking[] = result.map(booking => {
          const course = mockCourses.find(c => c.id === booking.courseSetting.courseId)
          const user = authStore.user

          return {
            id: booking.id,
            userId: user?.id || '',
            courseId: booking.courseSetting.courseId,
            bookingDate: booking.bookedAt,
            status: booking.status,
            notes: '',
            createdAt: '',
            updatedAt: '',
            course: course ? {
              id: course.id,
              title: course.title,
              description: course.description,
              instructor: course.instructor,
              date: course.startTime.split('T')[0],
              startTime: course.startTime,
              endTime: course.endTime,
              duration: course.duration,
              maxParticipants: course.maxParticipants,
              currentParticipants: course.currentParticipants,
              price: course.price,
              category: course.category,
              level: 'advanced',
              location: course.location,
              equipment: course.requirements,
              image: course.image,
              isActive: course.isActive,
              createdAt: '2024-01-01T00:00:00Z',
              updatedAt: '2024-01-01T00:00:00Z',
              bookable: true
            } : undefined,
            user: user ? {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            } : undefined
          }
        })

        this.bookings = bookingsWithDetails

        return { success: true }
      } catch (error: any) {
        console.error('Fetch bookings error:', error)
        this.error = error?.message || ERROR_MESSAGES.NETWORK_ERROR
        return { 
          success: false, 
          error: this.error || undefined 
        }
      } finally {
        this.isLoading = false
      }
    },

    async fetchMyBookings(): Promise<{ success: boolean; error?: string }> {
      try {
        this.isLoading = true
        this.error = null

        const authStore = useAuthStore()
        if (!authStore.token) {
          return { success: false, error: ERROR_MESSAGES.UNAUTHORIZED }
        }

        console.log('Fetching bookings for user:', authStore.token)

        const result = await $fetch<BoookingReadDto[]>(`${API_BASE_URL}${API_ENDPOINTS.BOOKINGS.ME}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })

        console.log('Fetch bookings result:', result)

        if (!result) {
          return { success: false, error: 'Fehler beim Abrufen der Buchungen' }
        }

        // Get bookings with course and user details
        const bookingsWithDetails: Booking[] = result.map(booking => {
          const course = booking.course
          const user = authStore.user

          return {
            id: booking.id,
            userId: user?.id || '',
            courseId: booking.courseSetting.courseId,
            bookingDate: booking.bookedAt,
            status: booking.status,
            notes: '',
            createdAt: '',
            updatedAt: '',
            course: course ? {
              id: course.id,
              title: course.title,
              description: course.description,
              instructor: 'Unbekannt',
              date: booking.courseSetting.scheduledAt.split('T')[0],
              startTime: booking.courseSetting.scheduledAt.split('T')[1],
              endTime: booking.courseSetting.scheduledAt.split('T')[1] + ':55',
              duration: 55,
              maxParticipants: booking.courseSetting.maxParticipants,
              currentParticipants: 0,
              category: '',
              level: 'advanced',
              location: 'EXOPEK Gym',
              equipment: [],
              image: course.imageUrl,
              isActive: true,
              bookable: false
            } : undefined,
            user: user ? {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            } : undefined
          }
        })

        this.bookings = bookingsWithDetails

        return { success: true }
      } catch (error: any) {
        console.error('Fetch bookings error:', error)
        this.error = error?.message || ERROR_MESSAGES.NETWORK_ERROR
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

      // Check if user has active membership
      if (authStore.isAuthenticated && !authStore.hasActiveMembership) {
        errors.push('Sie benötigen ein aktives Mitgliedsabonnement, um Kurse zu buchen.')
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

    async createBooking(bookingData: BookingCreateDto): Promise<{ success: boolean; error?: string; booking?: Booking }> {
      try {
        this.isLoading = true
        this.error = null

        /* const authStore = useAuthStore()
        if (!authStore.token || !authStore.user) {
          return { success: false, error: ERROR_MESSAGES.UNAUTHORIZED }
        } */

        const result = await $fetch(`${API_BASE_URL}${API_ENDPOINTS.BOOKINGS.CREATE}`, {
          method: 'POST',
          body: bookingData
        })

        
        /* // Create new booking
        const course = mockCourses.find(c => c.id === bookingData.courseId)
        if (!course) {
          return { success: false, error: 'Kurs nicht gefunden' }
        }

        const newBooking: Booking = {
          id: `booking-${Date.now()}`,
          userId: authStore.user.id,
          courseId: bookingData.courseId,
          bookingDate: new Date().toISOString(),
          status: 'confirmed',
          notes: bookingData.notes,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          course: {
            id: course.id,
            title: course.title,
            description: course.description,
            instructor: course.instructor,
            date: course.startTime.split('T')[0],
            startTime: course.startTime,
            endTime: course.endTime,
            duration: course.duration,
            maxParticipants: course.maxParticipants,
            currentParticipants: course.currentParticipants,
            price: course.price,
            category: course.category,
            level: course.difficulty as 'beginner' | 'intermediate' | 'advanced',
            location: course.location,
            equipment: course.requirements,
            image: course.image,
            isActive: course.isActive,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          },
          user: {
            id: authStore.user.id,
            firstName: authStore.user.firstName,
            lastName: authStore.user.lastName,
            email: authStore.user.email
          }
        }

        // Add to mock data and state
        const mockBookingData: MockBooking = {
          id: newBooking.id,
          userId: newBooking.userId,
          courseId: newBooking.courseId,
          status: newBooking.status,
          bookingDate: newBooking.bookingDate,
          notes: newBooking.notes
        }
        mockBookings.push(mockBookingData)
        
        this.bookings.push(newBooking)

        // Update course participant count
        const coursesStore = useCoursesStore()
        const storesCourse = coursesStore.courses.find(c => c.id === bookingData.courseId)
        if (storesCourse) {
          storesCourse.currentParticipants += 1
        }
        
        // Update mock course as well
        course.currentParticipants += 1 */

        return { success: true, booking: undefined }
      } catch (error: any) {
        console.error('Create booking error:', error)
        this.error = error?.message || ERROR_MESSAGES.NETWORK_ERROR
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

      if (booking.status !== 0) {
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