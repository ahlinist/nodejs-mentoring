const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
  const login = req.body.login; //not used by now
  const password = req.body.password; //not used by now
  try {
    var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    res.send(token);
    next();
  } catch(e) {
    next(e);
  }
};

module.exports = { login };
