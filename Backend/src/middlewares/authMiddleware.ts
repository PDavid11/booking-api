import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            success: false,
            message: 'Authorization header missing or malformed'
        })
        return
    }

    const token = authHeader.split(' ')[1]

    try {
        const secretKey = process.env.JWT_SECRET || 'fallback_secret'

        const decoded = jwt.verify(token!, secretKey)

        next()
        } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        })
    }
}