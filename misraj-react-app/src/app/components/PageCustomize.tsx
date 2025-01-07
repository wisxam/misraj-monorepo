const PageCustomize = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden sm:block z-1">
      <div className="absolute top-36 right-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-40 animate-pulse">
        <div className="absolute top-0 left-0 w-12 h-12 bg-indigo-300 rounded-full animate-bounce" />
        <div className="absolute bottom-0 right-0 w-12 h-12 bg-purple-300 rounded-full animate-spin" />
        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-pink-300 rounded-full animate-ping" />
      </div>
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-400 rotate-45 transform origin-center from-indigo-500 via-purple-500 to-pink-500 opacity-20 animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-blue-500 rounded-full from-indigo-500 via-purple-500 to-pink-500 opacity-20 animate-pulse" />
      <div className="absolute top-1/2 left-12 w-48 h-48 bg-yellow-300 rounded-lg from-indigo-500 via-purple-500 to-pink-500 opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-red-600 rotate-45 transform origin-center from-indigo-500 via-purple-500 to-pink-500 opacity-20 animate-pulse" />
    </div>
  );
};

export default PageCustomize;
