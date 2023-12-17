import { useState } from 'react';
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

function isRewardOk(response: RewardResponse): response is RewardOk {
  return (
    (response as RewardOk).reward !== undefined &&
    (response as RewardOk).rewardCount !== undefined
  );
}

function Rewards() {
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [reward, setReward] = useState<{ name: string; count: number }>({
    name: '',
    count: 0,
  });

  const handleRedeemReward = async () => {
    try {
      setMessage('');
      setError(false);
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

      if (isRewardError(responseData)) {
        setError(true);
        setMessage(responseData.error);
        return;
      }

      if (isRewardOk(responseData)) {
        setReward({
          name: responseData.reward,
          count: responseData.rewardCount,
        });
        setError(false);
        setMessage('Nagroda została odebrana');
        return;
      }
    } catch {
      setError(true);
      setMessage('Wystąpił błąd podczas odbierania nagrody');
    }
  };
  return (
    <>
      <h1>Nagrody</h1>
      <p>Na tej stronie znajdziesz dzienne nagrody do odebrania</p>
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

        {reward.name && (
          <span style={{ display: 'block', marginTop: '30px' }}>
            Odebrana nagroda: {reward.name} (ilość: {reward.count})
          </span>
        )}
        {error && (
          <span style={{ color: 'red', display: 'block', marginTop: '30px' }}>
            {message}
          </span>
        )}
      </p>
    </>
  );
}

export default Rewards;
