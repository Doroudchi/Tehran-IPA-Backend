const { Customer, Product, LastViewed } = require("../models");
const axios = require("axios");

exports.getLastViewed = async (customer_id) => {
  await Customer.findOrCreate({ where: { customer_id } });

  const lastViewed = await LastViewed.findAll({
    where: { customer_id },
    order: [["timestamp", "DESC"]],
  });

  const productCodes = lastViewed.map((entry) => entry.product_code);

  if (productCodes.length === 0) return [];

  const url = `https://acceptance.interdiscount.ch/idocc/occ/id/products?fieldSet=DEFAULT&ids=${productCodes.join(
    ","
  )}`;

  const response = await axios.get(url);

  const productMap = response.data.reduce((acc, product) => {
    acc[product.code] = product;
    return acc;
  }, {});

  const orderedProducts = productCodes
    .map((code) => productMap[code])
    .filter((p) => p);

  return orderedProducts;
};

exports.addOrUpdateLastViewed = async (customer_id, product_code) => {
  await Customer.findOrCreate({ where: { customer_id } });
  await Product.findOrCreate({ where: { product_code } });

  const [entry, created] = await LastViewed.findOrCreate({
    where: { customer_id, product_code },
    defaults: { timestamp: new Date() },
  });

  if (!created) {
    await LastViewed.update(
      { timestamp: new Date() },
      { where: { customer_id, product_code } }
    );
  }

  return { message: created ? "Added to last viewed." : "Timestamp updated." };
};

exports.clearLastViewed = async (customer_id) => {
  await LastViewed.destroy({
    where: { customer_id },
  });
};

exports.removeProductFromLastViewed = async (customer_id, product_code) => {
  await LastViewed.destroy({
    where: { customer_id, product_code },
  });
};

exports.mergeLastViewed = async (customer_id, products) => {
  await Customer.findOrCreate({ where: { customer_id } });

  for (const product_code of products) {
    await Product.findOrCreate({ where: { product_code } });

    const existing = await LastViewed.findOne({
      where: { customer_id, product_code },
    });

    if (existing) {
      await existing.update({ timestamp: new Date() });
    } else {
      await LastViewed.create({
        customer_id,
        product_code,
        timestamp: new Date(),
      });
    }
  }
};
