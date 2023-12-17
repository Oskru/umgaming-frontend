import { useState } from 'react';
import RemainingTime from '../components/RemainingTime';
import '../styles/components/Rewards.css';

type RewardError = {
  error: string;
};

type RewardOk = {
  reward: string;
  rewardCount: number;
};

type RewardResponse = RewardError | RewardOk;

function isRewardError(response: RewardResponse): response is RewardError {
  return (response as RewardError).error !== undefined;
}

function Rewards() {
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [responseStatus, setResponseStatus] = useState<number>(0);

  const [reward, setReward] = useState<{ name: string; count: number }>({
    name: '',
    count: 0,
  });

  const handleRedeemReward = async () => {
    try {
      setMessage('');
      setError(false);
      setResponseStatus(0);
      setReward({ name: '', count: 0 });

      if (!username) {
        setError(true);
        setMessage('Podaj nick na serwerze!');
        return;
      }

      const response = await fetch(
        `https://umgaming-backend.onrender.com/randomize-reward`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({ username }),
        },
      );

      const responseData: RewardResponse = await response.json();
      setResponseStatus(response.status);

      if (isRewardError(responseData)) {
        setError(true);
        setMessage(responseData.error);
        return;
      }

      setReward({
        name: responseData.reward,
        count: responseData.rewardCount,
      });
      console.log(responseData);

      setError(false);
      setMessage('Nagroda została odebrana');
      return;
    } catch {
      setError(true);
      setMessage('Wystąpił błąd podczas odbierania nagrody');
    }
  };

  return (
    <>
      <h1>Nagrody</h1>
      <p>Na tej stronie możesz odebrać codzienne, losowe nagrody</p>
      <p>
        Uwaga! Aby prawidłowo odebrać nagrodę, musisz być zalogowany na serwerze
      </p>
      <p className="redeem-form">
        <label htmlFor="username">Nick na serwerze</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="redeem-form__button" onClick={handleRedeemReward}>
          <span className="redeem-form__button__title">Odbierz nagrodę</span>
        </button>

        {!error && message && (
          <span style={{ display: 'block', marginTop: '30px' }}>
            Odebrana nagroda: {reward.name} (ilość: {reward.count})
          </span>
        )}
        {error && (
          <span style={{ color: 'red', display: 'block', marginTop: '30px' }}>
            {message}
            {responseStatus === 400 && (
              <div style={{ marginTop: '10px' }}>
                Pozostały czas do odebrania nagrody: <RemainingTime />
              </div>
            )}
          </span>
        )}
      </p>
    </>
  );
}

export default Rewards;
