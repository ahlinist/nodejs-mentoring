const dbUrl = 'postgres://postgres:root@127.0.0.1:5432/mentoring';

module.exports = {
  development: {
    url: dbUrl,
    dialect: 'postgres',
  },
}
