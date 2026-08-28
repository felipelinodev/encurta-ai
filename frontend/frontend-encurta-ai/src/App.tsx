import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [url, setUrl] = useState("")

  const handleEncurtar = () => {
    console.log(url)
    setUrl("")
  }

  return (
    <>
      <section>
        <h1>Encurta AI</h1>
        <p>Encurte seus links com facilidade</p>
        <input type="text" placeholder="Digite sua URL" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button onClick={handleEncurtar}>Encurtar</button>
        <p>Url encurtada: {url}</p>
      </section>
    </>
  )
}

export default App
