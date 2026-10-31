import { getLoggedInUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const LoginSuccessPage = async () => {
  const loggedInUser = await getLoggedInUser();

  if (!loggedInUser) redirect("/auth/sign-in");

  if (loggedInUser.role === "admin") redirect("/dashboard/admin");
  if (loggedInUser.role === "super-admin") redirect("/dashboard/super-admin");
  if (loggedInUser.role === "customer") redirect("/");
};

export default LoginSuccessPage;
