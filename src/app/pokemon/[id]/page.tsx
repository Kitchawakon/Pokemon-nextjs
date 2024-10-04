'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import Image from next/image

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
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
  stats: { base_stat: number; stat: { name: string } }[];
}

export default function PokemonDetail({ params }: { params: { id: string } }) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [params.id]);

  if (!pokemon) return <p>Loading...</p>;

  // Convert height and weight to correct units
  const height = pokemon.height / 10; // height is given in decimetres
  const weight = pokemon.weight / 10; // weight is given in hectograms

  // Find base stats
  const hp = pokemon.stats.find((stat) => stat.stat.name === 'hp')?.base_stat;
  const attack = pokemon.stats.find((stat) => stat.stat.name === 'attack')?.base_stat;
  const defense = pokemon.stats.find((stat) => stat.stat.name === 'defense')?.base_stat;
  const spAtk = pokemon.stats.find((stat) => stat.stat.name === 'special-attack')?.base_stat;
  const spDef = pokemon.stats.find((stat) => stat.stat.name === 'special-defense')?.base_stat;
  const speed = pokemon.stats.find((stat) => stat.stat.name === 'speed')?.base_stat;
  const total = hp! + attack! + defense! + spAtk! + spDef! + speed!;

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1>{pokemon.name} (#{pokemon.id.toString().padStart(4, '0')})</h1>
        {/* Use Image component from Next.js */}
        <Image 
          src={pokemon.sprites.front_default} 
          alt={pokemon.name} 
          width={100} // Set the width of the image
          height={100} // Set the height of the image
        />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
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

        <div style={{ marginTop: '20px', textAlign: 'left', width: '100%' }}>
          <p><strong>Height:</strong> {height} m</p>
          <p><strong>Weight:</strong> {weight} kg</p>

          <h3>Base Stats:</h3>
          <ul style={styles.statsList}>
            <li><strong>HP:</strong> {hp}</li>
            <li><strong>Attack:</strong> {attack}</li>
            <li><strong>Defense:</strong> {defense}</li>
            <li><strong>Sp. Atk:</strong> {spAtk}</li>
            <li><strong>Sp. Def:</strong> {spDef}</li>
            <li><strong>Speed:</strong> {speed}</li>
            <li><strong>Total:</strong> {total}</li>
          </ul>
        </div>

        <button onClick={() => router.push('/pokemon')} style={styles.button}>
          Back to Pokemon List
        </button>
      </div>
    </main>
  );
}

const styles: React.CSSProperties = {
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '300px',
  },
  statsList: {
    listStyleType: 'none',
    padding: 0,
    textAlign: 'left', // Align stats to the left
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
