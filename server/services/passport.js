const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
// const keys = require('../config/keys');

const VKontakteStrategy = require('passport-vkontakte').Strategy;

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});


// const keys = {
//     googleClientID: '915003259282-6t637vmtpi2jfg68g8m6obk80ut2uium.apps.googleusercontent.com',
//     googleClientSecret: 'Ys4HXmXMn8YgigpvjLR_rUAA'
// }

// const keys2 = {
//     googleClientID: '915003259282-lhdnstf8g2kkka5k77krj5c3kh8phq3p.apps.googleusercontent.com',
//     googleClientSecret: 'LDHuoRKTGd2VVG0tLv-0dlSs'
// }

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: keys2.googleClientID,
//       clientSecret: keys2.googleClientSecret,
//       callbackURL: 'http://localhost:3090/auth/google/callback',
//     },
//     async (accessToken, refreshToken, profile, done) => {



//     }
//   )
// );

const VKONTAKTE_APP_ID = 6456378;
const VKONTAKTE_APP_SECRET = 'rgvUpIuCMsIBX7IrElYr';

passport.use(new VKontakteStrategy(
    {
      clientID:     VKONTAKTE_APP_ID, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
      clientSecret: VKONTAKTE_APP_SECRET,
      callbackURL:  "/auth/google/callback",
      proxy: true
    },
    async function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {
  
      // Now that we have user's `profile` as seen by VK, we can
      // use it to find corresponding database records on our side.
      // Also we have user's `params` that contains email address (if set in 
      // scope), token lifetime, etc.
      // Here, we have a hypothetical `User` class which does what it says.


              console.log(profile.id);

              const id = profile.id + '';
        // debugger;
      const existingUser = await User.findOne({ id: id });

      if (existingUser) {
        //   debugger;
        return done(null, existingUser);
      }

      const user = await new User({ id: id,  name: profile.displayName, login: {
          type: 'vk',
          src: profile.profileUrl,
          id: profile.id
      }}).save();
      done(null, user);


    //   User.findOrCreate({ vkontakteId: profile.id })
    //       .then(function (user) { done(null, user); })
    //       .catch(done);
    }
  ));
