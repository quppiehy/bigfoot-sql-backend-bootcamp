const express = require("express");
const router = express.Router();

class SightingsCategoriesRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get(
      "/",
      this.controller.getSightingsCategories.bind(this.controller)
    );
    // router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    router.get(
      "/:sightingId",
      this.controller.getOneSightingsCategories.bind(this.controller)
    );

    router.post(
      "/",
      this.controller.addSightingsCategories.bind(this.controller)
    );

    router.post(
      "/bulk",
      this.controller.addMultipleSightingsCategories.bind(this.controller)
    );
    return router;
  }
}

module.exports = SightingsCategoriesRouter;
