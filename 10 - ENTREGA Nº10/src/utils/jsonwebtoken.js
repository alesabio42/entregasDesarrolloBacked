const jwt = require('jsonwebtoken');

const private_key = 'palabrasecretaparatoken';

const generateToken = (user) => jwt.sign(user, private_key, { expiresIn: '24h' });

const authTokenMiddleware = (req, res, next) => {
    const token = req.cookies['jwt'];

    if (!token) return res.status(401).send({ status: 'error', message: 'no token' });

    jwt.verify(token, private_key, (error, decodeUser) => {
        if (error) return res.status(401).send({ status: 'error', message: 'no authorized' });

        req.user = decodeUser;
        next();
    });
};

module.exports = {
    generateToken,
    authTokenMiddleware,
};
