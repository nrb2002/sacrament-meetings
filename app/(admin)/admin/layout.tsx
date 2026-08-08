import { auth } from "@/auth";
import AdminLayout from "@/components/admin/AdminLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const userName = session?.user?.name ?? "Administrator";

  return <AdminLayout userName={userName}>{children}</AdminLayout>;
}
