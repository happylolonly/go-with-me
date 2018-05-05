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

const keys2 = {
    googleClientID: '915003259282-lhdnstf8g2kkka5k77krj5c3kh8phq3p.apps.googleusercontent.com',
    googleClientSecret: 'LDHuoRKTGd2VVG0tLv-0dlSs'
}

passport.use(
    new GoogleStrategy(
        {
            clientID: keys2.googleClientID,
            clientSecret: keys2.googleClientSecret,
            callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            const { name: { givenName: firstName, familyName: lastName }, photos, emails, gender, id } = profile;

            const avatar = photos && photos[0] && photos[0].value;

            prossesUser({
                id,
                firstName,
                lastName,
                gender,
                avatar,
                src: emails[0].value,
            }, 'google', done)
        }
    )
);

const VKONTAKTE_APP_ID = 6456378;
const VKONTAKTE_APP_SECRET = 'rgvUpIuCMsIBX7IrElYr';

passport.use(new VKontakteStrategy(
    {
        clientID: VKONTAKTE_APP_ID, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
        clientSecret: VKONTAKTE_APP_SECRET,
        callbackURL: "/auth/vk/callback",
        proxy: true
    },
    async function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {

        const { name: { givenName: firstName, familyName: lastName }, photos, gender, profileUrl } = profile;
        console.log(profile);
        debugger;

        const id = profile.id + '';

        const avatar = photos && photos[0] && photos[0].value;

        prossesUser({
            id,
            firstName,
            lastName,
            gender,
            avatar,
            src: profileUrl,
        }, 'vk', done)
    }
));


async function prossesUser(userData, source, done) {
    const { id, firstName, lastName, avatar, gender, src } = userData;
    debugger;

    const existingUser = await User.findOne({ id: id });

    if (existingUser) {

        await User.findByIdAndUpdate(existingUser._id, {
            firstName,
            lastName,
            avatar
        });

        return done(null, existingUser);
    }

    const user = await new User({
        id: id,
        firstName,
        lastName,
        gender,
        avatar,
        login: {
            type: source,
            src,
            id,
        }
    }).save();

    done(null, user);
}
