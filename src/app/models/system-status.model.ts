/**
 * Provides health and diagnostic information about the backend infrastructure.
 */
export interface SystemStatus {
    environment: string;
    version: string;
    serverTime: string;
    uptimeMilliseconds: number;
    apiStatus: string;
    databaseStatus: string;
}