const sequelize = require("../config/database");

const Customer = require("./customer");
const Product = require("./product");
const LastViewed = require("./lastViewed");

Customer.hasMany(LastViewed, { foreignKey: "customer_id" });
Product.hasMany(LastViewed, { foreignKey: "product_code" });
LastViewed.belongsTo(Customer, { foreignKey: "customer_id" });
LastViewed.belongsTo(Product, { foreignKey: "product_code" });

module.exports = {
  sequelize,
  Customer,
  Product,
  LastViewed,
};
