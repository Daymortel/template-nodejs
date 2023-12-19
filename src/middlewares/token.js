const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies["token"];
  
    if (!token) {
      return res.redirect('/login');
    }
    try {
      const decodedToken = jwt.verify(token, "secretkey");
  
      req.user = decodedToken;
  
      next();
    } catch (err) {
      res.status(400).send(err.message);
    }
};