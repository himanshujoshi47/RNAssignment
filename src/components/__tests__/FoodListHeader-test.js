import React from 'react';
import renderer, {act} from 'react-test-renderer';
import FoodListHeader from '../FoodListHeader';
import R from '../../res';

jest.useFakeTimers();

describe('renders and behave correctly', () => {
  let props = {
    didCloseFoodListModal: jest.fn(),
    performSearch: jest.fn(),
  };

  const foodListHeader = renderer.create(<FoodListHeader {...props} />);
  const foodListHeaderInst = foodListHeader.root;

  it('renders correctly', () => {
    expect(foodListHeader).toMatchSnapshot();
  });

  it('should have required elements', () => {
    expect(
      foodListHeaderInst.findByProps({testID: R.id.CLOSE_FOOD_LIST_MODAL}),
    ).toBeTruthy();
    expect(
      foodListHeaderInst.findByProps({testID: R.id.APPROVED_FOOD_LIST_TITLE}),
    ).toBeTruthy();
    expect(
      foodListHeaderInst.findByProps({testID: R.id.FOOD_LIST_SEARCH_INPUT}),
    ).toBeTruthy();
  });

  it('expand/collapse category on select', () => {
    act(() => {
      foodListHeaderInst
        .findByProps({testID: R.id.CLOSE_FOOD_LIST_MODAL})
        .props.onPress();
    });

    expect(props.didCloseFoodListModal).toBeCalled();
  });

  it('should search while typing text in search bar', () => {
    act(() => {
      foodListHeaderInst
        .findByProps({testID: R.id.FOOD_LIST_SEARCH_INPUT})
        .props.onChangeText('loin');
    });

    expect(props.performSearch).toBeCalledWith('loin');
  });
});
