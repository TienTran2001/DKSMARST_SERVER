const db = require('../models');
const { throwErrorWithStatus } = require('./errorHandler');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.headers?.authorization?.startsWith('Bearer ');

  if (!token) return throwErrorWithStatus(401, 'Không có token.', res, next);

  const rawToken = req.headers?.authorization?.split(' ')[1];
  jwt.verify(rawToken, process.env.JWT_SECRET, (err, decode) => {
    if (err) return throwErrorWithStatus(401, 'Lỗi xác thực.', res, next);
    req.user = decode;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  const { roleId } = req.user;

  const role = await db.Role.findByPk(roleId);

  if (role?.roleName !== 'admin') {
    return throwErrorWithStatus(401, 'Bạn không có quyền truy cập', res, next);
  }
  next();
};

const isCenter = async (req, res, next) => {
  const { roleId } = req.user;

  const role = await db.Role.findByPk(roleId);

  if (role?.roleName !== 'center') {
    return throwErrorWithStatus(401, 'Bạn không có quyền truy cập', res, next);
  }
  next();
};
const isStaffOfCenter = async (req, res, next) => {
  const { roleId } = req.user;

  const role = await db.Role.findByPk(roleId);

  if (role?.roleName !== 'center' && role?.roleName !== 'staff') {
    return throwErrorWithStatus(401, 'Bạn không có quyền truy cập', res, next);
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin,
  isCenter,
  isStaffOfCenter,
};
