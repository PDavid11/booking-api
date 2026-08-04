import type { Request, Response } from 'express'
import { AuthService } from '../services/authService.js'

export class AuthController {
    private readonly authService: AuthService

    constructor(authService: AuthService) {
        this.authService = authService
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const {username, psw} = req.body

            if (!username || !psw) {
                res.status(400).json({ error: 'Username and password are required' })
                return
            }

            const token = await this.authService.login(username, psw)

            res.status(200).json({
                success: true,
                message: 'Login successful',
                token
            })
        } catch (error: any) {
            res.status(401).json({
                success: false,
                message: error.message || 'Login failed'
            })
        }
    }
}