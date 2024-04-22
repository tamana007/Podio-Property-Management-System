// podioStore.ts
import {create} from 'zustand';

interface PodioStore {
  email: string;
  userName:string;
  // address:string|null;

  setEmail: (email: string) => void;
  setUserName:(userName:string)=>void;
  address: string | null;
  setAddress: (address: string | null) => void;

}

export const usePodioStore = create<PodioStore>((set) => ({
  email: 'tam@gmail.com', // Initial value for email
  userName:'ali',
  address:null,
  // id:123,
  // setEmail: (email: string) => set({ email }), // Setter function for email
  setEmail: (email: string) => set({ email: email }),
  setUserName:(userName:string)=>set({userName:userName}),
  // address: null,
  setAddress: (address) => set((state)=>({...state, address })),
  // setId:(id:number)=>set({id:id}),

}));
