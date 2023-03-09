import { FC, ReactElement } from 'react';

interface RPSButtonProps {
  icon: ReactElement;
  option: string;
}

const RPSButton: FC<RPSButtonProps> = ({ icon, option }) => {
  const requestCPUresponse = () => {
    const url = "https://dummyjson.com/carts";
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('API not available');
        }
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <button
      className="rps-btn btn btn-outline-secondary border fs-1 rounded-3"
      onClick={requestCPUresponse}>
      {icon}
    </button>
  )};

export default RPSButton;