export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  actionText?: string
  actionHandler?: () => void
}

export interface ToastOptions {
  title: string
  message?: string
  duration?: number
  actionText?: string
  actionHandler?: () => void
}

// Global reactive state for toasts
const toasts = ref<Toast[]>([])

// Auto-incrementing ID for toasts
let toastId = 0

export function useToast() {
  const add = (type: Toast['type'], options: ToastOptions): string => {
    const id = `toast-${++toastId}`
    const toast: Toast = {
      id,
      type,
      duration: 5000, // 5 seconds default
      ...options
    }

    toasts.value.push(toast)

    // Auto remove after duration
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        remove(id)
      }, toast.duration)
    }

    return id
  }

  const remove = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clear = () => {
    toasts.value = []
  }

  // Convenience methods
  const success = (options: ToastOptions) => add('success', options)
  const error = (options: ToastOptions) => add('error', options)
  const warning = (options: ToastOptions) => add('warning', options)
  const info = (options: ToastOptions) => add('info', options)

  return {
    toasts: readonly(toasts),
    add,
    remove,
    clear,
    success,
    error,
    warning,
    info
  }
}

// Preset toast messages for common scenarios
export const useToastPresets = () => {
  const { success, error, warning, info } = useToast()

  return {
    // Success messages
    loginSuccess: () => success({
      title: 'Erfolgreich angemeldet',
      message: 'Willkommen zurück!'
    }),
    
    logoutSuccess: () => success({
      title: 'Erfolgreich abgemeldet',
      message: 'Bis bald!'
    }),
    
    bookingSuccess: (courseName?: string) => success({
      title: 'Buchung erfolgreich',
      message: courseName ? `Sie wurden erfolgreich für "${courseName}" angemeldet.` : 'Ihre Buchung wurde bestätigt.'
    }),
    
    cancellationSuccess: (courseName?: string) => success({
      title: 'Stornierung erfolgreich',
      message: courseName ? `Ihre Anmeldung für "${courseName}" wurde storniert.` : 'Ihre Buchung wurde storniert.'
    }),
    
    profileUpdateSuccess: () => success({
      title: 'Profil aktualisiert',
      message: 'Ihre Änderungen wurden gespeichert.'
    }),
    
    courseCreatedSuccess: (courseName?: string) => success({
      title: 'Kurs erstellt',
      message: courseName ? `"${courseName}" wurde erfolgreich erstellt.` : 'Der neue Kurs wurde erstellt.'
    }),
    
    courseUpdatedSuccess: (courseName?: string) => success({
      title: 'Kurs aktualisiert',
      message: courseName ? `"${courseName}" wurde erfolgreich aktualisiert.` : 'Der Kurs wurde aktualisiert.'
    }),
    
    courseDeletedSuccess: (courseName?: string) => success({
      title: 'Kurs gelöscht',
      message: courseName ? `"${courseName}" wurde gelöscht.` : 'Der Kurs wurde gelöscht.'
    }),

    // Error messages
    loginError: (message?: string) => error({
      title: 'Anmeldung fehlgeschlagen',
      message: message || 'Bitte überprüfen Sie Ihre Eingaben.'
    }),
    
    bookingError: (message?: string) => error({
      title: 'Buchung fehlgeschlagen',
      message: message || 'Die Buchung konnte nicht durchgeführt werden.'
    }),
    
    cancellationError: (message?: string) => error({
      title: 'Stornierung fehlgeschlagen',
      message: message || 'Die Stornierung konnte nicht durchgeführt werden.'
    }),
    
    networkError: () => error({
      title: 'Verbindungsfehler',
      message: 'Bitte überprüfen Sie Ihre Internetverbindung.'
    }),
    
    unauthorizedError: () => error({
      title: 'Berechtigung fehlt',
      message: 'Sie haben keine Berechtigung für diese Aktion.'
    }),
    
    validationError: (message?: string) => error({
      title: 'Eingabefehler',
      message: message || 'Bitte überprüfen Sie Ihre Eingaben.'
    }),

    // Warning messages
    bookingDeadlineWarning: () => warning({
      title: 'Buchungsfrist beachten',
      message: 'Buchungen sind nur bis 2 Stunden vor Kursbeginn möglich.'
    }),
    
    cancellationDeadlineWarning: () => warning({
      title: 'Stornierungsfrist beachten',
      message: 'Stornierungen sind nur bis 4 Stunden vor Kursbeginn möglich.'
    }),
    
    courseFull: () => warning({
      title: 'Kurs ausgebucht',
      message: 'Dieser Kurs ist bereits vollständig ausgebucht.'
    }),

    // Info messages
    dataLoading: () => info({
      title: 'Daten werden geladen',
      message: 'Bitte warten Sie einen Moment...',
      duration: 0 // Don't auto-hide
    })
  }
}