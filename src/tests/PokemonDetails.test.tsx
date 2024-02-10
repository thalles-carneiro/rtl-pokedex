import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const MEW_DETAILS_ROUTE = '/pokemon/151';

describe('Testa o componente <PokemonDetails.tsx />', () => {
  test('as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />, { route: MEW_DETAILS_ROUTE });

    const pokemonDetailsName = screen.getByRole('heading', { level: 2, name: 'Mew Details' });
    expect(pokemonDetailsName).toBeInTheDocument();

    const pokemonDetailsLink = screen.queryByRole('link', { name: 'More details' });
    expect(pokemonDetailsLink).not.toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summaryHeading).toBeInTheDocument();

    const MEW_SUMMARY = 'Apparently, it appears only to those people who are pure of heart and have a strong desire to see it.';
    const pokemonSummary = screen.getAllByText(MEW_SUMMARY, { selector: 'p' });
    expect(pokemonSummary).toHaveLength(1);
  });

  test('existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />, { route: MEW_DETAILS_ROUTE });

    const locationsHeading = screen.getByRole('heading', { level: 2, name: 'Game Locations of Mew' });
    expect(locationsHeading).toBeInTheDocument();

    const pokemonLocations = screen.getAllByAltText(/location/);
    expect(pokemonLocations).toHaveLength(1);

    const MEW_LOCATION_URL = 'https://archives.bulbagarden.net/media/upload/e/e4/Hoenn_Faraway_Island_Map.png';
    expect(pokemonLocations[0]).toHaveAttribute('src', MEW_LOCATION_URL);

    const pokemonLocation = screen.getByText('Faraway Island', { selector: 'em' });
    expect(pokemonLocation).toBeInTheDocument();
  });

  test('ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', async () => {
    const { user } = renderWithRouter(<App />, { route: MEW_DETAILS_ROUTE });

    const favoritePokemonCheckbox = screen.getByLabelText('Pokémon favoritado?', { selector: 'input' });
    expect(favoritePokemonCheckbox).toHaveAttribute('type', 'checkbox');
    expect(favoritePokemonCheckbox).toHaveProperty('checked', false);

    const favoriteIcon = screen.queryByAltText(/is marked as favorite/);
    expect(favoriteIcon).not.toBeInTheDocument();

    await user.click(favoritePokemonCheckbox);
    expect(favoritePokemonCheckbox).toHaveProperty('checked', true);

    const pokemonFavoriteIcon = screen.getByAltText(/is marked as favorite/);
    expect(pokemonFavoriteIcon).toBeInTheDocument();

    await user.click(favoritePokemonCheckbox);

    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
