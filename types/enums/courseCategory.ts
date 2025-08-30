/**
 * Course category enumeration and mapping utilities
 */
export type CourseCategory = 'fitness' | 'wellness' | 'cardio' | 'strength'

/**
 * German labels for course categories
 */
export const COURSE_CATEGORY_LABELS: Record<CourseCategory, string> = {
  fitness: 'Fitness',
  wellness: 'Wellness',
  cardio: 'Ausdauer',
  strength: 'Krafttraining'
} as const

/**
 * CSS classes for course category display
 */
export const COURSE_CATEGORY_CLASSES: Record<CourseCategory, string> = {
  fitness: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  wellness: 'bg-purple-100 text-purple-800 border-purple-200',
  cardio: 'bg-orange-100 text-orange-800 border-orange-200',
  strength: 'bg-emerald-100 text-emerald-800 border-emerald-200'
} as const

/**
 * Icons for course categories
 */
export const COURSE_CATEGORY_ICONS: Record<CourseCategory, string> = {
  fitness: '💪',
  wellness: '🧘‍♀️',
  cardio: '🏃‍♂️', 
  strength: '🏋️‍♂️'
} as const

/**
 * Default category when none specified
 */
export const DEFAULT_CATEGORY: CourseCategory = 'fitness'

/**
 * Utility functions for course categories
 */
export const CourseCategoryUtils = {
  /**
   * Convert category to German label
   */
  toLabel: (category: CourseCategory | string): string => {
    return COURSE_CATEGORY_LABELS[category as CourseCategory] || 'Allgemein'
  },

  /**
   * Convert category to CSS classes
   */
  toClasses: (category: CourseCategory | string): string => {
    return COURSE_CATEGORY_CLASSES[category as CourseCategory] || 'bg-gray-100 text-gray-800 border-gray-200'
  },

  /**
   * Get icon for category
   */
  getIcon: (category: CourseCategory | string): string => {
    return COURSE_CATEGORY_ICONS[category as CourseCategory] || '📚'
  },

  /**
   * Get all available categories
   */
  getAllCategories: (): Array<{ value: CourseCategory; label: string; icon: string }> => {
    return Object.entries(COURSE_CATEGORY_LABELS).map(([value, label]) => ({
      value: value as CourseCategory,
      label,
      icon: COURSE_CATEGORY_ICONS[value as CourseCategory]
    }))
  },

  /**
   * Normalize category string to valid enum value
   */
  normalize: (category: string | undefined): CourseCategory => {
    if (!category) return DEFAULT_CATEGORY
    
    const normalized = category.toLowerCase() as CourseCategory
    return Object.keys(COURSE_CATEGORY_LABELS).includes(normalized) 
      ? normalized 
      : DEFAULT_CATEGORY
  },

  /**
   * Check if category is valid
   */
  isValid: (category: string): category is CourseCategory => {
    return Object.keys(COURSE_CATEGORY_LABELS).includes(category)
  }
}