import { useRouter } from "next/router";
import Link from "next/link";

export default function CategoryPage() {
  const router = useRouter();
  const { id } = router.query;

  const topics = [
    { id: "1", title: "Bienvenue", createdAt: "2024-11-25", author: "Admin" },
    { id: "2", title: "Comment utiliser ce forum ?", createdAt: "2024-11-24", author: "User" },
  ];

  return (
    <main className="p-4">
      <h2 className="text-2xl font-bold mb-4">Topics pour la catégorie {id}</h2>
      <div className="space-y-2">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/topic/${topic.id}`}
            className="block p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            <h3 className="font-semibold">{topic.title}</h3>
            <p className="text-sm text-gray-600">
              Par {topic.author} le {topic.createdAt}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
