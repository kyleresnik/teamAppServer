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
         bio: req.body.profile.bio,
         twHandle: req.body.profile.twHandle,
         fbUrl: req.body.profile.fbUrl,
         ownerId: req.body.profile.userId
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