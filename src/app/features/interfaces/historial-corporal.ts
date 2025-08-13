export interface HistorialCorporalDto {
  pesoKg: number; // BigDecimal se mapea como number
  idUsuario: number;
}

export interface HistorialCorporalResponseDto {
  idHistorial: number;
  fechaControl: string; // ISO string (e.g., "2023-10-01T00:00:00.000Z")
  pesoKg: number;
  nombreUsuario: string;
}
