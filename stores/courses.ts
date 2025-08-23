import { defineStore } from 'pinia'
import { API_ENDPOINTS, ERROR_MESSAGES } from '~/utils/constants'

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  date: string
  startTime: string
  endTime: string
  duration: number // in minutes
  maxParticipants: number
  currentParticipants: number
  price: number
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  location: string
  equipment?: string[]
  image?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CourseFilters {
  category?: string
  level?: string
  instructor?: string
  date?: string
  available?: boolean
}

export interface CreateCourseData {
  title: string
  description: string
  instructor: string
  date: string
  startTime: string
  endTime: string
  maxParticipants: number
  price: number
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  location: string
  equipment?: string[]
  image?: string
}

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [] as Course[],
    currentCourse: null as Course | null,
    isLoading: false,
    error: null as string | null,
    filters: {} as CourseFilters,
    cache: {
      lastFetch: null as Date | null,
      ttl: 5 * 60 * 1000 // 5 minutes
    }
  }),

  getters: {
    filteredCourses: (state) => {
      let filtered = state.courses.filter(course => course.isActive)

      if (state.filters.category) {
        filtered = filtered.filter(course => course.category === state.filters.category)
      }

      if (state.filters.level) {
        filtered = filtered.filter(course => course.level === state.filters.level)
      }

      if (state.filters.instructor) {
        filtered = filtered.filter(course => 
          course.instructor.toLowerCase().includes(state.filters.instructor!.toLowerCase())
        )
      }

      if (state.filters.date) {
        filtered = filtered.filter(course => course.date === state.filters.date)
      }

      if (state.filters.available) {
        filtered = filtered.filter(course => course.currentParticipants < course.maxParticipants)
      }

      return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    },

    availableCourses: (state) => {
      return state.courses.filter(course => 
        course.isActive && course.currentParticipants < course.maxParticipants
      )
    },

    upcomingCourses: (state) => {
      const now = new Date()
      return state.courses.filter(course => {
        const courseDate = new Date(course.date)
        return course.isActive && courseDate >= now
      }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    },

    categoriesWithCounts: (state) => {
      const categories: Record<string, number> = {}
      state.courses
        .filter(course => course.isActive)
        .forEach(course => {
          categories[course.category] = (categories[course.category] || 0) + 1
        })
      return categories
    },

    isCacheValid: (state) => {
      if (!state.cache.lastFetch) return false
      return Date.now() - state.cache.lastFetch.getTime() < state.cache.ttl
    }
  },

  actions: {
    async fetchCourses(force = false): Promise<{ success: boolean; error?: string }> {
      // Use cache if valid and not forced
      if (!force && this.isCacheValid && this.courses.length > 0) {
        return { success: true }
      }

      try {
        this.isLoading = true
        this.error = null

        const authStore = useAuthStore()
        const headers: Record<string, string> = {}
        
        if (authStore.token) {
          headers.Authorization = `Bearer ${authStore.token}`
        }

        const courses = await $fetch<Course[]>(API_ENDPOINTS.COURSES.LIST, {
          headers
        })

        this.courses = courses
        this.cache.lastFetch = new Date()

        return { success: true }
      } catch (error: any) {
        console.error('Fetch courses error:', error)
        this.error = error?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
        return { 
          success: false, 
          error: this.error || undefined 
        }
      } finally {
        this.isLoading = false
      }
    },

    async fetchCourse(id: string): Promise<{ success: boolean; error?: string }> {
      try {
        this.isLoading = true
        this.error = null

        const authStore = useAuthStore()
        const headers: Record<string, string> = {}
        
        if (authStore.token) {
          headers.Authorization = `Bearer ${authStore.token}`
        }

        const course = await $fetch<Course>(API_ENDPOINTS.COURSES.DETAIL(id), {
          headers
        })

        this.currentCourse = course

        // Update course in the courses array if it exists
        const index = this.courses.findIndex(c => c.id === id)
        if (index !== -1) {
          this.courses[index] = course
        }

        return { success: true }
      } catch (error: any) {
        console.error('Fetch course error:', error)
        this.error = error?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
        return { 
          success: false, 
          error: this.error || undefined 
        }
      } finally {
        this.isLoading = false
      }
    },

    async createCourse(courseData: CreateCourseData): Promise<{ success: boolean; error?: string; course?: Course }> {
      try {
        this.isLoading = true
        this.error = null

        const authStore = useAuthStore()
        if (!authStore.token || !authStore.isAdmin) {
          return { success: false, error: ERROR_MESSAGES.UNAUTHORIZED }
        }

        const course = await $fetch<Course>(API_ENDPOINTS.COURSES.CREATE, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          },
          body: courseData
        })

        this.courses.push(course)
        this.cache.lastFetch = new Date() // Invalidate cache

        return { success: true, course }
      } catch (error: any) {
        console.error('Create course error:', error)
        this.error = error?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
        return { 
          success: false, 
          error: this.error || undefined 
        }
      } finally {
        this.isLoading = false
      }
    },

    async updateCourse(id: string, courseData: Partial<CreateCourseData>): Promise<{ success: boolean; error?: string; course?: Course }> {
      try {
        this.isLoading = true
        this.error = null

        const authStore = useAuthStore()
        if (!authStore.token || !authStore.isAdmin) {
          return { success: false, error: ERROR_MESSAGES.UNAUTHORIZED }
        }

        const course = await $fetch<Course>(API_ENDPOINTS.COURSES.UPDATE(id), {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          },
          body: courseData
        })

        // Update in courses array
        const index = this.courses.findIndex(c => c.id === id)
        if (index !== -1) {
          this.courses[index] = course
        }

        // Update current course if it matches
        if (this.currentCourse?.id === id) {
          this.currentCourse = course
        }

        return { success: true, course }
      } catch (error: any) {
        console.error('Update course error:', error)
        this.error = error?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
        return { 
          success: false, 
          error: this.error || undefined 
        }
      } finally {
        this.isLoading = false
      }
    },

    async deleteCourse(id: string): Promise<{ success: boolean; error?: string }> {
      try {
        this.isLoading = true
        this.error = null

        const authStore = useAuthStore()
        if (!authStore.token || !authStore.isAdmin) {
          return { success: false, error: ERROR_MESSAGES.UNAUTHORIZED }
        }

        await $fetch(API_ENDPOINTS.COURSES.DELETE(id), {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })

        // Remove from courses array
        this.courses = this.courses.filter(c => c.id !== id)

        // Clear current course if it matches
        if (this.currentCourse?.id === id) {
          this.currentCourse = null
        }

        return { success: true }
      } catch (error: any) {
        console.error('Delete course error:', error)
        this.error = error?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
        return { 
          success: false, 
          error: this.error || undefined 
        }
      } finally {
        this.isLoading = false
      }
    },

    checkAvailability(courseId: string): boolean {
      const course = this.courses.find(c => c.id === courseId)
      return course ? course.currentParticipants < course.maxParticipants : false
    },

    setFilters(filters: CourseFilters): void {
      this.filters = { ...filters }
    },

    clearFilters(): void {
      this.filters = {}
    },

    clearError(): void {
      this.error = null
    },

    clearCache(): void {
      this.cache.lastFetch = null
    }
  }
})