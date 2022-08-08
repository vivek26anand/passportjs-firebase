const CustomStrategy = require('passport-custom').Strategy;
const passport = require('passport');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {firebaseAdmin} = require('./firebaseadmin');

const Admin = new firebaseAdmin();

passport.use(new CustomStrategy(
   async function(req,done) {
      const {user,err} = await Admin.verifyIdToken(req.body.idToken)
      done(err, user);
    }
  ));

passport.use(new Strategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );