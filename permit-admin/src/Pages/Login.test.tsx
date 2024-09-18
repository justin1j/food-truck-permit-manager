import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Login } from './Login';
import { LOGIN_MUTATION } from './Login';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';

const mocks = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: {
        username: 'admin',
        password: 'password123',
      },
    },
    result: {
      data: {
        loginAdmin: 'token123',
      },
    },
  },
];

describe('Login Component', () => {
  it('renders login form correctly', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<Login />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('logs in successfully and navigates to /permits', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/permits' element={<div>Permits Page</div>} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Login'));

    // Check that the login mutation was called and the page navigates
    await waitFor(() => {
      expect(screen.getByText('Permits Page')).toBeInTheDocument();
    });
  });

  it('displays an error message on login failure', async () => {
    const errorMocks = [
      {
        request: {
          query: LOGIN_MUTATION,
          variables: { username: 'wrong', password: 'wrong' },
        },
        error: new Error('Login error'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<Login />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'wrong' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrong' },
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(
        screen.getByText('Failed to login. Please check your credentials.')
      ).toBeInTheDocument();
    });
  });
});
