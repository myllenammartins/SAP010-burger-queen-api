const jwt = require('jsonwebtoken');
const { secret } = require('../config'); // Supondo que você tenha um arquivo de configuração com a chave secreta

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return resp.status(403).send('Acesso proibido');
    }

    // Aqui você pode usar a informação do token para tomar decisões, como verificar o UID do usuário
    req.user = decodedToken; // Armazenando informações do usuário no objeto de solicitação
    next();
  });
};

module.exports.isAuthenticated = (req) => (
  !!req.user // Verifica se o objeto de solicitação tem informações do usuário
);

module.exports.isAdmin = (req) => (
  req.user && req.user.role === 'admin' // Verifica se o usuário tem a função de administrador
);

module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? resp.status(401).send('Autenticação necessária')
    : next()
);

module.exports.requireAdmin = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? resp.status(401).send('Autenticação necessária')
    : (!module.exports.isAdmin(req))
      ? resp.status(403).send('Acesso proibido')
      : next()
);
