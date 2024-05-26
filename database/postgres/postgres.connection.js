import { Sequelize } from "sequelize";
export const sequelize = new Sequelize(process.env.DB_CONN_URI, {
  dialect: process.env.DB_DIALECT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
      ca: process.env.DB_CONN_CERT,
      cert: process.env.DB_CONN_CERT,
    },
  },
});
