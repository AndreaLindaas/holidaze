import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../_lib/constants";

const fetchBookings = async(name, apiKey, accessToken) => {
    const response = await fetch(`${API_URL}/profiles/${name}/bookings?_venue=true`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
      });

      if(response.ok){
        return response.json();
      }else{
        const errorObj = await response.json();
        throw new Error(JSON.stringify(errorObj));
      }
}

export default function useBookings(name, apiKey, accessToken){
    return useQuery({
        queryKey: ["bookings", name],
        queryFn: () => fetchBookings(name, apiKey, accessToken),
        enabled: !!name && !!apiKey && !!accessToken
    })
}

