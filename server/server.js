const express = require("express");
const knex = require("knex")(
  require("./database/knexfile.js")[process.env.NODE_ENV || "development"]
);
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    try {
      const data = await knex("movies")
        .select("*")
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: "We're sorry. All our representatives are currently helping other customers. Please call again later." });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });