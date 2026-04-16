import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [searchMood, setSearchMood] = useState('')
  const [step, setStep] = useState(1)
  const [placeholder, setPlaceholder] = useState('How are you feeling today?')
  const [collectedData, setCollectedData] = useState([]) // collects the artists
  const [isLoading, setIsLoading] = useState(false)

  const questions = {
    2: "Name one artist you like...",
    3: "Name another artist you like...",
    4: "Tell us one more artist"
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchMood.trim()) { return }
    if (step === 1 || step === 2) { {setIsLoading(true)} }
    else{ 
      setCollectedData((prev) => [...prev, searchMood.trim()])
      setStep(step + 1)
      setPlaceholder(questions[step+1] || "Your recommendations are being prepared...")
      setSearchMood("")
    }
  }

  useEffect(() => {
    if (!isLoading || searchMood === "") return
    
    let url=""
    if (step === 1) {
      url = `https://musicbrainz.org/ws/2/artist/?query=tag:${encodeURIComponent(searchMood.trim().toLowerCase())}&fmt=json`
    }
    else if (step === 2){
      url = `https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(searchMood.trim().toLowerCase())}&fmt=json`
    }
    if (!url) { setIsLoading(false); return; }

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(`API Reponse for Step ${step}: `, data) //delete later

          if (data?.artists && data.artists.length > 0) {
            // Sees if the artist is actually in the API
            setCollectedData((prev) => [...prev, searchMood.trim()])
            setStep(step+1)

            if (questions[step+1]){ setPlaceholder(questions[step+1]) }
            setSearchMood("")
          }
          else {
            // Handles errors
            let type;
            if (step === 1){ type = "mood" }
            else { type = "artist" }
            setPlaceholder(`Could not find that ${type}, try again.`)
            setSearchMood("")
          }
          setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setPlaceholder("Wait a few seconds and try again")
        setIsLoading(false)
      })
    }, [isLoading]) // Only runs when isLoading changes

  const handleMoodClick = (mood) => {
    setSearchMood(mood)
  }

  return (
    <div className="app">
      <section className="hero-section">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <p className="eyebrow">Mood-based music discovery</p>
          <h1>Musically Moody</h1>
          <p className="hero-subtext">
            Discover music recommendations based on your mood and favorite artists.
          </p>

          <form onSubmit={handleSearch} className="search-form">
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder={placeholder}
                value={searchMood}
                onChange={(e) => setSearchMood(e.target.value)}
                disabled={step === 5}
              />
              <button type="submit" className="search-button">
                SEARCH
              </button>
            </div>
          </form>

          <div className="mood-buttons">
            <button disabled={step === 5} onClick={() => handleMoodClick('happy')}>Happy</button>
            <button disabled={step === 5} onClick={() => handleMoodClick('sad')}>Sad</button>
            <button disabled={step === 5} onClick={() => handleMoodClick('calm')}>Calm</button>
            <button disabled={step === 5} onClick={() => handleMoodClick('energetic')}>Energetic</button>
            <button disabled={step === 5} onClick={() => handleMoodClick('romantic')}>Romantic</button>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="section-heading">
          <h2>How It Works</h2>
          <p>
            Musically Moody combines your mood and artist preferences to create
            a more personalized music experience.
          </p>
        </div>

        <div className="cards">
          <div className="card">
            <h3>1. Choose a Mood</h3>
            <p>
              Start by entering how you feel, or click one of the mood buttons.
            </p>
          </div>

          <div className="card">
            <h3>2. Add Artists You Like</h3>
            <p>
              Tell us a few artists you enjoy so the recommendations feel more personal.
            </p>
          </div>

          <div className="card">
            <h3>3. Get Music Recommendations</h3>
            <p>
              The app uses music data from an API to recommend tracks and artists that match your vibe.
            </p>
          </div>
        </div>
      </section>

      <section className="preview-section">
        <div className="section-heading">
          <h2>Your Inputs</h2>
          <p>This section shows what the user has entered so far.</p>
        </div>

        <div className="preview-box">
          {collectedData.length > 0 ? (
            <div className="tag-list">
              {collectedData.map((item, index) => (
                <span key={index} className="tag">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="empty-text">No inputs yet. Start by typing your mood above.</p>
          )}
        </div>
      </section>

      <section className="about-section">
        <div className="section-heading">
          <h2>About the Project</h2>
          <p>
            This project was built using React, HTML, CSS, and JavaScript. It uses
            React hooks like useState and can be connected to a music API to fetch
            and display recommendations.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App