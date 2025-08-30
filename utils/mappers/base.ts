/**
 * Base mapper interface for DTO transformations
 * Provides type-safe mapping between DTOs and domain models
 */
export interface IMapper<TDto, TModel> {
  toModel(dto: TDto): TModel
  toModelArray(dtos: TDto[]): TModel[]
}

/**
 * Abstract base mapper implementation
 */
export abstract class BaseMapper<TDto, TModel> implements IMapper<TDto, TModel> {
  abstract toModel(dto: TDto): TModel

  toModelArray(dtos: TDto[]): TModel[] {
    return dtos.map(dto => this.toModel(dto))
  }

  /**
   * Helper method to safely extract date from ISO string
   */
  protected parseDate(dateString: string): string {
    try {
      return new Date(dateString).toISOString().split('T')[0]
    } catch {
      return dateString
    }
  }

  /**
   * Helper method to safely extract time from ISO string
   */
  protected parseTime(dateString: string): string {
    try {
      return new Date(dateString).toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  /**
   * Helper method for safe field mapping with defaults
   */
  protected mapField<T>(value: T | undefined | null, defaultValue: T): T {
    return value ?? defaultValue
  }
}