import jwt from 'jsonwebtoken';

export const requireAdmin = (req, res, next) => {
  try {
    const token = req.cookies?.portfolio_admin;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'admin') throw new Error('Invalid role');
    req.admin = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Admin authentication required.' });
  }
};
