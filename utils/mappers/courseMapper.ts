import { BaseMapper } from './base'
import type { Course, CourseReadDto, CourseSettingsDto, CourseLevel } from '~/types'
import { SharedMapperUtils } from './shared'

/**
 * Extended Course DTO with required courseSettings array
 */
export interface CourseWithSettingsDto extends CourseReadDto {
  courseSettings: CourseSettingsDto[]
  bookable: boolean
}


/**
 * Course mapper implementation
 */
class CourseMapperImpl extends BaseMapper<CourseWithSettingsDto, Course> {
  /**
   * Maps CourseReadDto to single Course (using first courseSettings)
   */
  toModel(dto: CourseWithSettingsDto): Course {
    if (!dto.courseSettings?.length) {
      throw new Error('CourseReadDto must have at least one courseSettings')
    }
    return this.mapSingleCourse(dto, dto.courseSettings[0])
  }

  /**
   * Maps CourseReadDto to Course array (one Course per CourseSettings)
   */
  override toModelArray(dtos: CourseWithSettingsDto[]): Course[] {
    return dtos.flatMap(dto => dto.courseSettings.map(setting => this.mapSingleCourse(dto, setting)))
  }

  /**
   * Maps single CourseReadDto to Course array (one Course per CourseSettings)
   */
  toCoursesFromSingle(dto: CourseWithSettingsDto): Course[] {
    return dto.courseSettings.map(setting => this.mapSingleCourse(dto, setting))
  }

  /**
   * Maps single CourseReadDto + CourseSettingsReadDto to Course
   */
  private mapSingleCourse(courseDto: CourseWithSettingsDto, settingsDto: CourseSettingsDto): Course {
    const scheduledDate = new Date(settingsDto.scheduledAt)
    
    return {
      id: courseDto.id,
      title: this.mapField(courseDto.title, 'Unbekannter Kurs'),
      description: this.mapField(courseDto.description, ''),
      instructor: this.mapField(settingsDto.trainerName, 'Trainer'), // Default - could be extended in DTO
      date: scheduledDate.toISOString().split('T')[0], // Extract YYYY-MM-DD for date comparison
      startTime: scheduledDate.toISOString(),
      endTime: this.calculateEndTime(scheduledDate, 60), // Default 60min duration
      duration: 55, // Default duration - could be in DTO
      maxParticipants: this.mapField(settingsDto.maxParticipants, 20),
      currentParticipants: this.mapField(courseDto.bookingsCount, 0),
      category: this.mapCategoryFromTitle(courseDto.title),
      level: this.mapLevelFromDifficulty(courseDto.difficulty),
      location: 'EXOPEK GYM', // Default location
      equipment: [], // Could be extended in DTO
      image: courseDto.imageUrl,
      isActive: true, // Assume active if in API response
      courseSettingsId: settingsDto.id,
      bookable: this.mapField(courseDto.bookable, true)
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
  private mapLevelFromDifficulty(difficulty: number): CourseLevel {
    return SharedMapperUtils.mapLevelFromDifficulty(difficulty)
  }

  /**
   * Flatten array of course DTOs to single course array
   */
  toCourseArray(dtos: CourseWithSettingsDto[]): Course[] {
    return this.toModelArray(dtos)
  }
}

/**
 * Singleton course mapper instance
 */
export const courseMapper = new CourseMapperImpl()

/**
 * Utility functions for course mapping
 */
export const CourseMapperUtils = {
  /**
   * Map single course DTO to courses array
   */
  mapCourse: (dto: CourseWithSettingsDto): Course[] => {
    return courseMapper.toCoursesFromSingle(dto)
  },

  /**
   * Map array of course DTOs to flattened courses array
   */
  mapCourses: (dtos: CourseWithSettingsDto[]): Course[] => {
    return courseMapper.toCourseArray(dtos)
  },

  /**
   * Find course by courseSettingsId
   */
  findByCourseSettingsId: (courses: Course[], courseSettingsId: string): Course | undefined => {
    return courses.find(course => course.courseSettingsId === courseSettingsId)
  },

  /**
   * Group courses by course ID (original course)
   */
  groupByCourseId: (courses: Course[]): Record<string, Course[]> => {
    return courses.reduce((groups, course) => {
      if (!groups[course.id]) {
        groups[course.id] = []
      }
      groups[course.id].push(course)
      return groups
    }, {} as Record<string, Course[]>)
  }
}