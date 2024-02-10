import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';
import pokemonList from '../data';

const pokemonMock = pokemonList[0];

describe('Testa o componente <Pokemon.tsx />', () => {
  test('é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonMock }
      showDetailsLink
      isFavorite={ false }
    />);

    const pokemonName = screen.getByText('Pikachu', { selector: 'p' });
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByText('Electric', { selector: 'p' });
    expect(pokemonType).toBeInTheDocument();

    const pokemonWeight = screen.getByText('Average weight: 6.0 kg', { selector: 'p' });
    expect(pokemonWeight).toBeInTheDocument();

    const PIKACHU_IMAGE_URL = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
    const pokemonImage = screen.getByAltText('Pikachu sprite');
    expect(pokemonImage).toHaveProperty('src', PIKACHU_IMAGE_URL);
  });

  test('o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonMock }
      showDetailsLink
      isFavorite={ false }
    />);

    const pokemonDetailsLink = screen.getByRole('link', { name: 'More details' });
    expect(pokemonDetailsLink.getAttribute('href')).toBe('/pokemon/25');
  });

  test('ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', async () => {
    const { user } = renderWithRouter(<App />);

    const pokemonDetailsLink = screen.getByRole('link', { name: 'More details' });
    await user.click(pokemonDetailsLink);

    const pokemonDetailsHeading = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(pokemonDetailsHeading).toBeInTheDocument();
    expect(window.location.pathname).toMatch('/pokemon/25');
  });

  test('existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonMock }
      showDetailsLink
      isFavorite
    />);

    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon.getAttribute('src')).toBe('/star-icon.png');
  });
});
