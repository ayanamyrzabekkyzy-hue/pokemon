import { useEffect, useState } from "react";

function App() {
  const [pokemon, setPokemon] = useState([]);

  async function getPokemon() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/ "
      );
      const data = await response.json();

      
      const pokemonData = await Promise.all(
        data.results.map(async (card) => {
          const response = await fetch(card.url);
          const data = await response.json();

          return {
            name: card.name,
            image: data.sprites.front_default,
          };
        })
      )
      

      setPokemon(pokemonData);
    } catch (error) {
      console.log("Error:", error.message);
    }
  }
  useEffect(() => {
    getPokemon();
  },[]);
  return (
    <div className="wrapper">
      {pokemon.map((card) => (
        <div className="pokemon_card" key={card.name}>
          <div className="pokemon_img">
            <img src={card.image} alt={card.name} />
          </div>
          <div className="pokemon_info">
            <p>{card.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
