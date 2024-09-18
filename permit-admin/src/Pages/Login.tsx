import { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const LOGIN_MUTATION = gql`
  mutation loginAdmin($username: String!, $password: String!) {
    loginAdmin(username: $username, password: $password)
  }
`;

interface LoginData {
  loginAdmin: string;
}

interface LoginVars {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login, { error }] = useMutation<LoginData, LoginVars>(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { username, password } });
      if (data?.loginAdmin) {
        localStorage.setItem('token', data.loginAdmin);
        navigate('/permits');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <Container maxWidth='xs'>
      <Typography variant='h4' gutterBottom>
        Admin Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Username'
          fullWidth
          value={username}
          onChange={handleUsernameChange}
          margin='normal'
        />
        <TextField
          label='Password'
          type='password'
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          margin='normal'
        />
        <Button type='submit' variant='contained' fullWidth>
          Login
        </Button>
        {error && (
          <Typography color='error'>
            Failed to login. Please check your credentials.
          </Typography>
        )}
      </form>
    </Container>
  );
};
