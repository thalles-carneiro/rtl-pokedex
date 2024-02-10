import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import { Pokedex } from '../pages';

const pokemonListMock = [pokemonList[0], pokemonList[1]];
const pokemonTypesMock = [...new Set(pokemonListMock.map(({ type }) => type))];

describe('Testa o componente <Pokedex.tsx />', () => {
  test('a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonListMock }
      favoritePokemonIdsObj={ {} }
    />);

    const homeHeading = screen.getByRole('heading', { level: 2, name: 'Encountered Pokémon' });

    expect(homeHeading).toBeInTheDocument();
  });

  test('é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    const { user } = renderWithRouter(<Pokedex
      pokemonList={ pokemonListMock }
      favoritePokemonIdsObj={ {} }
    />);

    const nextPokemonBtn = screen.getByRole('button', { name: 'Próximo Pokémon' });

    const pokemonName = screen.getByText('Pikachu', { selector: 'p' });
    expect(pokemonName).toBeInTheDocument();

    await user.click(nextPokemonBtn);

    const secondPokemonName = screen.getByText('Charmander', { selector: 'p' });
    expect(secondPokemonName).toBeInTheDocument();

    await user.click(nextPokemonBtn);

    const firstPokemonName = screen.getByText('Pikachu', { selector: 'p' });
    expect(firstPokemonName).toBeInTheDocument();
  });

  test('é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonListMock }
      favoritePokemonIdsObj={ {} }
    />);

    const pokemonImage = screen.getAllByAltText(/sprite/);
    expect(pokemonImage).toHaveLength(1);

    const pokemonDetailsLink = screen.getAllByRole('link', { name: 'More details' });
    expect(pokemonDetailsLink).toHaveLength(1);
  });

  test('a Pokédex tem os botões de filtro', async () => {
    const { user } = renderWithRouter(<Pokedex
      pokemonList={ pokemonListMock }
      favoritePokemonIdsObj={ {} }
    />);

    const filterByAllBtn = screen.getByRole('button', { name: 'All' });
    expect(filterByAllBtn).toBeInTheDocument();

    const filterByTypeBtn = screen.getAllByTestId('pokemon-type-button');
    expect(filterByTypeBtn).toHaveLength(pokemonTypesMock.length);

    pokemonTypesMock.forEach((type) => {
      const filterBtn = screen.getByRole('button', { name: type });
      expect(filterBtn).toBeInTheDocument();
    });

    const filterByFireBtn = screen.getByRole('button', { name: 'Fire' });

    await user.click(filterByFireBtn);

    const firstFirePokemonType = screen.getAllByText('Fire', { selector: 'p' });
    expect(firstFirePokemonType).toHaveLength(1);

    const nextPokemonBtn = screen.getByRole('button', { name: 'Próximo Pokémon' });
    await user.click(nextPokemonBtn);

    const stillFirePokemonType = screen.getAllByText('Fire', { selector: 'p' });
    expect(stillFirePokemonType).toHaveLength(1);

    await user.click(filterByAllBtn);

    const firstPokemonName = screen.getByText('Pikachu', { selector: 'p' });
    expect(firstPokemonName).toBeInTheDocument();
  });
});
