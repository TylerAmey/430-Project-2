const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => res.render('login');

const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/upload' });
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/upload' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use!' });
    }
    return res.status(500).json({ error: 'An error occured!' });
  }
};

const deleteAccount = async (req, res) => {
  await Account.deleteOne( {username: req.session.account.username});
  req.session.destroy();
  return res.redirect('/');
};

const resetPass = async (req, res) => {
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;
  const pass3 = `${req.body.pass3}`;

  if (!pass || !pass2 || !pass3) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass2 !== pass3) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  //get current info
  const query = { user: req.session.account._id };
  const docs = await Account.find(query).select('username password').lean().exec();

  if(pass != docs.password){
    return res.status(401).json({ error: 'Incorrect password' });
  }

  if(pass != pass2){
    return res.status(401).json({ error: 'Use a new password!' });
  }

  try {
    const hash = await Account.generateHash(pass2);
    await Account.findByIdAndUpdate(query, {password: hash});
    return res.json({ redirect: '/upload' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(40).json({ error: 'Username already in use!' });
    }
    return res.status(500).json({ error: 'An error occured!' });
  }
};

module.exports = {
  loginPage,
  login,
  logout,
  signup,
  deleteAccount,
  resetPass,
};
