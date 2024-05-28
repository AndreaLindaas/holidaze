import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../_lib/constants";

const fetchVenuesForProfile = async (name, apiKey, accessToken) => {
  const response = await fetch(`${API_URL}/profiles/${name}/venues`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  if (response.ok) {
    const result = await response.json();
    return result.data;
  } else {
    const errorObj = await response.json();
    throw new Error(JSON.stringify(errorObj));
  }
};

export default function useVenuesForProfile(name, apiKey, accessToken) {
  return useQuery({
    queryKey: ["venueForProfile", name],
    queryFn: () => fetchVenuesForProfile(name, apiKey, accessToken),
    enabled: !!name && !!apiKey && !!accessToken,
  });
}
