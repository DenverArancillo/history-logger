import { Request, Response, NextFunction } from 'express'
import { Error as errorType } from '../ts/interface/common/types'

const notFound = (_req: Request, _res: Response, next: NextFunction) => {
	const error: errorType = new Error('Not found')
	error.status = 404
	next(error)
}

export default notFound