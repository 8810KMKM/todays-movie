import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { InputActions } from 'actions';
import { Calender } from 'lib/calender';

export interface State {
  inputValue: string;
  selectedValue: string;
  clickCount: number;
  year: number;
  month: number;
}

export const initialState: State = {
  inputValue: '',
  selectedValue: '',
  clickCount: 0,
  year: 2020,
  month: 3,
};
console.log(
  Calender.getInstance(initialState.year, initialState.month).calenderElements
);

export const Reducer = reducerWithInitialState(initialState)
  .case(InputActions.updateTextInputValue, (state, inputValue) => {
    return { ...state, inputValue };
  })
  .case(InputActions.updateSelectedValue, (state, selectedValue) => {
    return { ...state, selectedValue };
  })
  .case(InputActions.updateCount, state => {
    return { ...state, clickCount: state.clickCount + 1 };
  });
