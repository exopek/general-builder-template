import { API_BASE_URL, ERROR_MESSAGES } from '~/utils/constants'

export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  status: number
  data?: any
}

export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  body?: any
  timeout?: number
  skipAuth?: boolean
}

export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export function useApi() {
  const authStore = useAuthStore()

  const createError = (message: string, status = 500, data?: any): ApiError => ({
    message,
    status,
    data
  })

  const handleError = (error: any): ApiError => {
    console.error('API Error:', error)

    // Handle fetch/network errors
    if (error.name === 'TypeError' || error.code === 'NETWORK_ERR') {
      return createError(ERROR_MESSAGES.NETWORK_ERROR, 0)
    }

    // Handle timeout errors
    if (error.name === 'AbortError' || error.message?.includes('timeout')) {
      return createError('Die Anfrage hat zu lange gedauert. Bitte versuchen Sie es erneut.', 408)
    }

    // Handle HTTP errors with response data
    if (error.data) {
      const status = error.status || error.response?.status || 500
      const message = error.data.message || error.message

      switch (status) {
        case 400:
          return createError(message || ERROR_MESSAGES.VALIDATION_ERROR, status, error.data)
        case 401:
          // Token might be expired, clear auth
          authStore.clearAuthState()
          return createError(ERROR_MESSAGES.UNAUTHORIZED, status, error.data)
        case 403:
          return createError(ERROR_MESSAGES.FORBIDDEN, status, error.data)
        case 404:
          return createError(ERROR_MESSAGES.NOT_FOUND, status, error.data)
        case 422:
          return createError(message || ERROR_MESSAGES.VALIDATION_ERROR, status, error.data)
        default:
          return createError(message || ERROR_MESSAGES.NETWORK_ERROR, status, error.data)
      }
    }

    // Fallback error handling
    return createError(
      error.message || ERROR_MESSAGES.NETWORK_ERROR,
      error.status || 500,
      error
    )
  }

  const makeRequest = async <T = any>(
    endpoint: string, 
    options: ApiOptions = {}
  ): Promise<T> => {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = 10000,
      skipAuth = false
    } = options

    // Prepare headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers
    }

    // Add authorization header if not skipped and user is authenticated
    if (!skipAuth && authStore.token) {
      requestHeaders.Authorization = `Bearer ${authStore.token}`
    }

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
      signal: AbortSignal.timeout(timeout)
    }

    // Add body for non-GET requests
    if (body && method !== 'GET') {
      requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body)
    }

    try {
      const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`
      const response = await fetch(url, requestOptions)

      // Handle non-JSON responses (like file downloads)
      const contentType = response.headers.get('content-type')
      if (contentType && !contentType.includes('application/json')) {
        if (response.ok) {
          return response as unknown as T
        } else {
          throw createError(`HTTP Error ${response.status}`, response.status)
        }
      }

      // Parse JSON response
      let data: any
      try {
        data = await response.json()
      } catch (parseError) {
        if (response.ok) {
          // Sometimes successful responses have no body
          return {} as T
        }
        throw createError('Ungültige Antwort vom Server', response.status)
      }

      // Handle successful responses
      if (response.ok) {
        return data
      }

      // Handle error responses with JSON body
      throw {
        message: data.message || `HTTP Error ${response.status}`,
        status: response.status,
        data
      }

    } catch (error) {
      throw handleError(error)
    }
  }

  // Convenient methods for common HTTP verbs
  const get = <T = any>(endpoint: string, options: Omit<ApiOptions, 'method'> = {}) =>
    makeRequest<T>(endpoint, { ...options, method: 'GET' })

  const post = <T = any>(endpoint: string, body?: any, options: Omit<ApiOptions, 'method' | 'body'> = {}) =>
    makeRequest<T>(endpoint, { ...options, method: 'POST', body })

  const put = <T = any>(endpoint: string, body?: any, options: Omit<ApiOptions, 'method' | 'body'> = {}) =>
    makeRequest<T>(endpoint, { ...options, method: 'PUT', body })

  const patch = <T = any>(endpoint: string, body?: any, options: Omit<ApiOptions, 'method' | 'body'> = {}) =>
    makeRequest<T>(endpoint, { ...options, method: 'PATCH', body })

  const del = <T = any>(endpoint: string, options: Omit<ApiOptions, 'method'> = {}) =>
    makeRequest<T>(endpoint, { ...options, method: 'DELETE' })

  return {
    makeRequest,
    get,
    post,
    put,
    patch,
    delete: del,
    createError,
    handleError
  }
}

// Composable for managing loading states
export function useLoadingState(initialLoading = false) {
  const isLoading = ref(initialLoading)
  const error = ref<string | null>(null)

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (err: string | null) => {
    error.value = err
  }

  const clearError = () => {
    error.value = null
  }

  const withLoading = async <T>(fn: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading(true)
      clearError()
      const result = await fn()
      return result
    } catch (err: any) {
      setError(err.message || ERROR_MESSAGES.NETWORK_ERROR)
      console.error('Loading state error:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    isLoading: readonly(isLoading),
    error: readonly(error),
    setLoading,
    setError,
    clearError,
    withLoading
  }
}

// Composable for API requests with automatic loading state management
export function useApiRequest<T = any>(
  endpoint: string,
  options: ApiOptions = {},
  immediate = false
) {
  const { isLoading, error, setLoading, setError, clearError } = useLoadingState()
  const data = ref<T | null>(null)
  const api = useApi()

  const execute = async (overrideOptions: ApiOptions = {}): Promise<T | null> => {
    try {
      setLoading(true)
      clearError()

      const result = await api.makeRequest<T>(endpoint, { ...options, ...overrideOptions })
      data.value = result
      return result
    } catch (err: any) {
      setError(err.message || ERROR_MESSAGES.NETWORK_ERROR)
      console.error('API request error:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const refresh = () => execute()

  // Execute immediately if requested
  if (immediate) {
    execute()
  }

  return {
    data: readonly(data),
    isLoading,
    error,
    execute,
    refresh,
    clearError
  }
}