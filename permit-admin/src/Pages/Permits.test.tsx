import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Permits, GET_PERMITS_QUERY, UPDATE_STATUS_MUTATION } from './Permits';
import '@testing-library/jest-dom';

const mocks = [
  {
    request: {
      query: GET_PERMITS_QUERY,
    },
    result: {
      data: {
        getAllPermits: [
          {
            id: 1,
            applicant: 'John Doe',
            facility_type: 'Restaurant',
            address: '123 Main St',
            location_desc: 'Downtown',
            permit: 'Food Permit',
            zip_code: 12345,
            food_items: 'Pizza',
            status: 'REQUESTED',
          },
        ],
      },
    },
  },
  {
    request: {
      query: UPDATE_STATUS_MUTATION,
      variables: { id: 1, status: 'APPROVED' },
    },
    result: {
      data: {
        updateApplicationStatus: {
          id: 1,
          status: 'APPROVED',
        },
      },
    },
  },
];

describe('Permits Component', () => {
  it('renders the permits table with data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Permits />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('123 Main St')).toBeInTheDocument();
    });
  });
});
