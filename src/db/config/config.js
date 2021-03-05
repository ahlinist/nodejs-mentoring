const { DB_HOST, DB_USER, DB_PASS } = process.env;

const dbUrl = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:5432/mentoring`;

module.exports = {
  development: {
    url: dbUrl,
    dialect: 'postgres',
  },
}
