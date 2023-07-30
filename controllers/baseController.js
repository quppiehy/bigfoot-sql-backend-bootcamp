class BaseController {
  constructor(sighting) {
    this.Sighting = sighting;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  async getAll(req, res) {
    try {
      const output = await this.Sighting.findAll({
        order: [["id", "ASC"]],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = BaseController;
