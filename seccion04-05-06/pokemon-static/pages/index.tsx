import { NextPage, GetStaticProps } from "next";
import { Card, Grid, Row, Text } from "@nextui-org/react";

import { Layout } from '../components/layouts';
import { pokeApi } from "@/api";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";
import { PokemonCard } from "@/components/pokemon";

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="My Pokemon App">
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map((pokemon, id) => (
            <PokemonCard pokemon={pokemon} key={id} />
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

// Se ejecuta del lado del servidor, y solo en build time.
// Solo se puede usar dentro de las pages, no en componentes.
// En desarrollo solo se llama cuando se llama a la página.
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`
  }))

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage;