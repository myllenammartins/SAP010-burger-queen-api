const express = require('express');
const router = express.Router();
const UsersController = require('../controller/users');
const { requireAuth, requireAdmin } = require('../middleware/auth');

module.exports = (app, nextMain) => {
    router.get('/users', requireAdmin, UsersController.getUsers);
    router.get('/users/:uid', requireAuth, UsersController.getUserById );
    router.post('/users', requireAdmin, UsersController.createUser);
    router.patch('/users/:uid', requireAuth, UsersController.updateUser); 
    router.delete('/users/:uid', requireAuth, UsersController.deleteUser);
    app.use(router);

return nextMain();
};

// const initAdminUser = (app, next) => {
//   const { adminEmail, adminPassword } = app.get('config');
//   if (!adminEmail || !adminPassword) {
//     return next();
//   }

//   const adminUser = {
//     email: adminEmail,
//     password: bcrypt.hashSync(adminPassword, 10),
//     role: 'admin',
//   };

//   // Create the admin user if not exists
//   User.findOrCreate({
//     where: { email: adminUser.email },
//     defaults: adminUser,
//   });

//   next();
// };