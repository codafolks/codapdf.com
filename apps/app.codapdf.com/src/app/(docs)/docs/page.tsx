"use client";

import { ButtonUpdateTheme } from "@/client/components/app/ButtonUpdateTheme";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, Search } from "lucide-react";
import { useState } from "react";

export default function ApiDocs() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <h1 className="text-xl font-bold">API Documentation</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-8 md:w-[300px] lg:w-[400px]" />
          </div>
          <Button>Sign In</Button>
          <ButtonUpdateTheme />
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className={`w-64 bg-muted p-4 overflow-y-auto ${isSidebarOpen ? "block" : "hidden"} md:block`}>
          <nav>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold mb-2">Getting Started</h2>
                <a href="#introduction" className="block text-sm hover:underline">
                  Introduction
                </a>
                <a href="#authentication" className="block text-sm hover:underline">
                  Authentication
                </a>
                <h2 className="text-lg font-semibold mt-4 mb-2">Endpoints</h2>
                <a href="#users" className="block text-sm hover:underline">
                  Users
                </a>
                <a href="#posts" className="block text-sm hover:underline">
                  Posts
                </a>
                <a href="#comments" className="block text-sm hover:underline">
                  Comments
                </a>
              </div>
            </ScrollArea>
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-y-auto">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="max-w-3xl mx-auto space-y-8">
              <section id="introduction">
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-muted-foreground">Welcome to our API documentation. This guide will help you get started with integrating our API into your applications.</p>
              </section>
              <section id="authentication">
                <h2 className="text-2xl font-bold mb-4">Authentication</h2>
                <p className="text-muted-foreground mb-4">To use our API, you'll need to authenticate your requests. We use API keys for authentication.</p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>curl -H "Authorization: Bearer YOUR_API_KEY" https://api.example.com/v1/users</code>
                </pre>
              </section>
              <section id="users">
                <h2 className="text-2xl font-bold mb-4">Users Endpoint</h2>
                <p className="text-muted-foreground mb-4">The users endpoint allows you to retrieve, create, update, and delete user information.</p>
                <h3 className="text-xl font-semibold mb-2">Get User</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>GET /v1/users/:id</code>
                </pre>
              </section>
              <section id="posts">
                <h2 className="text-2xl font-bold mb-4">Posts Endpoint</h2>
                <p className="text-muted-foreground mb-4">The posts endpoint allows you to manage blog posts or articles.</p>
                <h3 className="text-xl font-semibold mb-2">Create Post</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>POST /v1/posts</code>
                </pre>
              </section>
              <section id="comments">
                <h2 className="text-2xl font-bold mb-4">Comments Endpoint</h2>
                <p className="text-muted-foreground mb-4">The comments endpoint allows you to manage comments on posts.</p>
                <h3 className="text-xl font-semibold mb-2">Get Comments for Post</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>GET /v1/posts/:postId/comments</code>
                </pre>
              </section>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
