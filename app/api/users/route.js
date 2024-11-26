import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Gestion de la méthode GET
export async function GET(req) {
  try {
    // Récupère les utilisateurs
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des utilisateurs.' }), {
      status: 500,
    });
  }
}

// Gestion de la méthode POST
export async function POST(req) {
  try {
    const body = await req.json(); // Récupère les données de la requête
    const { name, email } = body;

    // Crée un nouvel utilisateur
    const user = await prisma.user.create({
      data: { name, email },
    });

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la création de l\'utilisateur.' }), {
      status: 500,
    });
  }
}
