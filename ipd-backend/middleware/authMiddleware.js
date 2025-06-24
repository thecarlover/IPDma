// middleware/authMiddleware.js
import { requireAuth, getAuth } from '@clerk/express';

const requireRole = (...allowedRoles) => (req, res, next) => {
  requireAuth()(req, res, () => {
    const { sessionClaims } = getAuth(req);
    console.log("✅ sessionClaims:", sessionClaims);
    const role = sessionClaims?.publicMetadata?.role;

    console.log("🔐 Role from Clerk metadata:", role); // <-- DEBUG LOG

    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  });
};

export { requireRole };
