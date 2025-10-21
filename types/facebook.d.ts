// Facebook Pixel Event Types
export type FacebookPixelEvent =
  | 'Lead'
  | 'CompleteRegistration'
  | 'Contact'
  | 'Schedule'
  | 'StartTrial'
  | 'SubmitApplication'
  | 'Subscribe'
  | 'ViewContent'
  | 'Search'

// Event Parameters
export interface FacebookEventParams {
  content_name?: string
  content_category?: string
  value?: number
  currency?: string
  search_string?: string
  status?: string
  predicted_ltv?: number
}

// Tracked Event (für Store History)
export interface TrackedEvent {
  event: FacebookPixelEvent
  timestamp: Date
  params: FacebookEventParams
  success: boolean
  error?: string
}

// Window Interface Extension
declare global {
  interface Window {
    fbq?: (
      command: string,
      eventName: string,
      params?: FacebookEventParams
    ) => void
  }
}

export {}
