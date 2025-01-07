import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetCapsule } from '../hooks/useCapsules';
import CapsuleCard from '../components/CapsuleCard';
import { useQueryClient } from '@tanstack/react-query';
import { timeInMilliSeconds } from '../utils/timeUtils';
import useAuthGuard from '../hooks/useAuthGuard';

const ViewCapsule = () => {
  useAuthGuard();
  const { capsuleId } = useParams();
  const queryClient = useQueryClient();

  const { data: capsule, isLoading, error } = useGetCapsule(capsuleId || '');

  const [remainingTime, setRemainingTime] = useState<number>(0);

  const [hasRefetched, setHasRefetched] = useState<boolean>(false);

  useEffect(() => {
    if (capsule) {
      const initialRemainingTime = timeInMilliSeconds(capsule.releaseDate);
      setRemainingTime(initialRemainingTime);
    }
  }, [capsule]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (capsule) {
        const updatedRemainingTime = timeInMilliSeconds(capsule.releaseDate);
        setRemainingTime(updatedRemainingTime);

        if (updatedRemainingTime <= 0 && !hasRefetched) {
          setHasRefetched(true);

          queryClient.invalidateQueries({ queryKey: ['capsule', capsuleId] });

          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['capsule', capsuleId] });
          }, 1000);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [capsule, queryClient, capsuleId, hasRefetched]);

  if (!capsule?.shareAble) {
    return <div>This capsule iss not to be shared</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {capsule && (
        <CapsuleCard capsule={capsule} remainingTime={remainingTime} />
      )}
    </div>
  );
};

export default ViewCapsule;
