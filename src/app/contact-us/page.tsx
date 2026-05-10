import type { Metadata } from "next";
import ContactUsClient from "./ContactUsClient";
import { getPageMetadata } from "@/lib/pageSeo.service";

const CONTACT_SEO_REVALIDATE = 2592000;

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("contact-us", undefined, {
    revalidate: CONTACT_SEO_REVALIDATE,
  });
}

export default function ContactUsPage() {
  return <ContactUsClient />;
}
