import { readdirSync } from 'fs'
import { basename, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Sequelize } from 'sequelize'
import pg from 'pg'

const sequelize = new Sequelize({
    username: process.env['DB_USERNAME'] || 'postgres',
    password: process.env['DB_PASSWORD'] || null,
    database: process.env['DB_DATABASE'] || 'yellow_taxi_trip_data',
    host: process.env['DB_HOST'] || 'localhost',
    dialect: 'postgres',
    dialectModule: pg
})

const currentPath = fileURLToPath(import.meta.url)
const db: any = {}

readdirSync(dirname(currentPath))
.filter(file => {
    return (
        file.indexOf('.') !== 0 &&
        file !== basename(currentPath)
    )
})
.forEach(file => {
    const model = require(`./${file}`).model(sequelize)
    db[model.name] = model
})

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

export default db
