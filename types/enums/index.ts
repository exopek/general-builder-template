/**
 * Enum utilities barrel export
 */
export * from './bookingStatus'
export * from './courseLevel'
export * from './courseCategory'

/**
 * Combined utility object for all enum operations
 */
export const EnumUtils = {
  BookingStatus: () => import('./bookingStatus').then(m => m.BookingStatusUtils),
  CourseLevel: () => import('./courseLevel').then(m => m.CourseLevelUtils),
  CourseCategory: () => import('./courseCategory').then(m => m.CourseCategoryUtils)
}