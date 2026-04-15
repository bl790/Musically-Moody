import { useState } from 'react'
import './App.css'

function App() {
  const [searchMood, setSearchMood] = useState('')
  const [step, setStep] = useState(1)
  const [placeholder, setPlaceholder] = useState('How are you feeling today?')
  const [collectedData, setCollectedData] = useState([])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchMood.trim()) return

    const newData = [...collectedData, searchMood]
    setCollectedData(newData)

    if (step === 1) {
      setPlaceholder('Name one artist you like...')
      setStep(2)
    } else if (step === 2) {
      setPlaceholder('Name another artist you like...')
      setStep(3)
    } else if (step === 3) {
      setPlaceholder('Tell us one more artist...')
      setStep(4)
    } else if (step === 4) {
      setPlaceholder('Your recommendations are being prepared...')
      setStep(5)
    }

    setSearchMood('')
  }

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
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </div>
          </form>

          <div className="mood-buttons">
            <button onClick={() => handleMoodClick('happy')}>Happy</button>
            <button onClick={() => handleMoodClick('sad')}>Sad</button>
            <button onClick={() => handleMoodClick('calm')}>Calm</button>
            <button onClick={() => handleMoodClick('energetic')}>Energetic</button>
            <button onClick={() => handleMoodClick('romantic')}>Romantic</button>
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