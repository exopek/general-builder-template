import type { CourseLevel, CourseReadDto, CourseSettingsDto } from '~/types'

// Re-export for backward compatibility
export type { CourseReadDto, CourseSettingsDto as CourseSettingsReadDto } from '~/types'

/**
 * Shared mapping utilities
 */
export class SharedMapperUtils {
  /**
   * Calculate end time based on start time and duration
   */
  static calculateEndTime(startTime: Date, durationMinutes: number): string {
    const endTime = new Date(startTime.getTime() + durationMinutes * 60000)
    return endTime.toISOString()
  }

  /**
   * Map course title to category (simple heuristic)
   */
  static mapCategoryFromTitle(title: string): string {
    const titleLower = title.toLowerCase()
    
    if (titleLower.includes('yoga') || titleLower.includes('pilates') || titleLower.includes('wellness')) {
      return 'wellness'
    }
    if (titleLower.includes('cardio') || titleLower.includes('spinning') || titleLower.includes('lauf')) {
      return 'cardio'  
    }
    if (titleLower.includes('kraft') || titleLower.includes('strength') || titleLower.includes('gewicht')) {
      return 'strength'
    }
    
    return 'fitness' // Default category
  }

  /**
   * Map difficulty number to course level
   */
  static mapLevelFromDifficulty(difficulty: number): CourseLevel {
    if (difficulty <= 1) return 'beginner'
    if (difficulty === 2) return 'intermediate'
    return 'advanced'
  }
}