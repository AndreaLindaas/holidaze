"use client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function Providers({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {children}
      </LocalizationProvider>
    </QueryClientProvider>
  );
}
