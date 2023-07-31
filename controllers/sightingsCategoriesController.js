const BaseController = require("./baseController");

class SightingsCategoriesController extends BaseController {
  constructor(model, sighting_categories) {
    super(model);
    this.sighting_categories = sighting_categories;
  }

  // Retrieve all sightings_categories
  async getSightingsCategories(req, res) {
    try {
      const categories = await this.sighting_categories.findAll();
      return res.json(categories);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // retrieve sightings_categpries for 1 sighting
  async getOneSightingsCategories(req, res) {
    console.log(req.body);
    const sightingId = parseInt(req.params.sightingId, 10);
    console.log(sightingId);
    try {
      const currSightingCategories = await this.sighting_categories.findAll({
        where: { sightingId: sightingId },
        order: [["id", "ASC"]],
      });
      return res.json(currSightingCategories);
    } catch (err) {
      console.log("Error retrieving record. ");
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Add new Sighting Categories for 1 sighting
  async addSightingsCategories(req, res) {
    console.log(req.body);
    const { sightingId, categoryId } = req.body;
    console.log(sightingId, categoryId);
    try {
      const newSightingsCategories = {
        sightingId: sightingId,
        categoryId: categoryId,
      };

      const response = await this.sighting_categories.create(
        newSightingsCategories
      );
      return res.json(response);
    } catch (err) {
      console.log("Error creating record. ");
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Bulk insert rows into sightings_categories for 1 sighting
  async addMultipleSightingsCategories(req, res) {
    try {
      console.log(req.body.sightingsCategories);
      const newRow = req.body.sightingsCategories;
      const categories = await this.sighting_categories.bulkCreate(newRow);
      return res.json(categories);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Edit sightings_categories for 1 sighting
  async updateSightingsCategories(req, res) {
    console.log(req.body);
    const data = req.body;
    console.log(data.sightingsCategories[0].id);
    const currId = data.sightingsCategories[0].id;
    const catId = data.sightingsCategories[0].categoryId;
    console.log(currId, catId);
    try {
      const currentSightingCategory = await this.sighting_categories.findByPk(
        currId
      );
      await currentSightingCategory.update({
        categoryId: catId,
      });
      const output = await this.sighting_categories.findByPk(currId);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Edit multiple sightings_categories for 1 sighting
  async updateMultipleSightingsCategories(req, res) {
    console.log(req.body);
    const data = req.body.sightingsCategories;
    console.log(data);
    const toBeUpdated = data.map((category) => ({
      id: category.id,
      categoryId: category.categoryId,
    }));
    console.log(toBeUpdated);

    try {
      const output = await this.sighting_categories.bulkCreate(toBeUpdated, {
        updateOnDuplicate: [`categoryId`],
      });

      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = SightingsCategoriesController;
