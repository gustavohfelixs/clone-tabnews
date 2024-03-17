import database from "infra/database";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const psVersion = await database.query("SHOW server_version ;");

  const maxConnectionConfig = await database.query("SHOW max_connections;");

  const databaseName = process.env.POSTGRES_DB;

  const dbCurrentCons = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });
  // "SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'postgres';",
  const databaseOpenedConnectionsValue = dbCurrentCons.rows[0].count;

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: psVersion.rows[0].server_version,
        opened_connections: databaseOpenedConnectionsValue,
        max_connections: parseInt(maxConnectionConfig.rows[0].max_connections),
      },
    },
  });
}

export default status;
