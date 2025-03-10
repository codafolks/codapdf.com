"use client";
import { CurlSnippet } from "@/app/docs/_snippets/CurlSnippet";
import { Footer } from "@/app/(marketing)/_components/Footer";
import { ROUTES } from "@/app/routes";
import { ButtonUpdateTheme } from "@/client/components/app/ButtonUpdateTheme";
import { SidebarTrigger } from "@/client/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { env } from "@/constants/env.client";
import Link from "next/link";


export default function Docs() {
  return (
    <div className="relative h-screen overflow-y-auto bg-background text-foreground" id="docs-container">
      <header className="sticky top-0 left-0 z-10 flex items-center justify-between border-b bg-background px-4 py-4 lg:px-6">
        <SidebarTrigger />
        <div className="flex items-center space-x-4">
          <h1 className="font-bold">API Reference</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button asChild variant="secondary">
            <Link href={ROUTES.AUTH.LOGIN.pathname()}>Sign In</Link>
          </Button>
          <ButtonUpdateTheme />
        </div>
      </header>
      <main className="mx-auto grid max-w-7xl gap-4 overflow-hidden p-4 md:p-6">
        <section id="introduction" className="grid gap-2">
          <h2 className="font-bold text-3xl">Welcome to the {"<CodaPDF />"} Docs!</h2>
          <p className="text-muted-foreground text-lg">
            Here, you will find information on how to use the platform and the API to convert your HTML templates to
            PDF. The documentation is divided into sections to help you find the information you need.
          </p>
        </section>
        <section className="grid gap-2">
          <h3 className="font-bold text-xl">Support</h3>
          <p className="text-muted-foreground text-lg">If you have any issues or questions, feel free to reach out to us:</p>
          <ul className="text-lg">
            <li>
              <strong>Email: </strong>
              <a href={`mailto:${env.SUPPORT_EMAIL}`} className="text-blue-500">
                {env.SUPPORT_EMAIL}
              </a>{" "}
            </li>
            <li>
              <strong>Discord: </strong>
              <a href="https://discord.gg/T8H7YqvXcW" className="text-blue-500" target="_blank" rel="noreferrer noopener">
                discord server
              </a>
            </li>
            <li>
              <strong>GitHub: </strong>
              <a href="https://github.com/codafolks/codapdf.com" className="text-blue-500" target="_blank" rel="noreferrer noopener">
                codafolks/codapdf
              </a>
            </li>
          </ul>
        </section>
        <section className="grid gap-2" id="using-code-editor">
          <h3 className="font-bold text-3xl">Using the Code Editor</h3>
          <p className="text-muted-foreground text-lg">
            You can build and test your HTML templates using the code editor provided by {"<CodaPDF />"}. This is a
            great way to test your templates before using the API. The templates you save can also be used by the API by
            passing the template ID.
          </p>
          <p className="text-muted-foreground text-lg">
            Once you have signed up, you can create a new template and start building your HTML template, or paste your
            existing HTML template if you prefer.
          </p>
          <p className="text-muted-foreground text-lg">
            <strong>NOTE:</strong> The backend is built in <strong>Python</strong> and use Jinja template engine to
            render the HTML templates. Check out the{" "}
            <a
              href="https://jinja.palletsprojects.com/en/stable/"
              className="text-blue-500"
              target="_blank"
              rel="noreferrer noopener"
            >
              Jinja documentation
            </a>{" "}
            for more information.{" "}
          </p>
          <iframe
            src="https://www.loom.com/embed/16f61120a2a04be282ca203ff36e500b?sid=d9232542-eed6-4f7c-ad8d-e280178bfe16?hideEmbedTopBar=true&hide_title=true&hide_owner=true&hide_share=true"
            title="Creating Templates with Code Editor 👩‍💻"
            allowFullScreen
            className="my-4 aspect-video w-full"
          />
        </section>
        <section className="grid gap-4" id="using-api">
          <h3 className="font-bold text-3xl">API keys</h3>
          <p className="text-muted-foreground text-lg">
            To use the API, you will need an API key. You can create an API key in the API keys section and then You can
            use this key to authenticate your requests.
          </p>
        </section>
        <section className="grid gap-4" >
          <h3 className="font-bold text-xl">Using the API to convert the HTML to PDF</h3>
          <p className="text-muted-foreground text-lg">
            After signing up, you can create an API key in your API keys. Use this key to authenticate your requests.
          </p>
          <h3 className="mb-2 font-semibold text-xl">Using api</h3>
          <CurlSnippet />
        </section>
        <section className="grid gap-4" id="coming-soon">
          <h3 className="font-bold text-xl">#Coming soon</h3>
          <p className="text-muted-foreground text-lg">
            We are working on adding more features to the platform. Stay tuned for more updates on the platform and the
            API.
          </p>
          <p className="text-muted-foreground text-lg">
            Here are some of the features we are working on:
          </p>
          <ul className="list-disc pl-5 text-muted-foreground text-xl">
            <li>Adding more customization options to the API</li>
            <li>Adding more templates to the code editor</li>
            <li>Adding more examples to the documentation</li>
            <li>Adding react-pdf support</li>
            <li>Merge PDFs</li>
            <li>Split PDFs</li>
            <li>Sign PDFs</li>
            <li>Encrypt PDFs</li>
            <li>Watermark PDFs</li>
            <li>Convert PDFs to images</li>
            <li>Convert images to PDFs</li>
            <li>Convert HTML to images</li>
          </ul>
          <p className="text-muted-foreground text-lg">
            If you have any feature requests or suggestions, feel free to reach out to us. We would love to hear from you.
            ❤️
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
