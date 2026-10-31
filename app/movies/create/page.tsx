import CreateMovieForm from "@/components/movies/CreateMovieForm";
import { isSuperAdmin } from "@/lib/auth";

const CreateMoviePage = async () => {
  await isSuperAdmin();
  return (
    <section>
      <CreateMovieForm />
    </section>
  );
};

export default CreateMoviePage;
