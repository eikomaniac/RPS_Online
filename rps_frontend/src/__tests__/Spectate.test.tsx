import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, waitFor } from '@testing-library/react';
import Spectate from '../components/Spectate';
import axios from 'axios';

jest.mock('axios');

describe('Spectate', () => {
  it('calls the API and updates the state on successful response', async () => {
    const mockResponse = {
      aI1Option: 'rock',
      aI2Option: 'scissors',
      result: 'win'
    };
    axios.get.mockResolvedValue({ data: mockResponse });
    const { getByText, getByRole, findByText } = render(<Router><Spectate /></Router>);
    const playButton = getByRole('button', { name: /Play/i });
    fireEvent.click(playButton);
    await findByText(/ai 1 wins/i);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/spectate`);
  });

  it('displays error message on failed API call', async () => {
    axios.get.mockRejectedValue(expect.any(Error));
    const { getByRole } = render(<Router><Spectate /></Router>);
    const playButton = getByRole('button', { name: /play/i });
    const consoleSpy = jest.spyOn(console, 'error');
    fireEvent.click(playButton);
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/spectate`);
  });  
});
