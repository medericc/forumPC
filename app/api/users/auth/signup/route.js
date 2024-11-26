import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de l\'inscription.' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée.' });
  }
}
