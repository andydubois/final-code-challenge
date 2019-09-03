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

module.exports = router;