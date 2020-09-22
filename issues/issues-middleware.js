const jwt = require("jsonwebtoken")

function restrict() {
  return async (req, res, next) => {
    // put error message in variable so it can be re-used
    const authError = {
      message: 'Invalid credentials',
    };

    try {
      const token = req.headers.authorization // assume token passed to API as "authorization" header
      const jwtSecret = process.env.JWT_SECRET || 'keep it secret, keep it safe'

      if (!token) {
        return res.status(401).json(authError);
      }

      // verify signature has not changed
      // callback gives (1) error & (2) decoded value of payload
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          return res.status(401).json(authError);
        }
        req.token = decoded // let other middleware use token payload
        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { restrict };