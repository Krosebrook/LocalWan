import Link from "next/link";
import { Button } from "@wan/ui";
import { Video, Sparkles, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Wan 2.1</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/auth/login">
              <Button>Sign In</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Create Stunning Videos with AI
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your ideas into videos using advanced AI. From text descriptions
            or images to fully animated videos in seconds.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg">
                Get Started
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline">
                Browse Templates
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <Video className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Text to Video</h3>
              <p className="text-muted-foreground">
                Generate videos from text descriptions using advanced AI models.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <Sparkles className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Image to Video</h3>
              <p className="text-muted-foreground">
                Animate your images with AI-powered video generation.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">50+ Templates</h3>
              <p className="text-muted-foreground">
                Choose from professional templates to get started quickly.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 Wan 2.1. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
