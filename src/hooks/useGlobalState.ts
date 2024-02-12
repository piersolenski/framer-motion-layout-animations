import { useContext } from 'react';
import { store } from '../state/global';

export function useGlobalState() {
  return useContext(store);
}
