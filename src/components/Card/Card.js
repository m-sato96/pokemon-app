import React from "react";
import "./Card.css";
const Card = ({ pokemon }) => {
  return (
    <div className="card_content" key={pokemon.id}>
      <div className="img_wrap">
        <h2>{pokemon.name}</h2>
        <img className="artwork_img" src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
      </div>
      <div className="content_text_wrap">
        <h3>Type</h3>
        <ul>
          {pokemon.types.map((type) => {
            return <li key={type.type.name}>{type.type.name}</li>;
          })}
        </ul>
        <h3>Data</h3>
        <ul>
          <li>weight: {pokemon.weight}</li>
          <li>height: {pokemon.height}</li>
        </ul>
      </div>
    </div>
  );
};

export default Card;
