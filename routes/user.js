const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/verify',async (req, res, next) => {
    passport.authenticate('custom',{ session: false },async(err,user)=>{
        if (err || !user) {
            return res.json(err);
        }
        req.login(
            user,
            { session: false },
            async (error) => {
            if (error) return next(error);
            const token = jwt.sign({ user: user }, process.env.JWT_SECRET);
            return res.json({ token });
            }
        );
    })(req, res, next)
})
module.exports = router;