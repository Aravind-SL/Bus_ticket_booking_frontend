import { UseBoundStore, StoreApi, create } from 'zustand';
import axios from 'axios';
import {API_URL} from './consts';


interface EntityState<T> {
  items: T[] 
  fetchAll: () => Promise<void>,
  add: (data: any) => Promise<void>,
}

interface DeletableEntityState<T> extends EntityState<T>{
  delete: (id: EntityID) => Promise<void>
}

interface EditableEntityState<T> extends EntityState<T>{
  edit: (id: EntityID, data: any) => Promise<void>
}

const token = localStorage.getItem('token');

type CreateSlice = <T>(path: string, set: (cb: any) => void, initItems: T[]) => EntityState<T>
const createSlice: CreateSlice = (path, set, initItems) => ({
    items: initItems,
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
});

async function createEditableStore<T>(path: string, getId: (d: T) => EntityID) {

  try {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    let res = await axios.get(API_URL + path);
    return create<EditableEntityState<T>>((set) => ({
      ...createSlice<T>(path, set, res.data),
      delete: async (id: EntityID) => {
        try {
          let _res = await axios.delete(API_URL+path+"/"+id);
          set((state) => ({items: state.items ? state.items.filter(i => getId(i) !== id) : [] }))
        } catch (e) {
          throw e;
        }
      },
      edit: async (id:EntityID, data: any) => {
        try {
          let _res = await axios.put(API_URL+path+"/"+id, data);
          set((state) => {

            let items = state.items
            let idx =  items.findIndex((d) => d === data)

            return {
              items: [...items.slice(0, idx-1), data, ...items.slice(idx)]
            };
          });

        } catch (e) {
          throw e;
        }
      },
    }));
  } catch (e) {
    throw e;
  }
}

async function createDeleteableStore<T>(path: string) {
  try {

    let res = await axios.get(API_URL + path);
    return create<DeletableEntityState<T>>((set) => ({
      ...createSlice<T>(path, set, res.data),
      delete: async (id) => {
        try {

        } catch (e) {
          throw e;
        }
      },
    }));
  } catch (e) {

     throw e;
  }
}

async function createDefaultStores<T>(path: string) {
  try {
  let res = await axios.get(API_URL + path);
  return create<EntityState<T>>((set) => ({
      ...createSlice(path, set, res.data),
    }));
  } catch (e) {

     throw e;
  }
}

export const useStations = await createEditableStore<Station>("/api/v1/stations", s => s.stationId);
export const useRoutes = await createEditableStore<Route>("/api/v1/routes", r => r.routeId);
export const useBuses = await createEditableStore<Bus>("/api/v1/buses", b => b.busId);
export const useUsers = await createDeleteableStore<User>("/api/v1/users");

type State<T> = EntityState<T> | EditableEntityState<T> | DeletableEntityState<T>
export type Store<T> = UseBoundStore<StoreApi<State<T>>>
