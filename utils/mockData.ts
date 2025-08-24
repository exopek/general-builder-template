export type CourseCategory = 'fitness' | 'wellness' | 'cardio' | 'strength'

// Extended User interface for mock data (includes password and extra fields)
export interface MockUser {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'user' | 'admin'
  phone?: string
  memberSince: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Mock Users
export const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'admin@gym.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    phone: '+49 123 456789',
    memberSince: '2023-01-01',
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'user@gym.com',
    password: 'user123',
    firstName: 'Max',
    lastName: 'Mustermann',
    role: 'user',
    phone: '+49 987 654321',
    memberSince: '2024-03-15',
    isActive: true,
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
  },
  {
    id: '3',
    email: 'jane.doe@gym.com',
    password: 'jane123',
    firstName: 'Jane',
    lastName: 'Doe',
    role: 'user',
    phone: '+49 555 123456',
    memberSince: '2024-01-10',
    isActive: true,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  }
]

// Extended Course interface for mock data
export interface MockCourse {
  id: string
  title: string
  description: string
  category: CourseCategory
  instructor: string
  duration: number
  maxParticipants: number
  currentParticipants: number
  price: number
  startTime: string
  endTime: string
  location: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  image?: string
  isActive: boolean
  requirements?: string[]
}

// Mock Courses
export const mockCourses: MockCourse[] = [
  {
    id: '1',
    title: 'HIIT Training',
    description: 'High Intensity Interval Training für maximale Fettverbrennung',
    category: 'fitness' as CourseCategory,
    instructor: 'Sarah Miller',
    duration: 45,
    maxParticipants: 12,
    currentParticipants: 8,
    price: 25,
    startTime: '2024-08-25T09:00:00Z',
    endTime: '2024-08-25T09:45:00Z',
    location: 'Studio A',
    difficulty: 'intermediate',
    image: '/images/hiit.jpg',
    isActive: true,
    requirements: ['Grundfitness erforderlich', 'Handtuch mitbringen']
  },
  {
    id: '2',
    title: 'Yoga Flow',
    description: 'Entspannende Yoga-Session für Körper und Geist',
    category: 'wellness' as CourseCategory,
    instructor: 'Maria Schmidt',
    duration: 60,
    maxParticipants: 15,
    currentParticipants: 12,
    price: 20,
    startTime: '2024-08-25T18:00:00Z',
    endTime: '2024-08-25T19:00:00Z',
    location: 'Studio B',
    difficulty: 'beginner',
    image: '/images/yoga.jpg',
    isActive: true,
    requirements: ['Yogamatte mitbringen', 'Bequeme Kleidung']
  },
  {
    id: '3',
    title: 'Spinning Class',
    description: 'Intensive Cardio-Session auf dem Spinning-Bike',
    category: 'cardio' as CourseCategory,
    instructor: 'Tom Johnson',
    duration: 50,
    maxParticipants: 20,
    currentParticipants: 15,
    price: 22,
    startTime: '2024-08-26T07:00:00Z',
    endTime: '2024-08-26T07:50:00Z',
    location: 'Spinning-Raum',
    difficulty: 'intermediate',
    image: '/images/spinning.jpg',
    isActive: true,
    requirements: ['Handtuch und Wasserflasche mitbringen']
  },
  {
    id: '4',
    title: 'Krafttraining Basics',
    description: 'Grundlagen des Krafttrainings für Einsteiger',
    category: 'strength' as CourseCategory,
    instructor: 'Mike Brown',
    duration: 90,
    maxParticipants: 8,
    currentParticipants: 5,
    price: 35,
    startTime: '2024-08-26T16:00:00Z',
    endTime: '2024-08-26T17:30:00Z',
    location: 'Kraftraum',
    difficulty: 'beginner',
    image: '/images/strength.jpg',
    isActive: true,
    requirements: ['Sportkleidung', 'Keine Vorkenntnisse nötig']
  },
  {
    id: '5',
    title: 'Pilates Core',
    description: 'Stärkung der Körpermitte durch gezieltes Pilates-Training',
    category: 'wellness' as CourseCategory,
    instructor: 'Lisa Anderson',
    duration: 55,
    maxParticipants: 10,
    currentParticipants: 7,
    price: 23,
    startTime: '2024-08-27T10:30:00Z',
    endTime: '2024-08-27T11:25:00Z',
    location: 'Studio A',
    difficulty: 'beginner',
    image: '/images/pilates.jpg',
    isActive: true,
    requirements: ['Yogamatte', 'Bequeme Sportkleidung']
  },
  {
    id: '6',
    title: 'CrossFit WOD',
    description: 'Workout of the Day - abwechslungsreiches funktionelles Training',
    category: 'fitness' as CourseCategory,
    instructor: 'Jake Wilson',
    duration: 60,
    maxParticipants: 14,
    currentParticipants: 10,
    price: 30,
    startTime: '2024-08-27T19:00:00Z',
    endTime: '2024-08-27T20:00:00Z',
    location: 'CrossFit Box',
    difficulty: 'advanced',
    image: '/images/crossfit.jpg',
    isActive: true,
    requirements: ['Hohe Grundfitness erforderlich', 'Handtuch und Wasserflasche']
  }
]

// Extended Booking interface for mock data
export interface MockBooking {
  id: string
  userId: string
  courseId: string
  status: 'confirmed' | 'cancelled' | 'pending'
  bookingDate: string
  notes?: string
}

// Mock Bookings
export const mockBookings: MockBooking[] = [
  {
    id: '1',
    userId: '2',
    courseId: '1',
    status: 'confirmed',
    bookingDate: '2024-08-24T10:30:00Z',
    notes: 'Erste HIIT-Session'
  },
  {
    id: '2',
    userId: '2',
    courseId: '2',
    status: 'confirmed',
    bookingDate: '2024-08-24T11:00:00Z',
    notes: 'Entspannung nach dem Training'
  },
  {
    id: '3',
    userId: '3',
    courseId: '3',
    status: 'confirmed',
    bookingDate: '2024-08-24T09:15:00Z',
    notes: 'Cardio-Training am Morgen'
  },
  {
    id: '4',
    userId: '2',
    courseId: '4',
    status: 'pending',
    bookingDate: '2024-08-24T12:00:00Z',
    notes: 'Krafttraining für Einsteiger'
  },
  {
    id: '5',
    userId: '3',
    courseId: '5',
    status: 'confirmed',
    bookingDate: '2024-08-24T14:30:00Z',
    notes: 'Core-Stärkung'
  }
]

// Mock Statistics for Admin Dashboard
export const mockStats = {
  totalUsers: mockUsers.filter(u => u.role === 'user').length,
  totalCourses: mockCourses.filter(c => c.isActive).length,
  totalBookings: mockBookings.length,
  activeBookings: mockBookings.filter(b => b.status === 'confirmed').length,
  revenue: mockBookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, booking) => {
      const course = mockCourses.find(c => c.id === booking.courseId)
      return sum + (course?.price || 0)
    }, 0),
  popularCourses: mockCourses
    .sort((a, b) => b.currentParticipants - a.currentParticipants)
    .slice(0, 3),
  recentBookings: mockBookings
    .sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime())
    .slice(0, 5)
}

// Helper functions for mock API simulation
export const findUser = (email: string, password: string): MockUser | null => {
  return mockUsers.find(u => u.email === email && u.password === password) || null
}

export const findUserById = (id: string): MockUser | null => {
  return mockUsers.find(u => u.id === id) || null
}

export const getUserBookings = (userId: string): MockBooking[] => {
  return mockBookings.filter(b => b.userId === userId)
}

export const getCourseBookings = (courseId: string): MockBooking[] => {
  return mockBookings.filter(b => b.courseId === courseId)
}

export const getBookingWithDetails = (bookingId: string) => {
  const booking = mockBookings.find(b => b.id === bookingId)
  if (!booking) return null
  
  const course = mockCourses.find(c => c.id === booking.courseId)
  const user = mockUsers.find(u => u.id === booking.userId)
  
  return {
    ...booking,
    course,
    user
  }
}

// Simulate API delay
export const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))