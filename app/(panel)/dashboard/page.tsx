import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Dashboard() {

  const session = getSession()

  if(!session) {
    redirect("/")
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo ao painel de controle!</p>
    </div>
  );
}
