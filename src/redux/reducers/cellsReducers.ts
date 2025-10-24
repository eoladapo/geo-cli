import { ActionTypes } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';
import produce from 'immer';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellsReducer = produce((state: CellsState = initialState, action: Action): CellsState => {
  switch (action.type) {
    case ActionTypes.UPDATE_CELL:
      const { id, content } = action.payload;
      const cell = state.data[id];
      cell.content = content;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: cell,
        },
      };

    case ActionTypes.DELETE_CELL:
      const newData = { ...state.data };
      delete newData[action.payload];
      return {
        ...state,
        data: newData,
        order: state.order.filter((id) => id !== action.payload),
      };

    case ActionTypes.INSERT_CELL_BEFORE:
      const newCell: Cell = {
        id: Math.random().toString(36).substr(2, 5),
        type: action.payload.type,
        content: '',
      };
      return {
        ...state,
        data: {
          ...state.data,
          [newCell.id]: newCell,
        },
        order: [newCell.id, ...state.order],
      };

    case ActionTypes.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return {
        ...state,
      };

    default:
      return state;
  }
});

export default cellsReducer;
