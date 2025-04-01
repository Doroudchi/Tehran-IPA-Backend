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
    await lastViewedService.clearLastViewed(userId);
    res.json({ message: "Last viewed list cleared." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeProductFromLastViewed = async (req, res) => {
  const { userId, productCode } = req.params;
  try {
    await lastViewedService.removeProductFromLastViewed(userId, productCode);
    res.json({ message: "Product removed from last viewed list." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.mergeLastViewed = async (req, res) => {
  const { userId } = req.params;
  const { products } = req.body;
  try {
    await lastViewedService.mergeLastViewed(userId, products);
    res.json({ message: "Last viewed list merged successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
