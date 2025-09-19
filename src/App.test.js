import { render, screen } from '@testing-library/react';
import App from './App';

test('renders field hockey lineup builder headline', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /field hockey lineup builder/i });
  expect(heading).toBeInTheDocument();
});
