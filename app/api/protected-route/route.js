import { authenticate } from '../../../middlewares/authenticate';

const handler = async (req, res) => {
  // Accède à l'utilisateur via `req.user` si le token est valide
  res.status(200).json({ message: `Bienvenue, utilisateur ${req.user.userId}` });
};

export default authenticate(handler);
