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
        let { title } = req.query;
        let { addedByUser } = req.query;

        if (title !== undefined) {
            let query = knex("movies").select("*");
            title === "*" ? query = knex("movies").select("*") : query.where('title', 'like', `%${title}%`);
            const data = await query;

            data === null ? res.send("Nope") : res.status(200).json(data);

        } else if (addedByUser === "all") {
            const data = await knex("movies")
                .select("*")
            res.status(200).json(data);

        } else if (addedByUser !== undefined) {
            const data = await knex("movies").where("addedByUser", addedByUser)
            res.status(200).json(data);
            
        } else {
            const data = await knex("movies")
                .select("*")
            res.status(200).json(data);
        }
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "We're sorry. All our representatives are currently helping other customers. Please call again later." });
    }
});

app.post("/", async (req, res) => {
    try {
        await knex("movies").insert({
            title: req.body.title,
            addedByUser: true,
            watched: false
        });
        const data = await knex("movies").select("*")
        res.status(201).json(data);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "We're sorry. All our representatives are currently helping other customers. Please call again later." });
    }
});

app.delete("/", async (req, res) => {
    try {
        let { title } = req.query;

        if (title !== undefined) {
            await knex("movies").where("title", title).del();
            const data = await knex("movies").select("*")
            res.status(200).json(data);
        } else {
            const data = await knex("movies").select("*")
            res.status(200).json(data);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Bad request" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});