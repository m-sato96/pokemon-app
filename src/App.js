import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");

  const fetchData = async (url) => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setPrevPage(data.previous);
    setNextPage(data.next);
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

  useEffect(() => {
    fetchData(initialURL);
  }, []);

  const noPrevious = prevPage === null ? "disabled" : "";
  const noNext = nextPage === null ? "disabled" : "";

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
          <ul className="pager">
            <li
              className={noPrevious}
              onClick={() => {
                fetchData(prevPage);
              }}
            >
              前へ
            </li>
            <li
              className={noNext}
              onClick={() => {
                fetchData(nextPage);
              }}
            >
              次へ
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
