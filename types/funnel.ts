export interface Goal {
  id: string
  text: string
}

export interface TimeSlot {
  id: string
  day: string
  time: string
}

export interface Contract {
  name: string
  badge: string
  price: string
  monthly: string
  features: string[]
}

export interface ContactData {
  name: string
  email: string
  phone: string
}

export interface FunnelSubmissionData {
  goals: string[]
  contract: Contract
  timeSlot: string
  contact: ContactData
}

export interface CourseRecommendationFunnelProps {
  show?: boolean
}

export interface CourseRecommendationFunnelEmits {
  close: []
  submit: [data: FunnelSubmissionData]
}