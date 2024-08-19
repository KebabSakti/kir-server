import dayjs from "dayjs";

export function randomNumber(): number {
  // Get current timestamp in milliseconds as a seed
  const seed = dayjs().valueOf();

  // Use the seed to generate a random number
  const random = Math.floor((seed * Math.random()) % 90000000) + 10000000;

  return random;
}
