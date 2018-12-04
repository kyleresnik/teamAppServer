const router = require('express').Router();
const Profile = require('../db').import('../models/profile')

router.get('/getall', (req, res) => {
    Profile.findAll()
        .then(profile => res.status(200).json(profile))
        .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
    Profile.findOne({ where: { id: req.params.id } })
        .then(profile => res.status(200).json(profile))
        .catch(err => res.status(500).json(err));
});

router.post('/newprofile', (req, res) => {
    if (!req.errors) {
        const profileFromRequest = {
         owner_id: req.body.profile.owner_id,
         owner_username: req.body.profile.owner_username,
         owner_firstName: req.body.profile.owner_firstName,
         owner_lastName: req.body.profile.owner_lastName,
         bio: req.body.profile.bio
        }; 
        Profile.create(profileFromRequest)
            .then(profile => res.status(200).json(profile))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors)
    };
});

router.put('/update/:id', (req, res) => {
    if (!req.errors) {
        Profile.update(req.body.profile, { where: { id: req.params.id } })
            .then(profile => res.status(200).json(req.body.profile))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors);
    };
});

router.delete('/delete/:id', (req, res) => {
    if (!req.errors) {
        Profile.destroy({ where: { id: req.params.id } })
            .then(profile => res.status(200).json(req.body.profile))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors);
    };
});

module.exports = router;