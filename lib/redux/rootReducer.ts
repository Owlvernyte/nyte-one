/* Instruments */
import { counterSlice, sidebarSlice } from './slices'

export const reducer = {
  counter: counterSlice.reducer,
  sidebar: sidebarSlice.reducer
}
