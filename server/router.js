const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  //Should this be get?
  app.get('/deleteAccount', mid.requiresLogin, controllers.Account.deleteAccount);

  app.post('/upload', mid.requiresLogin, controllers.Files.uploadFile);
  app.get('/upload', mid.requiresLogin, controllers.Files.uploadPage);

  app.get('/retrieve', mid.requiresLogin, controllers.Files.retrieveFile);

  app.get('/search', mid.requiresLogin, controllers.Files.searchFile);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
