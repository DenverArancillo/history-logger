/**
 * Interface for Error constructor to be used on error handler middleware
 */
export interface Error {
	message: string,
	status?: number
}