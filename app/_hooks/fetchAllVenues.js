import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../_lib/constants";

const fetchVenues = async (limit, page) => {
  const response = await fetch(
    `${API_URL}/venues/?limit=${limit}&page=${page}&sort=created&sortOrder=desc`,
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    const errorObj = await response.json();
    throw new Error(JSON.stringify(errorObj));
  }
};

export default function useVenues(limit, page) {
  return useQuery({
    queryKey: ["venues", limit, page],
    queryFn: () => fetchVenues(limit, page),
    enabled: !!limit,
  });
}
