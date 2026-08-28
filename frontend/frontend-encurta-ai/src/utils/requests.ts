import dotenv from 'dotenv';
dotenv.config()

const API_URL = process.env.API_URL || "http://localhost:4000/links";

export const requestEncurtar = async (url: string) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
    })

    return response.json()

}

export const requestStats = async (shortUrl: string) => {
    const response = await fetch(`${API_URL}/${shortUrl}/stats`)
    return response.json()
}