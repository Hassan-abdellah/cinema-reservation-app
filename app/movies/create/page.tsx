import CreateMovieForm from "@/components/movies/CreateMovieForm";
import { getLoggedInUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const CreateMoviePage = async () => {
  const superAdmin = await getLoggedInUser();

  if (!superAdmin || superAdmin.role !== "super-admin")
    redirect("/after-login");
  return (
    <section>
      <CreateMovieForm />
    </section>
  );
};

export default CreateMoviePage;
