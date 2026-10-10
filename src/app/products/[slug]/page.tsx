import { notFound } from "next/navigation";
import { ProjectDetail, getProjectMetadata, type ProjectPageContext } from "@/app/portfolio/[slug]/page";
import { getProductBySlug } from "@/lib/portfolioProjects.service";
import "../../portfolio/[slug]/project.css";

type PageProps = { params: Promise<{ slug: string }> };
export const revalidate = 3600;

const productContext: ProjectPageContext = { label: "Products", href: "/products", routePrefix: "/products" };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return getProjectMetadata(await getProductBySlug(slug), productContext);
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return <ProjectDetail project={product} context={productContext} />;
}
