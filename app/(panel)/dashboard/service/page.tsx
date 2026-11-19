import type { Metadata } from "next";
import { ServiceContent } from "./_components/service-content";

export const metadata: Metadata = {
  title: "Serviços | Odonto Pro",
};

export default function ServicePage() {
  return <ServiceContent />;
}
