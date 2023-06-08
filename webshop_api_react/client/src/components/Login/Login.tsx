import { useReducer, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type State = {
  email: string;
  password: string;
  loggedIn: boolean;
  errorMessage: string;
};

type Action =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_LOGGED_IN'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const initialState: State = {
  email: '',
  password: '',
  loggedIn: false,
  errorMessage: '',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_LOGGED_IN':
      return { ...state, loggedIn: action.payload };
    case 'SET_ERROR':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

function Logout({ handleLogout }: { handleLogout: () => void }): JSX.Element {
  return (
    <div className='flex flex-col items-center justify-center gap-4 mt-4 py-2'>
      <h2>Welcome, you are logged in!</h2>
      <button onClick={handleLogout} className='bg-red-600 text-white text-lg font-medium
       rounded-lg py-1 px-3'>Logout</button>
    </div>
  );
}

function Login(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!state.email || !state.password) {
      dispatch({ type: 'SET_ERROR', payload: 'Please enter both email and password.' });
      return;
    }

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: state.email, password: state.password }),
      });

      if (!response.ok) {
        throw new Error('Wrong email or password');
      }

      dispatch({ type: 'SET_LOGGED_IN', payload: true });

      localStorage.setItem('email', state.email);
      localStorage.setItem('password', state.password);

      //navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Wrong email or password. Please try again.' });
    }
  };

  const handleLogout = (): void => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    dispatch({ type: 'SET_LOGGED_IN', payload: false });
    navigate('/login');
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedEmail && storedPassword) {
      dispatch({ type: 'SET_LOGGED_IN', payload: true });
      //navigate('/');
    }
  }, []);

  if (state.loggedIn) {
    return <Logout handleLogout={handleLogout} />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-4 mt-4 py-2'>
        {state.errorMessage && <div>{state.errorMessage}</div>}
        <div>
          <label htmlFor="email">Email</label>
          <input
            className='border rounded-lg px-2 py-1'
            type="email"
            autoComplete="username"
            id="email"
            value={state.email}
            onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className='border rounded-lg px-2 py-1'
            type="password"
            autoComplete="current-password"
            id="password"
            value={state.password}
            onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
            required
          />
        </div>
        <div>
          <button type="submit" className='bg-blue-600 text-white text-lg font-medium rounded-lg py-1 px-3'>
            Login
          </button>
        </div>
        <p className='text-red-500 text-center'>{state.errorMessage}</p>
      </form>
    </div>
  );
}

export default Login;
