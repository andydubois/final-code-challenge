const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    // YOUR CODE HERE
    const queryText = `SELECT "species".species_name, "class".class_name FROM "species"
JOIN "class" ON "species".class_id = "class".id;`;
pool.query(queryText)
.then((results) => {
    res.send(results.rows);
})
.catch((error) => {
    console.log('error in server side GET', error);
    res.sendStatus(500);
})
});

router.post("/add", (req, res) => {
    let newSpecies = req.body.species;
    let newClass = parseInt(req.body.class);
    console.log('req.body is:', newSpecies, newClass);

    const queryText=`INSERT INTO "species" ("species_name", "class_id") VALUES ($1, $2);`;
    pool.query(queryText, [newSpecies, newClass])
    .then(() => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('error completing INSERT INTO query', error);
        res.sendStatus(500);
    });
});

module.exports = router;