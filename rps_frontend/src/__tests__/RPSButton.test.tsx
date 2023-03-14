import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import RPSButton from '../components/RPSButton';
import { FaRegHandRock } from "react-icons/fa";

jest.mock('axios');

describe('RPSButton', () => {
  test('should make API call and update session state on button click', async () => {
    const setSessionMock = jest.fn();
    const setLoadingCPUMock = jest.fn();
    const setLastResultMock = jest.fn();
    axios.post.mockResolvedValueOnce({
      data: {
        cpuOption: 'rock',
        result: 'loss'
      }
    });

    const { getByRole } = render(
      <RPSButton
        icon={<FaRegHandRock />}
        option="rock"
        difficulty="easy"
        setSession={setSessionMock}
        loadingCPU={false}
        setLoadingCPU={setLoadingCPUMock}
        setLastResult={setLastResultMock}
      />
    );

    const button = getByRole('button');
    fireEvent.click(button);

    expect(setLoadingCPUMock).toHaveBeenCalledWith(true);
    expect(setSessionMock).toHaveBeenCalledWith(expect.any(Function));
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/play`, {
      userId: 1,
      cpuDifficulty: 'easy',
      userOption: 'rock',
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    await waitFor(() => expect(setSessionMock).toHaveBeenCalledWith(expect.any(Function)));
    expect(setLoadingCPUMock).toHaveBeenCalledWith(true);
    expect(setLastResultMock).toHaveBeenCalledWith(expect.stringMatching(/^(win|loss|draw)$/));
  });

  test('should log error to console when API call fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const setSessionMock = jest.fn();
    const setLoadingCPUMock = jest.fn();
    const setLastResultMock = jest.fn();
    axios.post.mockRejectedValueOnce(expect.any(Error));

    const { getByRole } = render(
      <RPSButton
        icon={<FaRegHandRock />}
        option="rock"
        difficulty="easy"
        setSession={setSessionMock}
        loadingCPU={false}
        setLoadingCPU={setLoadingCPUMock}
        setLastResult={setLastResultMock}
      />
    );

    const button = getByRole('button');
    fireEvent.click(button);

    expect(setLoadingCPUMock).toHaveBeenCalledWith(true);
    expect(setSessionMock).toHaveBeenCalledWith(expect.any(Function));
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/play`, {
      userId: 1,
      cpuDifficulty: 'easy',
      userOption: 'rock',
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error)));
    expect(setLoadingCPUMock).toHaveBeenCalledWith(false);
  });
});
