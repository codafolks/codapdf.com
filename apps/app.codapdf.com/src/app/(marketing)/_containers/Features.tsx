import { keyFeatures } from "@/app/(marketing)/_data/keyFeatures";
export const Features = () => (
  <section className="w-full bg-secondary text-foreground" id="features">
    <div className="marketing-section px-4 md:px-6 grid gap-8 py-12 lg:py-16 md:py-24">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center  ">Key Features</h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {keyFeatures.map((feature) => (
          <div key={feature.id} className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-background hover:scale-[1.02] transition-transform">
            <feature.icon className="h-8 w-8" />
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-sm  text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
