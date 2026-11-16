import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
import { ProfileContent } from "./_components/profile";
import { getUserData } from "./_data-access/get-info-user";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session?.user?.id) redirect("/api/auth/signin?callbackUrl=%2Fdashboard%2Fprofile");
  const user = await getUserData({ userId: session.user.id });
  if (!user) redirect("/api/auth/signin?callbackUrl=%2Fdashboard%2Fprofile");
  return <ProfileContent user={user} />;
}
