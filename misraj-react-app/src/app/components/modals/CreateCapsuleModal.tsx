import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateCapsule } from '../../hooks/useCapsules';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from '../ctx/SnackbarContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const capsuleSchema = z.object({
  title: z
    .string()
    .min(3, 'Capsule title is required')
    .max(10, 'Capsule title is too long'),
  content: z
    .string()
    .min(5, 'Capsule content is required')
    .max(30, 'Capsule content is too long'),
  releaseDate: z.string().min(1, 'Release date is required'),
  image: z.string().nullable().optional(),
});
type FormData = z.infer<typeof capsuleSchema>;

const CreateCapsuleModal = ({ isOpen, onClose }: Props) => {
  const [hour, setHour] = useState<number>(0);

  const { showSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(capsuleSchema),
  });
  const queryClient = useQueryClient();

  const { mutate: createCapsule, isPending, error } = useCreateCapsule();

  useEffect(() => {
    const now = new Date();
    setHour(now.getHours());
  }, []);

  const handleReleaseDate = () => {
    const now = new Date();
    now.setHours(now.getHours() + hour);
    const releaseDate = now.toISOString();
    setValue('releaseDate', releaseDate);
  };

  const onSubmit = (data: FormData) => {
    const { title, content, releaseDate, image } = data;

    createCapsule(
      {
        title,
        content,
        releaseDate,
        image: image || '',
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['capsules'] });
          showSnackbar('Capsule created', 'success');
          onClose();
          reset();
        },
        onError: (error) => {
          showSnackbar(error.message || 'Failed creating capsule', 'error');
          console.error('Error creating capsule:', error);
        },
      }
    );
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create a New Capsule</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
            margin="dense"
            label="Capsule Title"
            type="text"
            fullWidth
            variant="outlined"
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Capsule Description"
            type="text"
            fullWidth
            variant="outlined"
            {...register('content')}
            error={!!errors.content}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Image URL"
            type="url"
            fullWidth
            variant="outlined"
            {...register('image')}
            error={!!errors.image}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <TextField
                label="Hour"
                type="number"
                value={hour}
                onChange={(e) => setHour(Number(e.target.value))}
                onBlur={handleReleaseDate}
                fullWidth
              />
            </Grid>
          </Grid>

          {errors.releaseDate && (
            <div style={{ color: 'red', marginTop: '8px' }}>
              {errors.releaseDate.message}
            </div>
          )}

          {isPending && <div>Submitting...</div>}

          {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}

          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={isPending}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCapsuleModal;
