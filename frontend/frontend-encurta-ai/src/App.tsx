import { useState } from 'react'

import './App.css'
import { requestEncurtar, requestStats } from './utils/requests'

function App() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [showStats, setShowStats] = useState(false)
  const [stats, setStats] = useState({
    id: "",
    url: "",
    shortUrl: "",
    createdAt: "",
    updatedAt: "",
    clickCount: 0
  })

  const handleEncurtar = async () => {
    const data = await requestEncurtar(url)
    setShortUrl(data.shortUrl)

  }

  const handleStats = async () => {
    const data = await requestStats(shortUrl)
    setShowStats(true)
    setStats(data)
  }

  const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000/links").replace(/\/links\/?$/, '')
  const fullShortUrl = shortUrl ? `${API_BASE_URL}/${shortUrl}` : ''

  const handleCopy = () => {
    if (fullShortUrl) {
      navigator.clipboard.writeText(fullShortUrl)
    }
  }

  return (
    <>
      <section className='container-principal'>
        <h1>Encurta AI</h1>
        <p>Encurte seus links com facilidade</p>

        <div className='container-do-input'>
          <input type="text" placeholder="Digite sua URL" value={url} onChange={(e) => setUrl(e.target.value)} />
          <button className='encurtar' onClick={handleEncurtar}>Encurtar</button>
        </div>
        <div className='container-de-baixo'>
          <p>Url encurtada: <a href={fullShortUrl} target="_blank" rel="noreferrer">{fullShortUrl}</a></p>
          <div className='botoes-baixo'>
            <button className='copy' onClick={handleCopy}>Copy</button>
            <button className='copy' onClick={handleStats}>Estatísticas</button>
          </div>

        </div>
        {showStats && (
          <section className='container-de-stats'>
            <p>URL: {stats.url}</p>
            <p>URL encurtada: {stats.shortUrl}</p>
            <p>Cliques: {stats.clickCount}</p>
            <p>Criado em: {stats.createdAt}</p>
            <p>Atualizado em: {stats.updatedAt}</p>
          </section>
        )}
      </section>

    </>
  )
}

export default App
