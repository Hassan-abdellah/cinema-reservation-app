import SeatConfigurations from "@/components/halls/SeatConfigurations";
import { viewHall } from "@/lib/actions/halls.actions";
import { isAdmin } from "@/lib/auth";
const ViewHallPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  await isAdmin();
  const { id } = await params;
  const hall = await viewHall(id);
  return (
    <section className="my-4">
      {hall && <SeatConfigurations hall={hall} />}
    </section>
  );
};

export default ViewHallPage;
