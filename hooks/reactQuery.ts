import { Genre } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

export const useGenres = () => {
  const { data, isLoading } = useQuery<{ genres: Genre[] }>({
    queryKey: ["genres"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres`);
      return await res.json();
    },
  });

  return { genres: data?.genres ?? [], isLoading };
};
