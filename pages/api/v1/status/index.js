import database from "infra/database";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const psVersion = await database.query("SHOW server_version ;");

  const maxConnectionConfig = await database.query("SHOW max_connections;");

  const dbCurrentCons = await database.query(
    "SELECT COUNT(*) FROM pg_stat_activity;",
  );

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: psVersion.rows[0].server_version,
        use_connections: parseInt(dbCurrentCons.rows[0].count),
        max_connections: parseInt(maxConnectionConfig.rows[0].max_connections),
      },
    },
  });
}

export default status;
