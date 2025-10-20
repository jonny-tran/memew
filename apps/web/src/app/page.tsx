import StorefrontHero2 from "@/components/home/storefront-hero-2";
import ProductCard2 from "@/components/home/product-card-2";
import ProductBestseller from "@/components/home/product-bestseller";
import ProductCategory from "@/components/home/product-category-2";
import Testimonials from "@/components/home/testimonials";
import CTANewsletter from "@/components/home/cta-newsletter";

export default function Home() {
  return (
    <>
      <StorefrontHero2 />
      <ProductCard2 />
      <ProductBestseller />
      <ProductCategory />
      <Testimonials />
      <CTANewsletter />
    </>
  );
}
