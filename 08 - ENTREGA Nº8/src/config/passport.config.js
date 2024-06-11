const passport = require('passport');
const local = require('passport-local');
const UserManager = require('../dao/managers/MDB/userManager'); // Accedemos al user model a través del manager
const { createHash, isValidPassword } = require('../utils/hashBcrypt');

const sessionsService = new UserManager();

const LocalStrategy = local.Strategy;

const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email } = req.body;
        try {
            let userResponse = await sessionsService.getUsersBy({ email });
            let user = userResponse.status === 'success' ? userResponse.users[0] : null;

            if (user) return done(null, false);

            let newUser = {
                first_name,
                last_name,
                email,
                password: createHash(password)
            };

            let result = await sessionsService.createUser(newUser);
            // Done funciona como el next
            return done(null, result);
        } catch (error) {
            return done(error);
        }

    }));


    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            let userResponse = await sessionsService.getUsersBy({ email: username });
            let user = userResponse.status === 'success' ? userResponse.users[0] : null;

            if (!user) {
                console.log('Usuario no encontrado');
                return done(null, false);
            }

            if (!isValidPassword(password, user.password)) {
                console.log('Contraseña incorrecta');
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }))


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await sessionsService.getUserById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
}

module.exports = {
    initializePassport
}
