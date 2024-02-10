import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import pokemonList from '../data';

describe('Testa o componente <FavoritePokemon.tsx />', () => {
  test('é exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [] } />);

    const noFavoritePokemonFound = screen.getByText('No favorite Pokémon found', { selector: 'p' });

    expect(noFavoritePokemonFound).toBeInTheDocument();
  });

  test('ao favoritar a partir da página de detalhes, apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<FavoritePokemon
      pokemonList={ [pokemonList[0]] }
    />);

    const noFavoritePokemonFound = screen.queryByText('No favorite pokemon found', { selector: 'p' });
    expect(noFavoritePokemonFound).not.toBeInTheDocument();

    const favoriteIcon = screen.getAllByRole('img', { name: /is marked as favorite/ });
    expect(favoriteIcon).toHaveLength(1);
  });
});
