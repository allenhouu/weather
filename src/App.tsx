import {useState} from 'react'
import './App.css'
import {useAutoComplete, useSearch, useCoordinates} from "./Hooks.ts";
import {Weather} from "./Weather.tsx";

function App() {
    const[currSearch, setCurrSearch] = useState<string>('Freehold Township, Nj');
    const[search, setSearch] = useState<string>('Freehold Township, NJ');
    const autoComplete = useAutoComplete(currSearch);
    const [latitude, longitude] = useSearch(search);
    const weather = useCoordinates(latitude, longitude);

  return (
      <>
        <input placeholder="Type here to search" value={currSearch} onChange={e => setCurrSearch(e.target.value)}/>
        <button onClick={() => {
            setSearch(currSearch);
        }
        }>Search</button>
          {
          autoComplete.map((item, i) =>
          <div id="result" key={i}>
              <button onClick={() => {
                  setCurrSearch(item.formatted);
                  setSearch(item.formatted);
              }}>
                  {item.formatted}
              </button>
          </div>
          )
          }
          <div id="coordinates">{latitude}, {longitude}</div>
          <div id="weather">{weather && <Weather weather={weather}/>}</div>
      </>
  )
}
export default App