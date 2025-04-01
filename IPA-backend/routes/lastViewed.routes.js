const express = require("express");
const router = express.Router();
const { validateApiKey } = require("../middlewares/middleware");
const lastViewedController = require("../controllers/lastViewed.controller");

router.use(validateApiKey);

router.get("/users/:userId/lastviewed/", lastViewedController.getLastViewed);
router.put(
  "/users/:userId/lastviewed/",
  lastViewedController.addOrUpdateLastViewed
);
router.delete(
  "/users/:userId/lastviewed/",
  lastViewedController.clearLastViewed
);
router.delete(
  "/users/:userId/lastviewed/:productCode",
  lastViewedController.removeProductFromLastViewed
);
router.put(
  "/users/:userId/lastviewed/merge",
  lastViewedController.mergeLastViewed
);

module.exports = router;
