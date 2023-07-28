const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(Sighting, Comment) {
    super();
    this.Sighting = Sighting;
    this.Comment = Comment;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.Sighting.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve specific sighting
  async getComments(req, res) {
    console.log("I am in!");
    const sightingId = parseInt(req.params.sightingId, 10);
    try {
      const comments = await this.Comment.findAll({
        where: { sightingId: sightingId },
        order: [["id", "ASC"]],
      });
      return res.json(comments);
    } catch (err) {
      console.log(err);
      console.log(err.message);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Post new comment
  async postComment(req, res) {
    console.log(req.params.sightingId);
    console.log(req.body);
    const sightingId = parseInt(req.params.sightingId, 10);
    console.log("I'm in!");
    const newComment = { ...req.body, sighting_id: sightingId };
    console.log(newComment);
    try {
      await this.Comment.create(newComment);
      const output = await this.Comment.findAll({
        order: [["id", "DESC"]],
      });
      return res.json(output);
    } catch (err) {
      console.log(err);
      console.log(err.message);
      return res.status(400).json({ err });
    }
  }

  // Post new sighting
  async postNew(req, res) {
    console.log(req.body);
    const newSighting = req.body;
    try {
      await this.Sighting.create(newSighting);
      const output = await this.Sighting.findAll({
        order: [["id", "DESC"]],
      });
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
      const currentSighting = await this.Sighting.findByPk(sightingId);
      await currentSighting.update({
        date: date,
        locationdescription: locationdescription,
        city: city,
        country: country,
        notes: notes,
      });
      const output = await this.Sighting.findByPk(sightingId);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
