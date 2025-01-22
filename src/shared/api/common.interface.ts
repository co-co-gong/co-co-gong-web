export interface ErrorDTO {
  status: number;
  message: string;
  timestamp: Date;
}

export interface ApiResponseDTO<T> extends ErrorDTO {
  data: T;
}
