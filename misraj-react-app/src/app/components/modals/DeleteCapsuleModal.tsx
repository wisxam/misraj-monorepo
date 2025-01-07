import { useState } from 'react';
import { Button, Modal, Box, Typography, Stack } from '@mui/material';
import { useDeleteCapsule } from '../../hooks/useCapsules';
import { useSnackbar } from '../ctx/SnackbarContext';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  capsuleId: string;
};

const DeleteCapsuleModal = ({ capsuleId }: Props) => {
  const { showSnackbar } = useSnackbar();
  const deleteCapsuleMutation = useDeleteCapsule();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleDelete = () => {
    deleteCapsuleMutation.mutate(capsuleId, {
      onSuccess: () => {
        showSnackbar('Capsule deleted successfully!', 'success');
        queryClient.invalidateQueries({
          queryKey: ['capsules'],
        });
        handleClose();
      },
      onError: (error: Error) => {
        showSnackbar(error.message || 'Failed to delete capsule', 'error');
        handleClose();
      },
    });
  };

  return (
    <Box>
      <Button variant="contained" color="error" onClick={handleOpen}>
        Delete
      </Button>

      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="delete-modal-title"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '#f5f5dc',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            minWidth: 600,
          }}
        >
          <Typography
            id="delete-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Confirm deletion
          </Typography>
          <Typography variant="body1" mb={3}>
            Are you sure of deleting your capsule?
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={deleteCapsuleMutation.isPending}
            >
              {deleteCapsuleMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};
export default DeleteCapsuleModal;
