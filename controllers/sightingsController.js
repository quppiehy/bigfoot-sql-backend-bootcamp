const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Post new sighting
  async postNew(req, res) {
    console.log(req.body);
    const newSighting = req.body;
    try {
      await this.model.create(newSighting);
      const output = await this.model.findAll({ order: [["id", "DESC"]] });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Edit specific sighting
  async editOne(req, res) {
    console.log(req.body);
    console.log(req.params.sightingId);
    const { date, locationdescription, city, country, notes } = req.body;
    console.log(date, locationdescription, notes);
    const { sightingId } = req.params;
    try {
      const currentSighting = await this.model.findByPk(sightingId);
      await currentSighting.update({
        date: date,
        locationdescription: locationdescription,
        city: city,
        country: country,
        notes: notes,
      });
      const output = await this.model.findByPk(sightingId);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
