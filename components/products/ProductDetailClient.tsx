"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import ProductPhoto from "@/components/products/ProductPhoto";
import { type Product } from "@/lib/products";
import { getAllProducts, getProductById } from "@/lib/product-service";

type ProductDetailClientProps = {
  productId: string;
};

export default function ProductDetailClient({
  productId,
}: ProductDetailClientProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const currentProduct = await getProductById(productId);
        setProduct(currentProduct);

        if (currentProduct) {
          const allProducts = await getAllProducts();
          setRelatedProducts(
            allProducts
              .filter(
                (candidate) =>
                  candidate.category === currentProduct.category &&
                  candidate.id !== currentProduct.id
              )
              .slice(0, 4)
          );
        }
      } finally {
        setIsLoading(false);
      }
    }

    void loadProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center gap-2 px-4 py-20 text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading product...
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-20 text-center">
          <h1 className="mb-4 text-2xl font-bold text-slate-900">
            Product Not Found
          </h1>
          <p className="mb-8 text-slate-600">
            The product you are looking for does not exist.
          </p>
          <Link
            href="/products"
            className="mx-auto inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
        <Link
          href="/products"
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:border-slate-300 hover:text-slate-900 md:mb-6 md:text-base"
        >
          <ArrowLeft size={18} /> Back to Products
        </Link>

        <div className="overflow-hidden border border-slate-200 bg-white">
          <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative border-b border-slate-200 bg-white p-4 sm:p-6 lg:border-b-0 lg:border-r">
              <div className="relative overflow-hidden rounded-[0.5rem] border border-slate-100 bg-white p-3 sm:p-4">
                <div className="relative overflow-hidden rounded-[0.25rem]">
                  <ProductPhoto
                    src={product.photoUrl}
                    alt={product.name}
                    className="aspect-[4/3] w-full bg-transparent"
                    imgClassName="h-full min-h-[320px] w-full object-cover sm:min-h-[420px]"
                  />
                <div className="absolute left-4 top-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">
                    <Sparkles className="h-3 w-3 text-blue-600" />
                    Fresh
                  </span>
                </div>

                {/* Image overlay removed per request */}
                </div>
              </div>
            </div>

            <div className="bg-white px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              <div className="flex items-center">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                  <BadgeCheck className="h-3 w-3 text-blue-600" />
                  Fresh
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
                  {product.category}
                </p>
                <h1 className="max-w-xl text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                  {product.name}
                </h1>
                <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                  {product.details || product.description}
                </p>
              </div>

              <div className="mt-6 grid gap-2 sm:grid-cols-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Price
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{product.price}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Finish
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900">Industrial grade</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Support
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900">Fast quote response</p>
                </div>
              </div>

              {/* Feature cards removed per request */}

              {product.keyHighlights.length > 0 ? (
                <div className="mt-7 rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(180deg,_rgba(248,250,252,0.96),_rgba(255,255,255,1))] p-5 sm:p-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-emerald-600" />
                    <h2 className="text-base font-semibold text-slate-950">
                      Key Highlights
                    </h2>
                  </div>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2 list-disc list-inside text-slate-700">
                    {product.keyHighlights.map((highlight) => (
                      <li key={highlight} className="text-sm leading-6">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-7">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-black px-6 py-4 text-center text-sm font-semibold text-white transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 ? (
          <div className="mt-10 md:mt-14">
            <div className="mb-5 md:mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                More from this line
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950 md:text-3xl">
                Related Products
              </h2>
            </div>
            <div>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <li key={relatedProduct.id}>
                    <Link href={`/product/${relatedProduct.id}`} className="text-sm font-medium text-slate-900 hover:underline">
                      {relatedProduct.name}
                      <span className="ml-2 text-sm font-normal text-slate-700">— {relatedProduct.price}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
