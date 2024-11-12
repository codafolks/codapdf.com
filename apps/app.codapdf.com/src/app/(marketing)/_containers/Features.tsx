import { keyFeatures } from "@/app/(marketing)/_data/keyFeatures";
export const Features = () => (
  <section className="w-full bg-secondary text-foreground" id="features">
    <div className="marketing-section grid gap-8 px-4 py-12 md:px-6 md:py-24 lg:py-16">
      <h2 className="text-center font-bold text-3xl tracking-tighter sm:text-5xl ">Key Features</h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {keyFeatures.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 transition-transform hover:scale-[1.02]"
          >
            <feature.icon className="h-8 w-8" />
            <h3 className="font-bold text-xl">{feature.title}</h3>
            <p className="text-center text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
