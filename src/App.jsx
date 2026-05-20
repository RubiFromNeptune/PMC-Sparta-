import React, { useState, useEffect } from 'react';
import './index.css';

export default function App() {
  const demoUsers = [
    { login: 'admin', password: 'arasaka2077', role: 'Administrator' },
    { login: 'netrunner', password: 'blackwall', role: 'Netrunner' },
    { login: 'merc', password: 'edgerunner', role: 'Mercenary' },
  ];

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('cyberpunk_user');
    if (saved) {
      setUser(JSON.parse(saved));
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    const found = demoUsers.find(
      (u) => u.login === login && u.password === password
    );

    if (found) {
      setLoggedIn(true);
      setUser(found);
      localStorage.setItem('cyberpunk_user', JSON.stringify(found));
      setError('');
    } else {
      setError('ACCESS DENIED // INVALID CREDENTIALS');
    }
  };

  const logout = () => {
    localStorage.removeItem('cyberpunk_user');
    setLoggedIn(false);
    setUser(null);
  };

  if (!loggedIn) {
    return (
      <div className="container">
        <div className="login-box">
          <h1>CYBERFORUM</h1>
          <p>Night City Underground Network</p>

          <input
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="error">{error}</div>}

          <button onClick={handleLogin}>CONNECT</button>

          <div className="demo">
            <p>admin / arasaka2077</p>
            <p>netrunner / blackwall</p>
            <p>merc / edgerunner</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header>
        <h1>NIGHT CITY FORUM</h1>
        <div>
          <span>{user.login} | {user.role}</span>
          <button onClick={logout}>Disconnect</button>
        </div>
      </header>

      <main>
        <div className="card">
          <h2>Latest Threads</h2>

          <div className="thread">
            <h3>Blackwall Activity Rising</h3>
            <p>Unknown AI signals detected beyond the Blackwall.</p>
          </div>

          <div className="thread">
            <h3>Mercenary Contracts</h3>
            <p>High-risk extraction jobs available in Watson.</p>
          </div>

          <div className="thread">
            <h3>Cyberware Discussion</h3>
            <p>Best stealth implants after patch 2.0?</p>
          </div>
        </div>
      </main>
    </div>
  );
}
