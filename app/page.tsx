"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fonction pour récupérer les catégories
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des catégories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      title: formData.get("title"),
      content: formData.get("message"),
      categoryId: formData.get("category"),
      authorId: "1234567890abcdef12345678", // ID de l'utilisateur connecté
    };

    try {
      const response = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du topic");
      }

      const result = await response.json();
      console.log("Topic créé avec succès :", result);
      setIsOpen(false);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <main className="p-4">
      <h2 className="text-2xl font-bold mb-4">Catégories</h2>
      <div className="space-y-2">
        {categories.map((category: { id: string; name: string }) => (
          <div key={category.id} className="block p-2 bg-gray-200 rounded hover:bg-gray-300">
            {category.name}
          </div>
        ))}
      </div>

      <Button variant="outline" className="mt-4" onClick={() => setIsOpen(true)}>
        Créer un topic
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer un topic</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Titre du topic"
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                className="w-full p-2 border rounded"
                required
              />
              <select name="category" className="w-full p-2 border rounded" required>
                {categories.map((category: { id: string; name: string }) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">Créer</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
