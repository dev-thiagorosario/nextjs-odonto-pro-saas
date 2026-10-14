import Header from "@/app/(public)/_components/header";
import { Hero } from "@/app/(public)/_components/hero";

export default function Dashboard() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
      </main>
    </>
  );
}
