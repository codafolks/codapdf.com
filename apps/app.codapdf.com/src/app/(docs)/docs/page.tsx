"use client";
import { AxiosSnippet } from "@/app/(docs)/docs/_snippets/AxiosSnippet";
import { CurlSnippet } from "@/app/(docs)/docs/_snippets/CurlSnippet";
import { FetchSnippet } from "@/app/(docs)/docs/_snippets/FetchSnippet";
import { Footer } from "@/app/(marketing)/_components/Footer";
import { ButtonUpdateTheme } from "@/client/components/app/ButtonUpdateTheme";
import { SidebarTrigger } from "@/client/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { env } from "@/constants/env.client";

export default function ApiDocs() {
  return (
    <div className="relative h-screen overflow-y-auto bg-background text-foreground">
      <header className="sticky top-0 left-0 z-10 flex items-center justify-between border-b bg-background px-4 py-3">
        <SidebarTrigger />
        <div className="flex items-center space-x-4">
          <h1 className="font-bold">API Reference</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button>Sign In</Button>
          <ButtonUpdateTheme />
        </div>
      </header>
      <main className="mx-auto grid max-w-7xl gap-4 overflow-hidden p-4 md:p-6">
        <section id="introduction">
          <h2 className="font-bold text-2xl">Introduction</h2>
          <p className="text-muted-foreground">
            Welcome to the API documentation. Here you will find information on how to use the API to convert HTML to
            PDF.
          </p>
          <p className="text-muted-foreground">
            For current the version of the app, we only have the HTML to PDF conversion feature. We will be adding more
            features in the future. If you have any questions or need help, please contact us at{" "}
            <a href={`mailto:${env.SUPPORT_EMAIL}`} className="text-blue-500">
              {env.SUPPORT_EMAIL}
            </a>
            .
          </p>
        </section>
        <section className="grid gap-4">
          <h2 className="font-bold">Using the Code Editor</h2>
          <p className="text-muted-foreground">
            You can build and test your HTML templates using the code editor provided by {"<CodaPDF />"}. This is a
            great way to test your templates before using the API.
          </p>
          <p className="text-muted-foreground">
            To get started, you can sign up for a free account. Once you have signed up, you can create a new template
            and start building your HTML template or paste your existing HTML template if you want.
          </p>
          <p className="text-muted-foreground">
            NOTE: The server uses Jinja templating engine to render the HTML templates. Check out the Jinja
            documentation:{" "}
            <a
              href="https://jinja.palletsprojects.com/en/stable/"
              className="text-blue-500"
              target="_blank"
              rel="noopener"
            >
              https://jinja.palletsprojects.com/en/stable/
            </a>
            for more information.
          </p>
          <iframe
            src="https://www.loom.com/embed/16f61120a2a04be282ca203ff36e500b?sid=d9232542-eed6-4f7c-ad8d-e280178bfe16?hideEmbedTopBar=true&hide_title=true&hide_owner=true&hide_share=true"
            title="Creating Templates with Code Editor 👩‍💻"
            allowFullScreen
            className="aspect-video w-full"
          />
        </section>
        <section className="grid gap-4">
          <h2 className="font-bold">API keys</h2>
          <p className="text-muted-foreground">
            To use the API, you will need an API key. You can create an API key in the API keys section and then You can
            use this key to authenticate your requests.
          </p>
        </section>
        <section className="grid gap-4">
          <h2 className="font-bold">Using the API to convert the HTML to PDF</h2>
          <p>
            After signing up, you can create an API key in your API keys. Use this key to authenticate your requests.
          </p>
          <h3 className="mb-2 font-semibold">#Curl example </h3>
          <CurlSnippet />
          <h3 className="mb-2 font-semibold">#Fetch example</h3>
          <FetchSnippet />
          <h3 className="mb-2 font-semibold">#Axios example</h3>
          <AxiosSnippet />
        </section>
      </main>
      <Footer />
    </div>
  );
}
