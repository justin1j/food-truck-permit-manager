import { useQuery, useMutation, gql } from '@apollo/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Container,
  Typography,
  TableContainer,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const GET_PERMITS_QUERY = gql`
  query getAllPermits {
    getAllPermits {
      id
      applicant
      facility_type
      address
      location_desc
      permit
      zip_code
      food_items
      status
    }
  }
`;

export const UPDATE_STATUS_MUTATION = gql`
  mutation updateApplicationStatus($id: Int!, $status: String!) {
    updateApplicationStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

interface Permit {
  id: number;
  applicant: string;
  facility_type: string;
  address: string;
  location_desc: string;
  permit: string;
  zip_code: number;
  food_items: string;
  status: 'REQUESTED' | 'APPROVED' | 'SUSPEND' | 'EXPIRED';
}

interface GetPermitsData {
  getAllPermits: Permit[];
}

interface PermitVars {
  id: number;
  status: string;
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 900,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  backgroundColor: theme.palette.background.paper,
  zIndex: theme.zIndex.appBar,
}));

export const Permits: React.FC = () => {
  const { data, loading, error } = useQuery<GetPermitsData>(GET_PERMITS_QUERY);
  const [updateStatus] = useMutation<Permit, PermitVars>(
    UPDATE_STATUS_MUTATION
  );

  const handleApprove = (id: number) => {
    updateStatus({
      variables: { id, status: 'APPROVED' },
      refetchQueries: [{ query: GET_PERMITS_QUERY }],
    });
  };

  const handleRevert = (id: number) => {
    updateStatus({
      variables: { id, status: 'REQUESTED' },
      refetchQueries: [{ query: GET_PERMITS_QUERY }],
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading permits</p>;

  const sortedPermits = [...(data?.getAllPermits || [])].sort(
    (a, b) => a.id - b.id
  );

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Permit Management
      </Typography>
      <Paper>
        <StyledTableContainer>
          <Table>
            <StyledTableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Applicant Name</TableCell>
                <TableCell>Facility Type</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Zip Code</TableCell>
                <TableCell>Location Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {sortedPermits.map((permit) => (
                <TableRow key={permit.id}>
                  <TableCell>{permit.id}</TableCell>
                  <TableCell>{permit.applicant}</TableCell>
                  <TableCell>{permit.facility_type}</TableCell>
                  <TableCell>{permit.address}</TableCell>
                  <TableCell>{permit.zip_code}</TableCell>
                  <TableCell>{permit.location_desc}</TableCell>
                  <TableCell>{permit.status}</TableCell>
                  <TableCell>
                    {permit.status === 'REQUESTED' && (
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => handleApprove(permit.id)}
                      >
                        Approve
                      </Button>
                    )}
                    {(permit.status === 'SUSPEND' ||
                      permit.status === 'EXPIRED') && (
                      <Button
                        variant='contained'
                        onClick={() => handleRevert(permit.id)}
                      >
                        Revert To Requested
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Paper>
    </Container>
  );
};
