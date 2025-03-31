const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./customer");
const Product = require("./product");

const LastViewed = sequelize.define(
  "LastViewed",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Customer,
        key: "customer_id",
      },
    },
    product_code: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Product,
        key: "product_code",
      },
    },
  },
  {
    tableName: "last_viewed",
    timestamps: true,
    createdAt: "timestamp",
    updatedAt: false,
  }
);

Customer.hasMany(LastViewed, { foreignKey: "customer_id" });
Product.hasMany(LastViewed, { foreignKey: "product_code" });
LastViewed.belongsTo(Customer, { foreignKey: "customer_id" });
LastViewed.belongsTo(Product, { foreignKey: "product_code" });

module.exports = LastViewed;
