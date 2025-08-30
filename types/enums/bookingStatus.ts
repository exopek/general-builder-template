/**
 * Booking status enumeration and mapping utilities
 */
export enum BookingStatus {
  BOOKED = 0,
  CANCELLED = 1, 
  ATTENDED = 2,
  NO_SHOW = 3
}

/**
 * German labels for booking status
 */
export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  [BookingStatus.BOOKED]: 'Gebucht',
  [BookingStatus.CANCELLED]: 'Storniert',
  [BookingStatus.ATTENDED]: 'Teilgenommen',
  [BookingStatus.NO_SHOW]: 'Nicht erschienen'
} as const

/**
 * CSS classes for booking status display
 */
export const BOOKING_STATUS_CLASSES: Record<BookingStatus, string> = {
  [BookingStatus.BOOKED]: 'bg-green-100 text-green-800 border-green-200',
  [BookingStatus.CANCELLED]: 'bg-red-100 text-red-800 border-red-200', 
  [BookingStatus.ATTENDED]: 'bg-blue-100 text-blue-800 border-blue-200',
  [BookingStatus.NO_SHOW]: 'bg-orange-100 text-orange-800 border-orange-200'
} as const

/**
 * Utility functions for booking status
 */
export const BookingStatusUtils = {
  /**
   * Convert status number to German label
   */
  toLabel: (status: number): string => {
    return BOOKING_STATUS_LABELS[status as BookingStatus] || 'Unbekannt'
  },

  /**
   * Convert status number to CSS classes
   */
  toClasses: (status: number): string => {
    return BOOKING_STATUS_CLASSES[status as BookingStatus] || 'bg-gray-100 text-gray-800 border-gray-200'
  },

  /**
   * Check if booking can be cancelled
   */
  canCancel: (status: number): boolean => {
    return status === BookingStatus.BOOKED
  },

  /**
   * Check if booking is active
   */
  isActive: (status: number): boolean => {
    return status === BookingStatus.BOOKED || status === BookingStatus.ATTENDED
  },

  /**
   * Get all available statuses for admin
   */
  getAllStatuses: (): Array<{ value: BookingStatus; label: string }> => {
    return Object.values(BookingStatus)
      .filter(value => typeof value === 'number')
      .map(value => ({
        value: value as BookingStatus,
        label: BOOKING_STATUS_LABELS[value as BookingStatus]
      }))
  }
}