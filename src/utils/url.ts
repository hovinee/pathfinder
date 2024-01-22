export const getBaseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://pathfinder-bice-eta.vercel.app'
// : `${process.env.NEXT_PUBLIC_VERCEL_URL}`

export const cfWorkerUrl = 'https://futureverse-worker.team3.workers.dev'
