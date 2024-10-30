import { readdirSync } from 'fs'
import { basename, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Sequelize } from 'sequelize'
import pg from 'pg'

const sequelize = new Sequelize({
    username: process.env['DBUSERNAME'] || 'postgres',
    password: process.env['DBPASSWORD'] || '',
    database: process.env['DBDATABASE'] || 'yellow_taxi_trip_data',
    host: process.env['DBHOST'] || 'localhost',
    dialect: 'postgres',
    dialectModule: pg
})

const currentPath = fileURLToPath(import.meta.url)

let db: any = {}


db._dir = dirname(currentPath)
/*
readdirSync(dirname(currentPath))
.filter(
    (file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename(currentPath)
        )
    }
)
.forEach(
    (file) => {
        //const model = require(`./${file}`).model(sequelize)
        db['model.name'] = 'model'
    }
)
*/
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

export default db
