import CinemaTable from "@/components/cinemas/CinemaTable";
import { listUserCinemas } from "@/lib/actions/cinemas.action";
import { isAdmin } from "@/lib/auth";
import Link from "next/link";

const CinemasListPage = async () => {
  await isAdmin();
  const cinemasList = await listUserCinemas();
  return (
    <section className="mt-4 space-y-6">
      <div className="flex justify-end">
        <Link
          href="/cinemas/create"
          className="bg-steel-blue hover:bg-baltic-blue transition-colors text-white rounded-xl px-4 py-2"
        >
          Add New Cinema
        </Link>
      </div>

      <CinemaTable cinemas={cinemasList} />
    </section>
  );
};

export default CinemasListPage;
