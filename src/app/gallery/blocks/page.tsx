import { getRegistryBlockList } from "@/lib/catalog/registry";

export default function BlocksGalleryPage() {
  const blocks = getRegistryBlockList();

  return (
    <div className="space-y-0">
      <section className="border-b bg-muted/30 py-12">
        <div className="nimbus-container space-y-3">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Block gallery
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Nimbus reusable blocks
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Marketing, ecommerce, and content blocks for Exori-generated sites.
            Each block also has a dedicated preview at{" "}
            <code className="text-xs">/blocks/[slug]</code>.
          </p>
        </div>
      </section>

      {blocks.map(({ id, label, component: Block }) => (
        <div key={id} id={id} className="border-b last:border-b-0">
          <div className="nimbus-container py-4">
            <p className="text-xs font-mono text-muted-foreground">{id}</p>
            <p className="text-sm font-medium">{label}</p>
          </div>
          <Block />
        </div>
      ))}
    </div>
  );
}
