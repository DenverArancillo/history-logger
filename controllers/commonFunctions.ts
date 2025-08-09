import { Error as errorType } from '../ts/interface/common/types'

const errorHandler = (message: string, status: number): errorType => {
	const error: errorType = new Error(message)
	error.status = status
	return error
}

export {
	errorHandler
}