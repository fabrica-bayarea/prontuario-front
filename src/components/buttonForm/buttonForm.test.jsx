//EXEMPLO DE TESTE
import { render, screen } from '@testing-library/react';
import ButtonForm from './buttonForm'; 
import '@testing-library/jest-dom';

describe('ButtonForm', () => {
  test('deve renderizar o botão com texto correto', () => {
    render(<ButtonForm>Click Me</ButtonForm>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });})