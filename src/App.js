import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";

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
        <p className="loading">Loading...</p>
      ) : (
        <div>
          <h1>Pokémon Pictorial Book</h1>
          <div className="card_wrap">
            {pokemonData.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon}></Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
