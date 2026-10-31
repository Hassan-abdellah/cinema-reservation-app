import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";
const CinemasListLoading = () => {
  return (
    <Fragment>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-8 w-full rounded-lg" />
      ))}
    </Fragment>
  );
};

export default CinemasListLoading;
