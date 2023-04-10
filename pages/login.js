import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Ваш код для надсилання запиту на сервер для перевірки введеного логіну та пароля
    // Якщо логін та пароль введені вірно, можна виконати:
    router.push('/dashboard');
  };

  return (
    <div>
      <h1>Вхід до системи</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Ім'я користувача:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
};

export default Login;