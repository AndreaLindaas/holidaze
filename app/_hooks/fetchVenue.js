import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../_lib/constants";

const fetchVenue = async(id) => {
    const response = await  fetch(`${API_URL}/venues/${id}?_bookings=true&_owner=true`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if(response.ok){
        const result = await response.json();
        return result.data;
      }else{
        const errorObj = await response.json();
        throw new Error(JSON.stringify(errorObj));
      }
}

export default function useVenue(id){
    return useQuery({
        queryKey: ["venue", id],
        queryFn: () => fetchVenue(id),
        enabled: !!id
    })
}

