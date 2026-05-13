const POSTGRES_URL = "POSTGRES_URL";

export function getPostgresUrl(
  env: Record<string, string | undefined> = process.env,
) {
  const postgresUrl = env[POSTGRES_URL];

  if (!postgresUrl) {
    throw new Error(
      `${POSTGRES_URL} is required. Set it to the pooled Neon connection string in Vercel and local development.`,
    );
  }

  return postgresUrl;
}
