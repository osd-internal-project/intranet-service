/**
 * Query parameters for the fuel-transaction report (table & export).
 * All fields are optional and arrive as raw query strings, so numeric
 * fields are kept as `string` and parsed in the service layer.
 */
export interface ReportFuelQueryDto {
  /** Filter by a single car (maCar.carId). Empty = all cars. */
  readonly carId?: string;
  /** Start of the date range applied to `maCarFuelTransaction.date`. */
  readonly startDate?: string;
  /** End of the date range applied to `maCarFuelTransaction.date`. */
  readonly endDate?: string;
  /** Filter by transaction type: 'use' | 'reset' | 'adjust'. */
  readonly actionStatus?: string;
  /** Pagination: number of rows to return. */
  readonly take?: string;
  /** Pagination: number of rows to skip. */
  readonly skip?: string;
}

/**
 * Query parameters for the fuel-usage bar chart.
 * The chart always covers the last 6 months and only `use` transactions.
 */
export interface ReportFuelChartQueryDto {
  /** Filter by a single car (maCar.carId). Empty = all cars. */
  readonly carId?: string;
}
