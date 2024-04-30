// podioStore.ts
import { create } from "zustand";

interface PodioStore {
  email: string;
  userName: string;
  address: string | null;
  mentionedUser: string | null;

  setEmail: (email: string) => void;
  setUserName: (userName: string) => void;
  setAddress: (address: string | null) => void;
  setMentionedUser: (mentionedUser: string) => void;
}

export const usePodioStore = create<PodioStore>((set) => ({
  email: "tam@gmail.com", // Initial value for email
  userName: "ali",
  address: null,
  mentionedUser: "ali",

  // setEmail: (email: string) => set({ email }), // Setter function for email
  setEmail: (email: string) => set({ email: email }),
  setUserName: (userName: string) => set({ userName: userName }),

  setAddress: (address) => set((state) => ({ ...state, address })),
  setMentionedUser: (user:string) => set({ mentionedUser: user }),
}));
