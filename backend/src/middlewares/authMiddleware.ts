import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";



export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const SECRET = process.env.JWT_SECRET

    const authHeader = req.headers["authorization"]
    const token = authHeader?.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" })
    }
    try {
        const decoded = jwt.verify(token, SECRET!)
        req.user = decoded as any
        next()
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" })
    }

}