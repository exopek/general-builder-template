/**
 * Mappers barrel export
 */
export * from './base'
export * from './courseMapper'
export * from './bookingMapper'
export * from './userMapper'

/**
 * Combined mapper utilities
 */
export const Mappers = {
  Course: () => import('./courseMapper').then(m => m.CourseMapperUtils),
  Booking: () => import('./bookingMapper').then(m => m.BookingMapperUtils),
  User: () => import('./userMapper').then(m => m.UserMapperUtils),
  Article: () => import('./articleMapper').then(m => m.articleMapper)
}