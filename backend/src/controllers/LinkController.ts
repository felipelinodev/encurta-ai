import { Request, Response } from "express";
import LinkRepository from "../repositories/LinkRepository";
import { nanoid } from "nanoid";
import { Link } from "../models/LinkModel";

class LinkController {
    async create(req: Request, res: Response): Promise<Response> {
        const { url } = req.body

        if (!url) {
            return res.status(400).json({ message: "URL é obrigatória" })
        }

        const shortUrl = nanoid(6)

        const link = await LinkRepository.create(url, shortUrl)

        return res.status(201).json(link)

    }

    async redirect(req: Request, res: Response): Promise<void> {
        const shortUrl = req.params.shortUrl as string

        const link: Link | null = await LinkRepository.findByShortUrl(shortUrl)

        if (!link) {
            res.status(404).json({ message: "Link não encontrado" })
            return
        }

        await LinkRepository.incrementClickCount(shortUrl)

        res.redirect(link.url)

    }
    async getStats(req: Request, res: Response): Promise<Response> {
        const code = req.params.code as string

        const link = await LinkRepository.findByShortUrl(code)

        if (!link) {
            return res.status(404).json({ message: "Link não encontrado" })
        }

        return res.json(link)

    }

}

export default new LinkController()