import jwt from 'jsonwebtoken';

export const authenticate = (handler) => async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token manquant ou invalide.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajoute l'utilisateur à l'objet req
    return handler(req, res);
  } catch {
    return res.status(401).json({ error: 'Token invalide.' });
  }
};
