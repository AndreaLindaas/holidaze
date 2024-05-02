import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../_lib/constants";

const fetchBooking = async(id, apiKey, accessToken) => {
    const response = await  fetch(`${API_URL}/bookings/${id}?_customer=true&_venue=true`, {
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

export default function useBooking(id, apiKey, accessToken){
    return useQuery({
        queryKey: ["booking", id],
        queryFn: () => fetchBooking(id, apiKey, accessToken),
        enabled: !!id && !!apiKey && !!accessToken
    })
}

