import { useEffect, useState } from 'react';
import { useGetCapsules } from '../hooks/useCapsules';
import { Capsule } from '../types/capsule';
import CapsuleCard from './CapsuleCard';
import { useQueryClient } from '@tanstack/react-query';
import { Button, ButtonGroup } from '@mui/material';
import { timeInMilliSeconds } from '../utils/timeUtils';

const CapsuleComponent = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const limit = 4;

  const { data, isLoading, isError } = useGetCapsules(page, limit);

  const { capsules, totalCount } = data || {};

  const [remainingTimes, setRemainingTimes] = useState<Map<string, number>>(
    new Map()
  );

  const [refetchedCapsules, setRefetchedCapsules] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    if (capsules) {
      const initialTimes = new Map<string, number>(
        capsules.map((capsule) => [
          capsule.id,
          timeInMilliSeconds(capsule.releaseDate),
        ])
      );
      setRemainingTimes(initialTimes);
    }
  }, [capsules]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTimes((prevTimes) => {
        const updatedTimes = new Map(prevTimes);

        capsules?.forEach((capsule) => {
          const remainingTime = timeInMilliSeconds(capsule.releaseDate);
          updatedTimes.set(capsule.id, remainingTime);

          if (remainingTime <= 0 && !refetchedCapsules.has(capsule.id)) {
            setRefetchedCapsules((prev) => new Set(prev.add(capsule.id)));

            queryClient.invalidateQueries({
              queryKey: ['capsules', page, limit],
            });

            setTimeout(() => {
              queryClient.invalidateQueries({
                queryKey: ['capsules', page, limit],
              });
            }, 1000);
          }
        });

        return updatedTimes;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [capsules, queryClient, page, limit, refetchedCapsules]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const totalPages = totalCount ? Math.ceil(totalCount / limit) : 0;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <div>Error try again</div>;
  }

  if (!capsules?.length) {
    return <div>No capsules available</div>;
  }

  return (
    <div>
      <div>
        {capsules.map((capsule: Capsule) => (
          <CapsuleCard
            key={capsule.id}
            capsule={capsule}
            remainingTime={remainingTimes.get(capsule.id) ?? 0}
          />
        ))}
      </div>

      <ButtonGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default CapsuleComponent;
