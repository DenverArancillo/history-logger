
import { Request, Response, NextFunction } from "express"
import { Error as errorType } from '../ts/interface/common/types'

const errorHandler = (error: errorType, req: Request, res: Response, next: NextFunction) => {
	if (error.status) {
		res.status(error.status).json({ message: error.message })
	} else {
		res.status(500).json({ message: error.message })
	}
}

export default errorHandler