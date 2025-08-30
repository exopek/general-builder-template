import { computed, type ComputedRef } from 'vue'
import { 
  BookingStatusUtils,
  CourseCategoryUtils, 
  CourseLevelUtils,
  type CourseCategory,
  type CourseLevel 
} from '~/types'

/**
 * Composable for enum-related operations and options
 */
export function useEnumHelpers() {
  
  // Course category helpers
  const courseCategoryOptions = computed(() => 
    CourseCategoryUtils.getAllCategories()
  )

  const getCourseCategoryLabel = (category: string): string => {
    return CourseCategoryUtils.toLabel(category)
  }

  const getCourseCategoryClasses = (category: string): string => {
    return CourseCategoryUtils.toClasses(category)
  }

  const getCourseCategoryIcon = (category: string): string => {
    return CourseCategoryUtils.getIcon(category)
  }

  // Course level helpers
  const courseLevelOptions = computed(() => 
    CourseLevelUtils.getAllLevels()
  )

  const getCourseLevelLabel = (level: CourseLevel): string => {
    return CourseLevelUtils.toLabel(level)
  }

  const getCourseLevelClasses = (level: CourseLevel): string => {
    return CourseLevelUtils.toClasses(level)
  }

  const getCourseLevelDifficulty = (level: CourseLevel): number => {
    return CourseLevelUtils.getDifficulty(level)
  }

  // Booking status helpers
  const bookingStatusOptions = computed(() => 
    BookingStatusUtils.getAllStatuses()
  )

  const getBookingStatusLabel = (status: number): string => {
    return BookingStatusUtils.toLabel(status)
  }

  const getBookingStatusClasses = (status: number): string => {
    return BookingStatusUtils.toClasses(status)
  }

  const canCancelBooking = (status: number): boolean => {
    return BookingStatusUtils.canCancel(status)
  }

  const isActiveBooking = (status: number): boolean => {
    return BookingStatusUtils.isActive(status)
  }

  // Filtering helpers
  const createCategoryFilter = (categories: string[]) => {
    return computed(() => (course: { category: string }) => 
      categories.length === 0 || categories.includes(course.category)
    )
  }

  const createLevelFilter = (levels: CourseLevel[]) => {
    return computed(() => (course: { level: CourseLevel }) => 
      levels.length === 0 || levels.includes(course.level)
    )
  }

  const createStatusFilter = (statuses: number[]) => {
    return computed(() => (booking: { status: number }) => 
      statuses.length === 0 || statuses.includes(booking.status)
    )
  }

  // Sorting helpers
  const createCategorySorter = (ascending = true) => {
    return (a: { category: string }, b: { category: string }) => {
      const labelA = getCourseCategoryLabel(a.category)
      const labelB = getCourseCategoryLabel(b.category)
      return ascending 
        ? labelA.localeCompare(labelB, 'de-DE')
        : labelB.localeCompare(labelA, 'de-DE')
    }
  }

  const createLevelSorter = (ascending = true) => {
    return (a: { level: CourseLevel }, b: { level: CourseLevel }) => {
      const diffA = getCourseLevelDifficulty(a.level)
      const diffB = getCourseLevelDifficulty(b.level)
      return ascending ? diffA - diffB : diffB - diffA
    }
  }

  const createStatusSorter = (ascending = true) => {
    return (a: { status: number }, b: { status: number }) => {
      const labelA = getBookingStatusLabel(a.status)
      const labelB = getBookingStatusLabel(b.status)
      return ascending 
        ? labelA.localeCompare(labelB, 'de-DE')
        : labelB.localeCompare(labelA, 'de-DE')
    }
  }

  // Search helpers
  const createCategorySearchFilter = (searchTerm: string) => {
    return computed(() => (course: { category: string }) => {
      if (!searchTerm.trim()) return true
      const categoryLabel = getCourseCategoryLabel(course.category).toLowerCase()
      const searchLower = searchTerm.toLowerCase()
      return categoryLabel.includes(searchLower)
    })
  }

  const createLevelSearchFilter = (searchTerm: string) => {
    return computed(() => (course: { level: CourseLevel }) => {
      if (!searchTerm.trim()) return true
      const levelLabel = getCourseLevelLabel(course.level).toLowerCase()
      const searchLower = searchTerm.toLowerCase()
      return levelLabel.includes(searchLower)
    })
  }

  // Validation helpers
  const isValidCategory = (category: string): category is CourseCategory => {
    return CourseCategoryUtils.isValid(category)
  }

  const isValidLevel = (level: string): level is CourseLevel => {
    return ['beginner', 'intermediate', 'advanced'].includes(level)
  }

  const isValidBookingStatus = (status: number): boolean => {
    return [0, 1, 2, 3].includes(status)
  }

  // Aggregate helpers
  const getCategoryDistribution = <T extends { category: string }>(items: T[]) => {
    return computed(() => {
      const distribution: Record<string, number> = {}
      items.forEach(item => {
        const label = getCourseCategoryLabel(item.category)
        distribution[label] = (distribution[label] || 0) + 1
      })
      return distribution
    })
  }

  const getLevelDistribution = <T extends { level: CourseLevel }>(items: T[]) => {
    return computed(() => {
      const distribution: Record<string, number> = {}
      items.forEach(item => {
        const label = getCourseLevelLabel(item.level)
        distribution[label] = (distribution[label] || 0) + 1
      })
      return distribution
    })
  }

  const getStatusDistribution = <T extends { status: number }>(items: T[]) => {
    return computed(() => {
      const distribution: Record<string, number> = {}
      items.forEach(item => {
        const label = getBookingStatusLabel(item.status)
        distribution[label] = (distribution[label] || 0) + 1
      })
      return distribution
    })
  }

  return {
    // Options for dropdowns/selects
    courseCategoryOptions,
    courseLevelOptions,
    bookingStatusOptions,

    // Label and style getters
    getCourseCategoryLabel,
    getCourseCategoryClasses,
    getCourseCategoryIcon,
    getCourseLevelLabel,
    getCourseLevelClasses,
    getCourseLevelDifficulty,
    getBookingStatusLabel,
    getBookingStatusClasses,

    // Status helpers
    canCancelBooking,
    isActiveBooking,

    // Filter creators
    createCategoryFilter,
    createLevelFilter, 
    createStatusFilter,

    // Sorter creators
    createCategorySorter,
    createLevelSorter,
    createStatusSorter,

    // Search filter creators
    createCategorySearchFilter,
    createLevelSearchFilter,

    // Validation helpers
    isValidCategory,
    isValidLevel,
    isValidBookingStatus,

    // Distribution helpers
    getCategoryDistribution,
    getLevelDistribution,
    getStatusDistribution
  }
}