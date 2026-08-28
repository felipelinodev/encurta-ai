import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")

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
          <p>Url encurtada: <a href={`localhost:4000/${shortUrl}`} target="_blank">{`localhost:4000/${shortUrl}`}</a></p>
          <button className='copy'>Copy</button>
        </div>
      </section>
    </>
  )
}

export default App
