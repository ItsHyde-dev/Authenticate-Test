import { Sequelize } from 'sequelize'
export const sequelize = new Sequelize(process.env.DB_CONN_URI)

export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
