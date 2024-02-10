import { screen, within } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const HOME = 'Home';
const ABOUT = 'About';
const FAVORITE_POKEMON = 'Favorite Pokémon';

describe('Testa o componente <App.tsx />', () => {
  test('o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const nav = screen.getByRole('navigation');
    const navLinks = within(nav).getAllByRole('link');

    expect(navLinks).toHaveLength(3);
    expect(navLinks[0]).toHaveTextContent(HOME);
    expect(navLinks[1]).toHaveTextContent(ABOUT);
    expect(navLinks[2]).toHaveTextContent(FAVORITE_POKEMON);
  });

  test('a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação', async () => {
    const { user } = renderWithRouter(<App />, { route: '/about' });

    const homeLink = screen.getByRole('link', { name: HOME });

    const queryHomeHeading = screen.queryByRole('heading', { level: 2, name: 'Encountered Pokémon' });
    expect(queryHomeHeading).not.toBeInTheDocument();

    await user.click(homeLink);

    const getHomeHeading = screen.getByRole('heading', { level: 2, name: 'Encountered Pokémon' });
    expect(getHomeHeading).toBeInTheDocument();
  });

  test('a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', async () => {
    const { user } = renderWithRouter(<App />, { route: '/' });

    const aboutLink = screen.getByRole('link', { name: ABOUT });

    const queryAboutHeading = screen.queryByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(queryAboutHeading).not.toBeInTheDocument();

    await user.click(aboutLink);

    const getAboutHeading = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(getAboutHeading).toBeInTheDocument();
  });

  test('a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', async () => {
    const { user } = renderWithRouter(<App />, { route: '/' });

    const favoritePokemonLink = screen.getByRole('link', { name: FAVORITE_POKEMON });

    const queryFavoritePokemonHeading = screen.queryByRole('heading', { level: 2, name: FAVORITE_POKEMON });
    expect(queryFavoritePokemonHeading).not.toBeInTheDocument();

    await user.click(favoritePokemonLink);

    const getFavoritePokemonHeading = screen.getByRole('heading', { level: 2, name: FAVORITE_POKEMON });
    expect(getFavoritePokemonHeading).toBeInTheDocument();
  });

  test('a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', async () => {
    renderWithRouter(<App />, { route: '/wrong-route' });

    const homeHeading = screen.queryByRole('heading', { level: 2, name: HOME });
    expect(homeHeading).not.toBeInTheDocument();

    const notFoundHeading = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });
    expect(notFoundHeading).toBeInTheDocument();
  });
});
