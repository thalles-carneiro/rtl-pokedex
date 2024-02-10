import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Testa o componente <About.tsx />', () => {
  test('a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutHeading = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });

    expect(aboutHeading).toBeInTheDocument();
  });

  test('a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutParagraphs = screen.getAllByText(/Pokémon/, { selector: 'p' });

    expect(aboutParagraphs).toHaveLength(2);
  });

  test('a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const IMAGE_URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImage = screen.getByRole('img', { name: 'Pokédex' });

    expect(pokedexImage).toHaveProperty('src', IMAGE_URL);
  });
});
