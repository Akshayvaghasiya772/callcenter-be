var jwt = require('jsonwebtoken');
const Admin = require('../models/admin')
const Staff = require('../models/staff')

const verifytoken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['auth-token'];

  if (!token) {
    return res.status(500).json({ success: false, Message: 'A token required for authentication' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const id = req.user._id
    const checkuser = await Staff.findById(id)
    if (checkuser) {
      return next();
    } else {
      return res.status(500).json({ success: false, Message: 'Invalid token' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, Message: 'Invalid token' });
  }
};

//admin middleware
const isAdmin = async (req, res, next) => {
  const checkadmin = await Admin.findOne({ user: req.user._id })
  if (!checkadmin) {
    return res.status(401).json({ success: "false", message: "Required admin role" })
  }
  next();
}



module.exports = { verifytoken: verifytoken, isAdmin: isAdmin };
