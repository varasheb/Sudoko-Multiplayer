import Sequelize from 'sequelize';

export { DataTypes } from 'sequelize';

let DATABASE = 'SudokuDB';
let USERNAME = 'postgres';
let PASSWORD = 'qwerty';
let HOST = 'localhost';
let PORT = 5432;
let DIALECT = 'postgres';



const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((error) => {
    console.log('Could not connect to the database.', error);
  });

sequelize.sync();

export default sequelize;