import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Logout component
function Logout({ handleLogout }: { handleLogout: () => void }): JSX.Element {
  return (
    <div>
      <h2>Welcome, you are logged in!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Validate email and password
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Wrong email or password');
      }

      const data = await response.json();
      console.log('Login successful', data);

      // Store username and password in localStorage
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);

      // Redirect to the home page or any other desired page
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Wrong email or password. Please try again.');
    }
  };

  const handleLogout = (): void => {
    // Clear localStorage
    localStorage.removeItem('email');
    localStorage.removeItem('password');

    // Redirect to the login page
    navigate('/login');
  };

  useEffect(() => {
    // Check for stored login credentials
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedEmail && storedPassword) {
      // Update login status
      navigate('/');
    }
  }, []);

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && <div>{errorMessage}</div>}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;

