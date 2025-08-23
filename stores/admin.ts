import { defineStore } from 'pinia'
import { API_ENDPOINTS, ERROR_MESSAGES } from '~/utils/constants'
import type { Course } from './courses'
import type { Booking } from './bookings'

export interface DashboardStats {
  totalCourses: number
  totalBookings: number
  totalRevenue: number
  upcomingCourses: number
  averageBookingRate: number
}

export interface CourseParticipant {
  bookingId: string
  userId: string
  firstName: string
  lastName: string
  email: string
  bookingDate: string
  status: 'confirmed' | 'cancelled' | 'pending'
  notes?: string
}

export interface BookingOverview extends Booking {
  courseName: string
  courseDate: string
  userName: string
  userEmail: string
}

export const useAdminStore = defineStore('admin', {
  state: () => ({
    dashboardStats: null as DashboardStats | null,
    courseParticipants: {} as Record<string, CourseParticipant[]>, // courseId -> participants
    allBookings: [] as BookingOverview[],
    isLoading: false,
    error: null as string | null
  }),

  getters: {
    getParticipantsForCourse: (state) => (courseId: string) => {
      return state.courseParticipants[courseId] || []
    },

    recentBookings: (state) => {
      return state.allBookings
        .filter(booking => booking.status === 'confirmed')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10)
    },

    bookingsByStatus: (state) => {
      const stats = {
        confirmed: 0,
        cancelled: 0,
        pending: 0
      }

      state.allBookings.forEach(booking => {
        stats[booking.status] += 1
      })

      return stats
    },

    monthlyRevenue: (state) => {
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()

      return state.allBookings
        .filter(booking => {
          const bookingDate = new Date(booking.createdAt)
          return booking.status === 'confirmed' &&
                 bookingDate.getMonth() === currentMonth &&
                 bookingDate.getFullYear() === currentYear
        })
        .reduce((total, booking) => {
          // Assuming we need to get price from course data
          return total + (booking.course?.price || 0)
        }, 0)
    }
  },

  actions: {
    async fetchDashboardStats(): Promise<{ success: boolean; error?: string }> {
      try {
        this.isLoading = true
        this.error = null

        const authStore = useAuthStore()
        if (!authStore.token || !authStore.isAdmin) {
          return { success: false, error: ERROR_MESSAGES.UNAUTHORIZED }
        }

        // For now, we'll calculate stats from existing data
        // In a real app, this would be a dedicated API endpoint
        const coursesStore = useCoursesStore()
        const bookingsStore = useBookingsStore()

        // Ensure we have fresh data
        await coursesStore.fetchCourses(true)
        await bookingsStore.fetchBookings()

        const totalCourses = coursesStore.courses.filter(c => c.isActive).length
        const totalBookings = bookingsStore.bookings.filter(b => b.status === 'confirmed').length
        const totalRevenue = bookingsStore.bookings
          .filter(b => b.status === 'confirmed')
          .reduce((sum, booking) => sum + (booking.course?.price || 0), 0)

        const now = new Date()
        const upcomingCourses = coursesStore.courses.filter(course => {
          const courseDate = new Date(course.date)
          return course.isActive && courseDate >= now
        }).length

        const averageBookingRate = totalCourses > 0 
          ? Math.round((totalBookings / (totalCourses * 10)) * 100) // Assuming average 10 spots per course
          : 0

        this.dashboardStats = {
          totalCourses,
          totalBookings,
          totalRevenue,
          upcomingCourses,
          averageBookingRate
        }

        return { success: true }
      } catch (error: any) {
        console.error('Fetch dashboard stats error:', error)
        this.error = error?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
        return { 
          success: false, 
          error: this.error 
        }
      } finally {
        this.isLoading = false
      }
    },

    async fetchCourseParticipants(courseId: string): Promise<{ success: boolean; error?: string }> {
      try {
        this.isLoading = true
        this.error = null

        const authStore = useAuthStore()
        if (!authStore.token || !authStore.isAdmin) {
          return { success: false, error: ERROR_MESSAGES.UNAUTHORIZED }
        }

        const { $fetch } = useNuxtApp()
        const participants = await $fetch<CourseParticipant[]>(
          API_ENDPOINTS.COURSES.BOOKINGS(courseId),
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        )

        this.courseParticipants[courseId] = participants

        return { success: true }
      } catch (error: any) {
        console.error('Fetch course participants error:', error)
        this.error = error?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
        return { 
          success: false, 
          error: this.error 
        }
      } finally {
        this.isLoading = false
      }
    },

    async fetchAllBookings(): Promise<{ success: boolean; error?: string }> {
      try {
        this.isLoading = true
        this.error = null

        const authStore = useAuthStore()
        if (!authStore.token || !authStore.isAdmin) {
          return { success: false, error: ERROR_MESSAGES.UNAUTHORIZED }
        }

        // In a real app, this would be an admin-specific endpoint
        // For now, we'll use the regular bookings endpoint and assume admin sees all
        const { $fetch } = useNuxtApp()
        const bookings = await $fetch<BookingOverview[]>(API_ENDPOINTS.BOOKINGS.LIST + '/admin', {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })

        this.allBookings = bookings

        return { success: true }
      } catch (error: any) {
        console.error('Fetch all bookings error:', error)
        this.error = error?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
        return { 
          success: false, 
          error: this.error 
        }
      } finally {
        this.isLoading = false
      }
    },

    async exportParticipantsList(courseId: string, format: 'csv' | 'pdf' = 'csv'): Promise<{ success: boolean; error?: string; data?: Blob }> {
      try {
        this.isLoading = true
        this.error = null

        const authStore = useAuthStore()
        if (!authStore.token || !authStore.isAdmin) {
          return { success: false, error: ERROR_MESSAGES.UNAUTHORIZED }
        }

        const participants = this.courseParticipants[courseId]
        if (!participants) {
          await this.fetchCourseParticipants(courseId)
        }

        const courseParticipants = this.courseParticipants[courseId] || []
        
        if (format === 'csv') {
          const csvContent = this.generateCSV(courseParticipants)
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
          return { success: true, data: blob }
        }

        // For PDF, you would typically use a library like jsPDF
        // For now, we'll just return CSV format
        const csvContent = this.generateCSV(courseParticipants)
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        return { success: true, data: blob }

      } catch (error: any) {
        console.error('Export participants list error:', error)
        this.error = error?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
        return { 
          success: false, 
          error: this.error 
        }
      } finally {
        this.isLoading = false
      }
    },

    generateCSV(participants: CourseParticipant[]): string {
      const headers = ['Name', 'Email', 'Buchungsdatum', 'Status', 'Notizen']
      const rows = participants.map(p => [
        `${p.firstName} ${p.lastName}`,
        p.email,
        new Date(p.bookingDate).toLocaleDateString('de-DE'),
        p.status,
        p.notes || ''
      ])

      const csvContent = [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n')

      return csvContent
    },

    async updateBookingStatus(bookingId: string, status: 'confirmed' | 'cancelled'): Promise<{ success: boolean; error?: string }> {
      try {
        this.isLoading = true
        this.error = null

        const authStore = useAuthStore()
        if (!authStore.token || !authStore.isAdmin) {
          return { success: false, error: ERROR_MESSAGES.UNAUTHORIZED }
        }

        const { $fetch } = useNuxtApp()
        await $fetch(`/api/admin/bookings/${bookingId}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          },
          body: { status }
        })

        // Update local state
        const booking = this.allBookings.find(b => b.id === bookingId)
        if (booking) {
          booking.status = status
        }

        return { success: true }
      } catch (error: any) {
        console.error('Update booking status error:', error)
        this.error = error?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
        return { 
          success: false, 
          error: this.error 
        }
      } finally {
        this.isLoading = false
      }
    },

    getBookingsForCourse(courseId: string): BookingOverview[] {
      return this.allBookings.filter(booking => booking.courseId === courseId)
    },

    getBookingsForTimeRange(startDate: Date, endDate: Date): BookingOverview[] {
      return this.allBookings.filter(booking => {
        const bookingDate = new Date(booking.createdAt)
        return bookingDate >= startDate && bookingDate <= endDate
      })
    },

    clearError(): void {
      this.error = null
    },

    clearCache(): void {
      this.dashboardStats = null
      this.courseParticipants = {}
      this.allBookings = []
    }
  }
})