import { ProductCard, type ProductCardData } from "@/components/blocks/commerce/product-card";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ProductGridProps = {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  products: ProductCardData[];
  categories?: { slug: string; name: string }[];
  activeCategory?: string;
  className?: string;
};

export function ProductGrid({
  eyebrow = "Shop",
  headline = "Our products",
  subhead = "Browse the catalog and add items to your cart.",
  products,
  categories = [],
  activeCategory,
  className,
}: ProductGridProps) {
  return (
    <section className={cn("nimbus-section-sm", className)}>
      <div className="nimbus-container space-y-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {eyebrow}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {headline}
          </h1>
          <p className="text-muted-foreground">{subhead}</p>
        </div>

        {categories.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            <ButtonLink
              variant={!activeCategory ? "default" : "outline"}
              size="sm"
              href="/shop"
            >
              All
            </ButtonLink>
            {categories.map((cat) => (
              <ButtonLink
                key={cat.slug}
                variant={activeCategory === cat.slug ? "default" : "outline"}
                size="sm"
                href={`/shop?category=${cat.slug}`}
              >
                {cat.name}
              </ButtonLink>
            ))}
          </div>
        ) : null}

        {products.length === 0 ? (
          <p className="text-muted-foreground">No products found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
