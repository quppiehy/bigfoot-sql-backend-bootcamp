const cors = require("cors");
const express = require("express");
require("dotenv").config();

// importing Routers
const SightingsRouter = require("./routers/sightingsRouter");
const CategoriesRouter = require("./routers/categoriesRouter");
const SightingsCategoriesRouter = require("./routers/sightingsCategoriesRouter");

// importing Controllers
const SightingsController = require("./controllers/sightingsController");
const CategoriesController = require("./controllers/categoriesController");
const SightingsCategoriesController = require("./controllers/sightingsCategoriesController");

// importing DB
const db = require("./db/models/index");
const { sighting, comment, category, sighting_categories } = db;
console.log(sighting_categories);

console.log("Creating Sightings Controller instance ...");
// initializing Controllers -> note the lowercase for the first word
const sightingsController = new SightingsController(
  sighting,
  comment,
  category,
  sighting_categories
);

const categoriesController = new CategoriesController(sighting, category);
const sightingsCategoriesController = new SightingsCategoriesController(
  sighting,
  sighting_categories
);

// initializing Routers
const sightingRouter = new SightingsRouter(sightingsController).routes();
const categoryRouter = new CategoriesRouter(categoriesController).routes();
const sightingsCategoriesRouter = new SightingsCategoriesRouter(
  sightingsCategoriesController
).routes();

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());
app.use(express.json());

// using the routers
app.use("/sightings", sightingRouter);
app.use("/categories", categoryRouter);
app.use("/sighting_categories", sightingsCategoriesRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
