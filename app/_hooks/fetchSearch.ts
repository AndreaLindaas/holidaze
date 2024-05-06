import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../_lib/constants";

const fetchSearch = async( searchWord ) => {
    const response = await  fetch(`${API_URL}/venues/search/?q=${searchWord}`, {
        // headers: {
        //   "Content-type": "application/json; charset=UTF-8",
        //   Authorization: `Bearer ${accessToken}`,
        //   "X-Noroff-API-Key": apiKey,
        // },
      });

      if(response.ok){
        return response.json();
      }else{
        const errorObj = await response.json();
        throw new Error(JSON.stringify(errorObj));
      }
}

export default function useSearch(searchWord){
    return useQuery({
        queryKey: ["search", searchWord],
        queryFn: () => fetchSearch(searchWord),
        enabled: !!searchWord 
    })
}

