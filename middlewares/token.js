import jwt from 'jsonwebtoken';

export const token = (req, res, next) => {
    const token = req.cookies["token"];
  
    if (!token) {
      return res.redirect('auth/signin');
    }
    try {
      const decodedToken = jwt.verify(token, "secretkey");
  
      req.user = decodedToken;
  
      next();
    } catch (err) {
      res.status(400).send(err.message);
    }
};
