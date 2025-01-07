export const timeInMilliSeconds = (releaseDate: string): number => {
  const releaseTime = new Date(releaseDate);
  releaseTime.setSeconds(releaseTime.getSeconds() + 1);
  const now = new Date();
  return Math.max(
    Math.floor((releaseTime.getTime() - now.getTime()) / 1000),
    0
  );
};

export const formatRemainingTime = (seconds: number) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
};
