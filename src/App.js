import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(initialURL);
      const data = await response.json();
      const urls = data.results.map((result) => result.url);
      const _pokemonData = await Promise.all(
        urls.map(async (url) => {
          const pokemonResponse = await fetch(url);
          return pokemonResponse.json();
        })
      );
      setPokemonData(_pokemonData);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <div>
          <h1>Pokemon List</h1>
          {pokemonData.map((pokemon) => (
            <div key={pokemon.id}>
              <h2>{pokemon.name}</h2>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
