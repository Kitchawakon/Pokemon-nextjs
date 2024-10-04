'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const typeColors: { [key: string]: string } = {
  grass: '#78C850',
  poison: '#A040A0',
  fire: '#F08030',
  water: '#6890F0',
  bug: '#A8B820',
  normal: '#A8A878',
  electric: '#F8D030',
  ground: '#E0C068',
  fairy: '#EE99AC',
  fighting: '#C03028',
  psychic: '#F85888',
  rock: '#B8A038',
  ghost: '#705898',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  flying: '#A890F0',
};

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then((response) => response.json())
      .then((data) => {
        const detailedPokemonPromises = data.results.map((pokemon: { url: string }) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        return Promise.all(detailedPokemonPromises);
      })
      .then((data) => {
        setPokemonList(data);
      })
      .finally(() => setLoading(false))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <main style={styles.main}>
      <h1>Pokemon List</h1>
      <div style={styles.container}>
        {pokemonList.map((pokemon, index) => (
          <div key={index} style={styles.card}>
            <h2>{pokemon.name}</h2>
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={100}
              height={100}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              {pokemon.types.map((type, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: typeColors[type.type.name],
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    textTransform: 'uppercase',
                    fontSize: '12px',
                  }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
            <button style={styles.button} onClick={() => console.log(`Selected ${pokemon.name}`)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

const styles: React.CSSProperties = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '800px',
  },
  card: {
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
