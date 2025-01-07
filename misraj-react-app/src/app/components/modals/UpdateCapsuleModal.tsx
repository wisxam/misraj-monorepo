import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateCapsule } from '../../hooks/useCapsules';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from '../ctx/SnackbarContext';

type Props = {
  capsuleId: string;
};

const capsuleSchema = z.object({
  title: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
});

type CapsuleFormData = z.infer<typeof capsuleSchema>;

const UpdateCapsuleModal = ({ capsuleId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { showSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CapsuleFormData>({
    resolver: zodResolver(capsuleSchema),
    defaultValues: {
      title: '',
      content: '',
      image: '',
    },
  });

  const { mutate: updateCapsule, isPending } = useUpdateCapsule();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const onSubmit = (data: CapsuleFormData) => {
    const updateData: any = {};

    if (data.title) {
      updateData.title = data.title.trim();
    }
    if (data.content && data.content.trim()) {
      updateData.content = data.content.trim();
    }
    if (data.image && data.image.trim()) {
      updateData.image = data.image.trim();
    }

    if (Object.keys(updateData).length === 0) {
      showSnackbar('No fields were updated.', 'warning');
      return;
    }

    updateCapsule(
      {
        capsuleId,
        data: updateData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['capsules'],
          });
          showSnackbar('Capsule updated', 'success');
          handleClose();
          reset();
        },
        onError: (error) => {
          showSnackbar(error.message || 'Failed updating capsule', 'error');
        },
      }
    );
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Update Capsule
      </Button>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Update Capsule</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              margin="dense"
              label="Title"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Content"
              multiline
              rows={4}
              {...register('content')}
              error={!!errors.content}
              helperText={errors.content?.message}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Image URL"
              {...register('image')}
              error={!!errors.image}
              helperText={errors.image?.message}
            />
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={isPending}>
                {isPending ? 'Updating...' : 'Update'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UpdateCapsuleModal;
