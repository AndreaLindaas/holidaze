import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      name: "",
      email: "",
      accessToken: "",
      apiKey: "",
      avatar: "",
      isVenueManager: false,
      bio: "",
      banner: "",
      setName: (n) => set({ name: n }),
      setEmail: (e) => set({ email: e }),
      setToken: (t) => set({ accessToken: t }),
      setApiKey: (k) => set({ apiKey: k }),
      setAvatar: (a) => set({ avatar: a }),
      setIsVenueManager: (v) => set({ isVenueManager: v }),
      setBio: (b) => set({ bio: b }),
      setBanner: (i) => set({ banner: i }),
      logout: () =>
        set({
          name: "",
          email: "",
          accessToken: "",
          apiKey: "",
          avatar: "",
          isVenueManager: false,
          bio: "",
          banner: "",
        }),
    }),
    {
      name: "holidaze-storage", // name of the item in the storage (must be unique)
    }
  )
);

export const bookingStore = create(
  persist(
    (set, get) => ({
      venue: {},
      startDate: "",
      endDate: "",

      setVenue: (v) => set({ venue: v }),
      setStartDate: (s) => set({ startDate: s }),
      setEndDate: (e) => set({ endDate: e }),
    }),
    {
      name: "holidaze-booking", // name of the item in the storage (must be unique)
    }
  )
);
