const app = require('./express/app')
const sequelize = require('./database')
const PORT = 8080

async function assertDatabaseConnection() {
  console.log(`Checking for database connection...`)
  try {
    await sequelize.authenticate();
    console.log(`Database connection OK!!`)
  } catch (error) {
    console.log('Unable to connect to the database:')
    console.log(error.message)
    process.exit(1)
  }
}

async function init() {
  await assertDatabaseConnection()

  console.log(`Starting Absence-Journal-Api on port ${PORT}...`)

  app.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}. Try some routes, such as '/api/users'.`)
  })
}

init()