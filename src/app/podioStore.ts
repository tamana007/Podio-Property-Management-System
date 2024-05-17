// podioStore.ts
import { create } from "zustand";

interface PodioStore {
  identity:string;
  email: string;
  userName: string;
  address: string | null;
  mentionedUser: string[] | null;
  
  setIdentity:(identity:string)=>void
  setEmail: (email: string) => void;
  setUserName: (userName: string) => void;
  setAddress: (address: string | null) => void;
  setMentionedUser: (users: string[]) => void;
}

export const usePodioStore = create<PodioStore>((set) => ({
  identity:"",
  email: "", // Initial value for email
  userName: "ali",
  address: null,
  mentionedUser: ["ali"],

  // setEmail: (email: string) => set({ email }), // Setter function for email
  setIdentity:(identity:string)=>{
    console.log("identity", identity)

    return set({identity : identity})
  },
  setEmail: (email: string) => set({ email: email }),
  setUserName: (userName: string) => set({ userName: userName }),

  setAddress: (address) => set((state) => ({ ...state, address })),
  setMentionedUser: (users:string[]) => set({ mentionedUser: users }),
}));
