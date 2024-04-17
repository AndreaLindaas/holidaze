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
      setName: (n) => set({ name: n }),
      setEmail: (e) => set({ email: e }),
      setToken: (t) => set({ accessToken: t }),
      setApiKey: (k) => set({ apiKey: k }),
      setAvatar: (a) => set({ avatar: a }),
      setIsVenueManager: (v) => set({ isVenueManager: v }),
      setBio: (b) => set({ bio: b }),
    }),
    {
      name: "holidaze-storage", // name of the item in the storage (must be unique)
    }
  )
);
