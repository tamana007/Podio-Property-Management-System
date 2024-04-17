// podioStore.ts
import {create} from 'zustand';

interface PodioStore {
  email: string;
  userName:string;

  setEmail: (email: string) => void;
  setUserName:(userName:string)=>void;

}

export const usePodioStore = create<PodioStore>((set) => ({
  email: 'tam@gmail.com', // Initial value for email
  userName:'ali',
  // id:123,
  // setEmail: (email: string) => set({ email }), // Setter function for email
  setEmail: (email: string) => set({ email: email }),
  setUserName:(userName:string)=>set({userName:userName}),
  // setId:(id:number)=>set({id:id}),

}));
