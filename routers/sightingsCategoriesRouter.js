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
    // router.put("/:sightingId", this.controller.editOne.bind(this.controller));
    // router.post(
    //   "/:sightingId/comments",
    //   this.controller.postComment.bind(this.controller)
    // );
    // router.put(
    //   "/:sightingId/comments/:id",
    //   this.controller.editComment.bind(this.controller)
    // );
    // router.delete(
    //   "/:sightingId/comments/:id",
    //   this.controller.deleteComment.bind(this.controller)
    // );
    return router;
  }
}

module.exports = SightingsCategoriesRouter;
