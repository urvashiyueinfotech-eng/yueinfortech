import { NextResponse } from "next/server";
import { getAllMainServices } from "@/lib/services.service";

export const revalidate = 86400;

export async function GET() {
  try {
    const services = await getAllMainServices();
    return NextResponse.json(
      services.map((service) => ({
        id: service.id,
        title: service.title,
        slug: service.slug,
        primaryHref: service.primaryHref,
      }))
    );
  } catch (error) {
    console.error("Failed to fetch nav services", error);
    return NextResponse.json([], { status: 200 });
  }
}
