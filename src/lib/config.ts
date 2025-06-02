export const getRuntimeConfig = () => {
  const isServer = typeof window === 'undefined';

  return {
    baseUrl: isServer
      ? process.env.BASE_URL || 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  };
};
