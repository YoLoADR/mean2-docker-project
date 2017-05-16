const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//MongoDB URL du fichier docker-compose
//Cette base de données est identique au service de base de données que nous avons créé dans le fichier docker-compose.
const dbHost = 'mongodb://database/mean-docker';

// Se connecter à MongoDB
mongoose.connect(dbHost);

// créer un schéma Mongo
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// créer un model Mongo
const User = mongoose.model('User', userSchema);

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works for angular-client');
});

/* GET all users. */
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.status(500).send(error)

        res.status(200).json(users);
    });
});

/* GET one users. */
router.get('/users/:id', (req, res) => {
    User.findById(req.param.id, (err, users) => {
        if (err) res.status(500).send(error)

        res.status(200).json(users);
    });
});

/* Create a user. */
router.post('/users', (req, res) => {
    let user = new User({
        name: req.body.name,
        age: req.body.age
    });

    user.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'User created successfully'
        });
    });
});

module.exports = router;