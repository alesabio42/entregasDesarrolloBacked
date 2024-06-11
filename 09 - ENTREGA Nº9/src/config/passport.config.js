// src\config\passport.config.js


const passport = require('passport');
const local = require('passport-local');
const UserManager = require('../dao/managers/MDB/userManager'); // Accedemos al user model a través del manager
const { createHash, isValidPassword } = require('../utils/hashBcrypt');
const GithubStrategy = require('passport-github2')

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
    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.2a8ed0b0c9586810',
        clientSecret: '452e8160a12ca8d50ced1321a8379c8538cd48b5',
        callbackURL: 'http://localhost:8080/session/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('profile:', profile);
        try {
            let userResponse = await sessionsService.getUsersBy({ email: profile._json.email });
            console.log('Correo electrónico del perfil de GitHub:', profile._json.email);
            console.log('Respuesta del servicio getUsersBy:', userResponse);
    
            if (userResponse.status === 'success' && userResponse.users.length > 0) {
                // Usuario encontrado, utiliza el primer usuario del array
                let user = userResponse.users[0];
    
                console.log('Usuario existente:', user);
                return done(null, user);
            } else {
                // Si no hay usuarios, crea uno nuevo
                let newUser = {
                    first_name: profile._json.name,
                    last_name: profile._json.name,
                    email: profile._json.email,
                    password: 'hola'
                };
    
                let result = await sessionsService.createUser(newUser);
                console.log('Nuevo usuario creado:', result);
                return done(null, result);
            }
        } catch (error) {
            console.error('Error en la estrategia de GitHub:', error);
            return done(error);
        }
    }));
    

    passport.serializeUser((user, done) => {
        // Verifica que el usuario tenga un campo `_id`
        console.log('Serializing user:', user);
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await sessionsService.getUserById(id);
            console.log('Usuario deserializado:', user);  // Agrega esta línea
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

    

}

module.exports = {
    initializePassport
}
