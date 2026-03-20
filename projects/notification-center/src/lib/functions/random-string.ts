/**
 * Generates a string with random characters. E.g. '1zd9so9q3f6'.
 */
export function randomString(): string {
  return (
    Number(String(Math.random()).slice(2)) +
    Date.now() +
    Math.round(performance.now())
  ).toString(36);
}
