const lastViewedService = require("../services/lastViewed.service");

exports.getLastViewed = async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await lastViewedService.getLastViewed(userId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addOrUpdateLastViewed = async (req, res) => {
  const { userId } = req.params;
  const { product_code } = req.body;
  try {
    const result = await lastViewedService.addOrUpdateLastViewed(
      userId,
      product_code
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.clearLastViewed = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await lastViewedService.clearLastViewed(userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeProductFromLastViewed = async (req, res) => {
  const { userId, productCode } = req.params;
  try {
    const result = await lastViewedService.removeProductFromLastViewed(
      userId,
      productCode
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.mergeLastViewed = async (req, res) => {
  const { userId } = req.params;
  const { products } = req.body;
  try {
    const result = await lastViewedService.mergeLastViewed(userId, products);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
