import { useState } from 'react';
import './App.css'
import usePokemon from './hooks/usePokemon'

function App() {
  const {pokemon, loading,error, fetchPokemon} = usePokemon();
  const [name,setName] = useState("");
  return (
    <>
      <input 
        value={name}
        type="text" 
        onChange={(e)=>setName(e.target.value)} 
        placeholder='Search Pokemon'/>
      <button onClick={()=>fetchPokemon(name)}> Search</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {pokemon && (
        <div>
          <h2>Name:{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt="image of pokemon" />
          <p>Height:{pokemon.height}</p>
          <p>Weight:{pokemon.weight}</p>
          <h3>Types:</h3>
          <ul>
            {pokemon.types.map((t, i) => (
              <li key={i}>{t.type.name}</li>
            ))}
          </ul>
          <h3>Abilities:</h3>
          <ul>
            {pokemon.abilities.map((a,i)=>(
              <li key={i}>{a.ability.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default App
