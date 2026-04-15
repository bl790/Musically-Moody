import { useState } from 'react'
import './App.css'

function App() {
    const [searchMood, setSearchMood] = useState("");
    const [step, setStep] = useState(1); // tracks question user is being asked
    const [placeholder, setPlaceholder] = useState("How are you feeling?");
    const [collectedData, setCollectedData] = useState([]);

    const handleSearch = async (e) => {
      e.preventDefault(); // Prevents page from reloading
      if (!searchMood) return;
      console.log("Step ${step} data collected: ", searchMood);

      const newData = [...collectedData, searchMood];
      setCollectedData(newData);

      if (step == 1) {
        fetch(``)
        .then((response) => response.json())
        .then((data) => { //sees if answers inputted are valid
          if (data && data.exists) {
            setPlaceholder("Name three artists you like...")
            setStep(2);
            setSearchMood("");
          }
          else {
            setPlaceholder("Retype the artist again.");
            setSearchMood("");
          }
        })
      }
      else if (step == 2){
        setPlaceholder("Name two more artists you like...")
        setStep(3);
      }
      else if (step == 3){
        setPlaceholder("Name one more artist you like...")
        setStep(4);
      }
      else if (step == 4){
        setPlaceholder("Making a list of songs based on your preferences...")
        setStep(5);
      }
      setSearchMood("");
    };

  return (
    <>
      <section id="home">

        {/* Makes the search bar */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=search" />
        <form onSubmit={handleSearch}>
          <div className="search">
            <input className="search-input" id="type-mood" name="mood" type="search" autoComplete="off" placeholder={placeholder} value={searchMood}
                   onChange={(e) => setSearchMood(e.target.value)}></input>
            <button type="submit" className="mood-search" onClick={handleSearch}>SEARCH</button>
          </div>
        </form>

        {/* Collects results *
        <div className="moods">
          {mood.map((item, index) => (
            <div key={index} className="mood-item">
              {item.name}
            </div>
          ))}
        </div> */}

      </section>

      {/*<section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>*/}
    </>
  )
}

export default App
