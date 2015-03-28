
//
// PostGre databse Configre route

module.exports = {
	db: process.env.DATABASE_URL || 'postgres://postgres:admin@localhost:5432/demo-postgres'
}