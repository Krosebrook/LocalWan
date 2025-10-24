"use client";

import { useState } from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Tabs, TabsContent, TabsList, TabsTrigger, Progress } from "@wan/ui";
import { Video, Image, Sparkles, Download, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Video className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Wan 2.1</h1>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Credits: 100</span>
            <Button variant="outline">My Videos</Button>
            <Button>Profile</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Create Your Video</h2>
          <p className="text-muted-foreground mb-8">
            Generate stunning videos using AI from text or images
          </p>

          {/* Generation Type Tabs */}
          <Tabs defaultValue="text-to-video" className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text-to-video">
                <Video className="mr-2 h-4 w-4" />
                Text to Video
              </TabsTrigger>
              <TabsTrigger value="image-to-video">
                <Image className="mr-2 h-4 w-4" />
                Image to Video
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text-to-video" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Text to Video Generation</CardTitle>
                  <CardDescription>
                    Describe your video in detail for best results
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Prompt</label>
                    <textarea
                      className="w-full min-h-[120px] p-3 border rounded-md resize-none"
                      placeholder="Describe the video you want to create... (e.g., 'A serene mountain landscape with snow-capped peaks, crystal clear lake reflecting the mountains')"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Link href="/templates" className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Browse Templates
                      </Button>
                    </Link>
                    <Button 
                      className="flex-1" 
                      onClick={handleGenerate}
                      disabled={!prompt || isGenerating}
                    >
                      {isGenerating ? "Generating..." : "Generate Video"}
                    </Button>
                  </div>

                  {isGenerating && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Generating your video...</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="image-to-video" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Image to Video Generation</CardTitle>
                  <CardDescription>
                    Upload an image and add motion to it
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop an image or click to browse
                    </p>
                    <Button variant="outline" size="sm">Select Image</Button>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Motion Description (Optional)</label>
                    <Input 
                      placeholder="Describe the motion you want to add..."
                    />
                  </div>

                  <Button className="w-full" disabled>
                    Generate Video
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Recent Generations */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Recent Generations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sample Video {i}</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
