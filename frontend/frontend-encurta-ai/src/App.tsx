import { useState } from 'react'

import './App.css'

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
    const response = await fetch("http://localhost:4000/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
    const data = await response.json()
    setShortUrl(data.shortUrl)

  }

  const handleStats = async () => {
    const response = await fetch("http://localhost:4000/links/" + shortUrl + "/stats")
    const data = await response.json()
    setShowStats(true)
    setStats(data)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:4000/${shortUrl}`)
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
          <p>Url encurtada: <a href={shortUrl && `http://localhost:4000/${shortUrl}`} target="_blank">{shortUrl && `http://localhost:4000/${shortUrl}`}</a></p>
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
