import { Card, CardContent, Typography, Box, Chip, Stack } from '@mui/material';
import { Capsule } from '../types/capsule';
import { formatRemainingTime } from '../utils/timeUtils';
import { useUserProfile } from '../hooks/useUserProfile';
import CapsuleDeletionButton from './modals/DeleteCapsuleModal';
import CapsuleShareToggle from './CapsuleShareToggle';
import UpdateCapsuleModal from './modals/UpdateCapsuleModal';

type Props = {
  capsule: Capsule;
  remainingTime: number;
};

const CapsuleCard = ({ capsule, remainingTime }: Props) => {
  const user = useUserProfile();

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: '16px auto',
        borderRadius: 2,
        boxShadow: 24,
        bgcolor: '#6b7280',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          {capsule.status === 'RELEASED' && capsule.image && (
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: 3,
                border: '2px solid #f5f5dc',
              }}
            >
              <img
                src={capsule.image}
                alt={capsule.content || ''}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          )}
          <Typography
            variant="h5"
            component="div"
            fontWeight="bold"
            color="#f5f5dc"
            sx={{ textAlign: 'center', flex: 1, ml: capsule.image ? 2 : 0 }}
          >
            {capsule.title || 'No Title'}
          </Typography>
          {user && user.userId === capsule.userId && (
            <CapsuleShareToggle
              capsuleId={capsule.id}
              initialShareable={capsule.shareAble}
            />
          )}
        </Box>

        <Typography variant="body2" color="#f5f5dc" mt={1}>
          {capsule.status === 'RELEASED'
            ? capsule.content
            : 'Not visible until opened!'}
        </Typography>

        <Stack direction="row" spacing={1} mt={2} alignItems="center">
          <Chip
            label={capsule.status}
            color={capsule.status === 'RELEASED' ? 'success' : 'warning'}
          />
          <Typography variant="caption" color="#f5f5dc">
            {capsule.status === 'RELEASED' ? 'Released' : 'Upcoming'}
          </Typography>
        </Stack>
        <Box
          mt={2}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" fontWeight="medium" color="#f5f5dc">
            Remaining Time:
          </Typography>
          <Typography variant="body1" fontWeight="bold" color="#f5f5dc">
            {remainingTime > 0
              ? formatRemainingTime(remainingTime)
              : 'Time Expired'}
          </Typography>
        </Box>
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          {user && user.userId === capsule.userId && (
            <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <CapsuleDeletionButton capsuleId={capsule.id} />
            </Box>
          )}
          <Box
            mt={2}
            sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}
          >
            {user && user.userId === capsule.userId && (
              <UpdateCapsuleModal capsuleId={capsule.id} />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CapsuleCard;
