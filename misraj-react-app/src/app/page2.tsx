import { useEffect, useState } from 'react';

const Page2 = () => {
  const [capsules, setCapsules] = useState<
    { id: string; releaseDate: string; remainingTime: string }[] | null
  >(null);

  const formatRemainingTime = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let result = '';
    if (days > 0) result += `${days} days, `;
    if (hours > 0) result += `${hours} hours, `;
    if (minutes > 0) result += `${minutes} minutes, `;
    result += `${remainingSeconds} seconds`;

    return result;
  };

  const computeRemainingTime = (releaseDate: string) => {
    const now = new Date();
    const release = new Date(releaseDate);
    const timeDiff = release.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return 'Expired';
    }

    const timeDiffInSeconds = Math.floor(timeDiff / 1000);
    return formatRemainingTime(timeDiffInSeconds);
  };

  useEffect(() => {
    // Fetching the API data
    const fetchCapsules = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/capsule/allCaps'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        // Precompute remaining time for each capsule
        const enrichedData = data.map(
          (cap: { id: string; releaseDate: string }) => ({
            ...cap,
            remainingTime: computeRemainingTime(cap.releaseDate),
          })
        );

        setCapsules(enrichedData);
      } catch (error) {
        console.error('Error fetching capsule data:', error);
      }
    };

    fetchCapsules();
  }, []);

  useEffect(() => {
    const updateRemainingTime = () => {
      if (!capsules) return;

      const now = new Date();
      const updatedCapsules = capsules.map((cap) => {
        const releaseDate = new Date(cap.releaseDate);
        const timeDiff = releaseDate.getTime() - now.getTime();

        if (timeDiff <= 0) {
          return { ...cap, remainingTime: 'Expired' };
        }

        const timeDiffInSeconds = Math.floor(timeDiff / 1000);
        const remainingTime = formatRemainingTime(timeDiffInSeconds);

        return { ...cap, remainingTime };
      });

      setCapsules(updatedCapsules);
    };

    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, [capsules]);

  return (
    <div>
      <div>
        <h2>Current Date and Time:</h2>
        <div>{new Date().toLocaleString()}</div>
      </div>

      {capsules ? (
        <div>
          <h2>Capsules:</h2>
          {capsules.map((cap) => (
            <div key={cap.id}>
              <div>
                Release Date: {new Date(cap.releaseDate).toLocaleString()}
              </div>
              <div>Remaining Time: {cap.remainingTime}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Page2;
