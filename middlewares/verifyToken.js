// middlewares/verifyToken.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('No token provided');

  jwt.verify(token.split(' ')[1], 'clave_secreta', (err, decoded) => {
    if (err) return res.status(500).send('Token inválido');
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
