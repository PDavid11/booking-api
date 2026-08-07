import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export class AuthService {
    
    async login (username: string, psw: string): Promise<string> {

        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
        const secretKey = process.env.JWT_SECRET;

        if (username !== adminUsername) {
            throw new Error('Invalid username or password');
        }

        console.log(adminUsername, adminPasswordHash, secretKey);
        const isPasswordValid = await bcrypt.compare(psw, adminPasswordHash!)
        if (!isPasswordValid) {
            throw new Error('Invalid username or password');
        }

        const token = jwt.sign(
            { role: 'admin', username: adminUsername },
            secretKey!,
            { expiresIn: '24h' }
        );
        return token;
    }
}