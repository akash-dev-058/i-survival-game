import { Pool, QueryResult, PoolClient } from 'pg';
import config from './config';
import logger from './middleware/logger';

/**
 * PostgreSQL connection pool.
 *
 * The connection string is read from the application configuration. All
 * connections are automatically released back to the pool after a query.
 *
 * The pool is created lazily; if the required `databaseUrl` configuration is
 * missing, the module will throw an error during import so the application fails
 * fast and clearly.
 */
const databaseUrl: string | undefined = config?.databaseUrl;
if (!databaseUrl) {
  // Fail fast – without a database URL the application cannot operate.
  const errMsg = 'Database URL is not defined in configuration (config.databaseUrl)';
  logger.error(errMsg);
  throw new Error(errMsg);
}

const pool = new Pool({
  connectionString: databaseUrl,
  // Optional: fine‑tune pool size for production environments
  max: 20,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 2_000,
});

// Log unexpected errors on idle clients – helps surface connection leaks.
pool.on('error', (err: Error) => {
  logger.error('Unexpected error on idle PostgreSQL client', { error: err });
});

/**
 * Executes a parameterised query against PostgreSQL.
 *
 * The function obtains a client from the pool, runs the query, logs any error
 * with full context, releases the client back to the pool, and finally returns
 * the result.
 *
 * @template T – The expected row type of the result set.
 * @param text   – The SQL query string, using $1, $2 … placeholders.
 * @param params – Optional array of parameters. Defaults to an empty array.
 * @returns      – A {@link QueryResult} containing rows of type {@link T}.
 * @throws       – Propagates any error thrown by the pg client after logging it.
 */
export async function query<T = any>(
  text: string,
  params: readonly any[] = []
): Promise<QueryResult<T>> {
  let client: PoolClient | undefined;
  try {
    client = await pool.connect();
    const result = await client.query<T>(text, params as any[]);
    return result;
  } catch (error) {
    // Log the failed query with its parameters for easier debugging.
    logger.error('Database query failed', { query: text, params, error });
    throw error;
  } finally {
    // Ensure the client is always released back to the pool.
    if (client) {
      try {
        client.release();
      } catch (releaseError) {
        logger.error('Failed to release PostgreSQL client', { error: releaseError });
      }
    }
  }
}

/**
 * Simple health‑check used by the HTTP `/health` endpoint.
 *
 * Executes a trivial `SELECT 1` query. If the query succeeds the database is
 * considered reachable; otherwise the function returns `false` and logs the
 * underlying error.
 *
 * @returns `true` when the database responds, otherwise `false`.
 */
export async function isDatabaseAlive(): Promise<boolean> {
  try {
    await query('SELECT 1');
    return true;
  } catch (err) {
    logger.error('Database health check failed', { error: err });
    return false;
  }
}

/**
 * Gracefully shuts down the connection pool. This should be called during
 * application termination (e.g., in a SIGTERM handler) to allow pending queries
 * to finish and to free resources.
 */
export async function closePool(): Promise<void> {
  try {
    await pool.end();
    logger.info('PostgreSQL connection pool closed');
  } catch (err) {
    logger.error('Error while closing PostgreSQL pool', { error: err });
    // Swallow the error to avoid crashing the shutdown sequence.
  }
}

export default pool;
