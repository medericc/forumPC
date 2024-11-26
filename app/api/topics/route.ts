import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Assure-toi que le client Prisma est correctement configuré

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, content, categoryId, authorId } = body;

    // Vérification des données nécessaires
    if (!title || !content || !categoryId || !authorId) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // Création du topic dans la base de données
    const topic = await prisma.topic.create({
      data: {
        title,
        content,
        categoryId,
        authorId,
      },
    });

    return NextResponse.json(topic, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du topic :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
