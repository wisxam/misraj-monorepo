import { useState } from 'react';
import { Grid, Typography, Paper, Button } from '@mui/material';
import CapsuleComponent from '../components/CapsuleComponent';
import useAuthGuard from '../hooks/useAuthGuard';
import AddIcon from '@mui/icons-material/Add';
import CreateCapsuleModal from '../components/modals/CreateCapsuleModal';

const Dashboard = () => {
  useAuthGuard();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpeningModal = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="mb-2 mt-2 w-full bg-gray-100 pt-4 min-h-screen h-auto">
      <Typography
        variant="h4"
        gutterBottom
        align="left"
        sx={{ marginLeft: '20px' }}
        fontFamily={'monospace'}
      >
        Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpeningModal}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          borderRadius: '50%',
          padding: 2,
        }}
      >
        <AddIcon />
      </Button>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: 'auto' }}
      >
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper sx={{ padding: 3, height: '100%', background: '#d1d5db' }}>
            <Typography
              variant="h5"
              sx={{ color: 'black' }}
              fontFamily={'monospace'}
            >
              Capsules
            </Typography>
            <CapsuleComponent />
          </Paper>
        </Grid>
      </Grid>
      <CreateCapsuleModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

export default Dashboard;
