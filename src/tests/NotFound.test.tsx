import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testa o componente <NotFound.tsx />', () => {
  test('a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const notFoundHeading = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });
    expect(notFoundHeading).toBeInTheDocument();
  });

  test('a página mostra a imagem com o texto alternativo', () => {
    renderWithRouter(<NotFound />);

    const IMAGE_ALT = 'Clefairy pushing buttons randomly with text I have no idea what i\'m doing';
    const notFoundImage = screen.getByAltText(IMAGE_ALT);

    expect(notFoundImage).toBeInTheDocument();
  });
});
