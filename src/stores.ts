import { create } from 'zustand';
import axios from 'axios';
import {API_URL} from './consts';

interface EntityState<T> {
  items: T[] | null
  fetchAll: () => Promise<void>,
  add: (data: any) => Promise<void>,
  edit: (data: T) => Promise<void>
}

function createDefaultStores<T>(path: string) {

 return create<EntityState<T>>((set) => ({
    items: null,
    fetchAll: async () => {
      try {
        let res = await axios.get(API_URL + path);
        set(() => ({ items: res.data }) )
      } catch (e) {
        throw e;
      }
    },
    
    add: async (data) => {
      try {
        let res = await axios.post(API_URL + path, data);
        set((state)  => ({items: [...state.items??[], res.data]}))
      } catch (e) {
        throw e;
      }
    },

    edit: async (data) => {
      try {

      } catch (e) {
        throw e;
      }
    },
  }));

}

export const useStations = createDefaultStores<Station>("/api/v1/stations");
export const useRoutes = createDefaultStores<Route>("/api/v1/routes");
