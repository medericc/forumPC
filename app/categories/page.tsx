import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const categories = [
    { id: "1", name: "Général" },
    { id: "2", name: "Développement" },
    { id: "3", name: "Design" },
  ];

  return (
    <main className="p-4">
      <h2 className="text-2xl font-bold mb-4">Catégories</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="block p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
