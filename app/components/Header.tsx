import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">Forum</h1>
      <Button
        variant="outline"
        onClick={() => router.push("/login")} // Redirige vers la page de connexion
      >
        Se connecter
      </Button>
    </header>
  );
}


