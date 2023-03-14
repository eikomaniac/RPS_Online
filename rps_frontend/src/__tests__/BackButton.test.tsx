import { render, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('BackButton', () => {
  test('navigates back when the button is clicked', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
    const { getByRole } = render(<BackButton />);
    const backButton = getByRole('button');
    fireEvent.click(backButton);
    expect(navigateMock).toHaveBeenCalledWith(-1);
  });
});
