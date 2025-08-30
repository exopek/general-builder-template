/**
 * Course level enumeration and mapping utilities
 */
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced'

/**
 * German labels for course levels
 */
export const COURSE_LEVEL_LABELS: Record<CourseLevel, string> = {
  beginner: 'Anfänger',
  intermediate: 'Fortgeschritten', 
  advanced: 'Experte'
} as const

/**
 * CSS classes for course level display
 */
export const COURSE_LEVEL_CLASSES: Record<CourseLevel, string> = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  advanced: 'bg-red-100 text-red-800 border-red-200'
} as const

/**
 * Difficulty scores for course levels (for sorting)
 */
export const COURSE_LEVEL_DIFFICULTY: Record<CourseLevel, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3
} as const

/**
 * Utility functions for course levels
 */
export const CourseLevelUtils = {
  /**
   * Convert level to German label
   */
  toLabel: (level: CourseLevel): string => {
    return COURSE_LEVEL_LABELS[level] || 'Unbekannt'
  },

  /**
   * Convert level to CSS classes
   */
  toClasses: (level: CourseLevel): string => {
    return COURSE_LEVEL_CLASSES[level] || 'bg-gray-100 text-gray-800 border-gray-200'
  },

  /**
   * Get difficulty score for sorting
   */
  getDifficulty: (level: CourseLevel): number => {
    return COURSE_LEVEL_DIFFICULTY[level] || 0
  },

  /**
   * Get all available levels
   */
  getAllLevels: (): Array<{ value: CourseLevel; label: string; difficulty: number }> => {
    return Object.entries(COURSE_LEVEL_LABELS).map(([value, label]) => ({
      value: value as CourseLevel,
      label,
      difficulty: COURSE_LEVEL_DIFFICULTY[value as CourseLevel]
    }))
  },

  /**
   * Sort courses by difficulty level
   */
  sortByDifficulty: <T extends { level: CourseLevel }>(courses: T[], ascending = true): T[] => {
    return [...courses].sort((a, b) => {
      const diffA = COURSE_LEVEL_DIFFICULTY[a.level]
      const diffB = COURSE_LEVEL_DIFFICULTY[b.level]
      return ascending ? diffA - diffB : diffB - diffA
    })
  }
}