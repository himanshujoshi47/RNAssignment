import React from 'react';
import renderer from 'react-test-renderer';
import R from '../../res';
import FoodListSubcategoryTitleCell from '../FoodListSubcategoryTitleCell';

jest.useFakeTimers();

describe('renders and have required elements', () => {
  let props = {
    title: 'Hey, Its me',
  };

  const foodListSubcategoryTitleCell = renderer.create(
    <FoodListSubcategoryTitleCell {...props} />,
  );
  const foodListSubcategoryTitleCellInst = foodListSubcategoryTitleCell.root;

  it('renders correctly', () => {
    expect(foodListSubcategoryTitleCell).toMatchSnapshot();
  });

  it('should have required elements', () => {
    expect(
      foodListSubcategoryTitleCellInst.findByProps({
        testID: R.id.FOOD_LIST_ITEM_TITLE,
      }),
    ).toBeTruthy();
  });
});
