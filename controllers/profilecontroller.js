const router = require('express').Router();
const Profile = require('../db').import('../models/profile')
var validateSession = require('../middleware/validate-session')

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

router.post('/newprofile', validateSession, (req, res) => {
    if (!req.errors) {
        const profileFromRequest = {
         bio: req.body.bio,
         twHandle: req.body.twHandle,
         fbUrl: req.body.fbUrl
        }; 
        Profile.create(profileFromRequest)
            .then(profile => res.status(200).json(profile))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors)
    };
});

router.put('/update/:id', validateSession, (req, res) => {
    if (!req.errors) {
        Profile.update(req.body, { where: { id: req.params.id } })
            .then(profile => res.status(200).json(req.body))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors);
    };
});

router.delete('/delete/:id', validateSession, (req, res) => {
    if (!req.errors) {
        Profile.destroy({ where: { id: req.params.id } })
            .then(profile => res.status(200).json(req.body))
            .catch(err => res.json(req.errors));
    } else {
        res.status(500).json(req.errors);
    };
});

module.exports = router;