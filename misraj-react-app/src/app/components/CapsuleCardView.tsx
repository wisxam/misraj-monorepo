import { Card, CardContent, Typography, Box, Chip, Stack } from '@mui/material';
import { Capsule } from '../types/capsule';
import { formatRemainingTime } from '../utils/timeUtils';
import CapsuleToggle from './CapsuleShareToggle';
import DeleteCapsuleModal from './modals/DeleteCapsuleModal';

type Props = {
  capsule: Capsule;
  remainingTime: number;
};

const CapsuleCardView = ({ capsule, remainingTime }: Props) => {
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            component="div"
            fontWeight="bold"
            color="#f5f5dc"
          >
            {capsule.title || 'no title'}
          </Typography>
          <CapsuleToggle
            capsuleId={capsule.id}
            initialShareable={capsule.shareAble}
          />
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

        <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DeleteCapsuleModal capsuleId={capsule.id} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CapsuleCardView;
