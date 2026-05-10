import { NextResponse } from "next/server";
import { getServicesForNav } from "@/lib/services.service";

export const revalidate = 2592000;

export async function GET() {
  try {
    const services = await getServicesForNav();
    return NextResponse.json(services);
  } catch (error) {
    console.error("Failed to fetch nav services", error);
    return NextResponse.json([], { status: 200 });
  }
}
