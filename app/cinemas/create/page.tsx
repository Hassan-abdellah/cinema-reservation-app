import CreateCinemaForm from "@/components/cinemas/CreateCinemaForm";
import { isAdmin } from "@/lib/auth";

const CreateCinemaPage = async () => {
  await isAdmin();

  return (
    <section>
      <CreateCinemaForm />
    </section>
  );
};

export default CreateCinemaPage;
