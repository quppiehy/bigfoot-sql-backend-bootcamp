const BaseController = require("./baseController");
const { Op } = require("sequelize");

class SightingsController extends BaseController {
  constructor(sighting, comment, category, sighting_categories) {
    super();
    this.Sighting = sighting;
    this.Comment = comment;
    this.Category = category;
    this.sighting_categories = sighting_categories;
  }

  async getAll(req, res) {
    try {
      const output = await this.Sighting.findAll({
        include: [{ model: this.Category }],
        order: [["id", "ASC"]],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.Sighting.findByPk(sightingId, {
        include: [{ model: this.Category }],
      });
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
        order: [["id", "DESC"]],
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

  // Edit comment
  async editComment(req, res) {
    const id = parseInt(req.params.id, 10);
    const sightingId = parseInt(req.params.sightingId, 10);
    const { content } = req.body;
    console.log(content);
    try {
      const currentComment = await this.Comment.findByPk(id);
      await currentComment.update({
        content: content,
      });
      const output = await this.Comment.findAll({
        where: { sightingId: sightingId },
        order: [["id", "DESC"]],
      });
      return res.json(output);
    } catch (err) {
      console.log("Error: ", err.message);
      return res.status(400).json("Failed to edit comment.");
    }
  }

  // Delete comment
  async deleteComment(req, res) {
    const id = parseInt(req.params.id, 10);
    const sightingId = parseInt(req.params.sightingId, 10);
    try {
      await this.Comment.destroy({
        where: { [Op.and]: [{ sightingId: sightingId }, { id: id }] },
      });
      const output = await this.Comment.findAll({
        where: { sightingId: sightingId },
        order: [["id", "DESC"]],
      });
      return res.json(output);
    } catch (err) {
      console.log("Error: ", err.message);
      return res.status(400).json("Failed to delete comment.");
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
