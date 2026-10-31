import { isSuperAdmin } from "@/lib/auth";

const MoviesListPage = async () => {
  await isSuperAdmin();

  return <div>MoviesListPage</div>;
};

export default MoviesListPage;
