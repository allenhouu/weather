import {useState} from 'react'
import './App.css'
import {useAutoComplete, useSearch, useCoordinates} from "./Hooks.ts";
import Input from "./prestylesearch.tsx";
import Card from "./prestyleweather.tsx";

function App() {
    const[currSearch, setCurrSearch] = useState<string>('Freehold Township, NJ');
    const[search, setSearch] = useState<string>('');
    const autoComplete = useAutoComplete(currSearch);
    const [latitude, longitude] = useSearch(search);
    const weather = useCoordinates(latitude, longitude);


  return (
      <>
          <Input currSearch={currSearch} setCurrSearch={setCurrSearch}></Input>



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

          {weather && <Card weather={weather} currSearch={search} />}

      </>
  )
}
export default App