import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
    private readonly secretKey: string
    private readonly adminUsername: string
    private readonly adminPasswordHash: string

    constructor() {
        this.secretKey = process.env.JWT_SECRET || 'fallback_secret'
        this.adminUsername = process.env.ADMIN_USERNAME || 'admin'
        this.adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || ''
    }

    async login (username: string, psw: string): Promise<string> {
        if (username !== this.adminUsername) {
            throw new Error('Invalid username or password');
        }

        const isPasswordValid = await bcrypt.compare(psw, this.adminPasswordHash)
        if (!isPasswordValid) {
            throw new Error('Invalid username or password');
        }

        const token = jwt.sign(
            { role: 'admin', username: this.adminUsername },
            this.secretKey,
            { expiresIn: '1h' }
        );
        return token;
    }
}