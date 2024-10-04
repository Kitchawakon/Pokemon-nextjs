'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define colors for each Pokemon type
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
  name: string;
  url: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

export default function PokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [limit, setLimit] = useState(20); // เริ่มแสดง 20 ตัว
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        const promises = data.results.map((poke: { url: string }) => 
          fetch(poke.url).then((res) => res.json())
        );
        Promise.all(promises).then((results) => {
          setPokemon(results);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [limit]);

  const loadMore = () => {
    setLimit((prevLimit) => prevLimit + 20); // เพิ่มจำนวนที่แสดงอีก 20 ตัว
  };

  return (
    <main style={{ padding: '20px' }}>
      <h1>Pokemon List</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {pokemon.map((poke, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', textAlign: 'center', width: '150px' }}>
            <Link href={`/pokemon/${index + 1}`}>
              <Image
                src={poke.sprites.front_default}
                alt={poke.name}
                width={100}
                height={100}
              />
              <h3>{poke.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                {poke.types.map((type, idx) => (
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
            </Link>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <button onClick={loadMore} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Load More
        </button>
      )}
    </main>
  );
}
