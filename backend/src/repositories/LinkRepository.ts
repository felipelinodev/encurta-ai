import LinkModel, { Link } from '../models/LinkModel'

class LinkRepository {
    async create(url: string, shortUrl: string): Promise<Link> {
        const link = await LinkModel.create({ url, shortUrl })
        return link
    }

    async findByShortUrl(shortUrl: string): Promise<Link | null> {
        return await LinkModel.findOne({ shortUrl })
    }

    async incrementClickCount(shortUrl: string): Promise<void> {
        await LinkModel.updateOne({ shortUrl }, { $inc: { clickCount: 1 } })
    }

}

export default new LinkRepository()