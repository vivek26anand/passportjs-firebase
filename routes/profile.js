const express = require('express');
const {firebaseAdmin} = require('../middlewares/firebaseadmin');
const Admin = new firebaseAdmin();

const router = express.Router();

router.get('/profile',async (req, res, next) => {
    Admin.getUser(req.user.uid).then(result => {
        res.json(result);
    }).catch(err => {
        res.json({
            error: err.message
        });
    })
})

module.exports = router;