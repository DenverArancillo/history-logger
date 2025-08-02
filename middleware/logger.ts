import { Request, Response, NextFunction } from 'express'
import colors from 'colors'

const logger = (req: Request, res: Response, next: NextFunction) => {

	const formatLog = (req: Request): string => `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`

	switch (req.method) {
		case 'GET':
			console.log(colors.green(formatLog(req)))
			break
		case 'POST':
			console.log(colors.blue(formatLog(req)))
			break
		case 'PUT':
			console.log(colors.yellow(formatLog(req)))
			break
		case 'DELETE':
			console.log(colors.red(formatLog(req)))
			break
		default:
			console.log(colors.white(formatLog(req)))
	}

	next()
}

export default logger