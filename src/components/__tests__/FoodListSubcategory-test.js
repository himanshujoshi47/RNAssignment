import React from 'react';
import renderer from 'react-test-renderer';
import R from '../../res';
import FoodListSubcategory from '../FoodListSubcategory';

jest.useFakeTimers();

describe('renders and have required elements', () => {
  let props = {
    colorCode: '#333',
    subcategories: [
      {
        items: [
          'Beef (93/7 ground)',
          'Bison',
          'Filet Mignon (trim fat)',
          'Kangaroo',
          'Sirloin (ground)',
          'Sirloin Strip Steak',
          'Veal (Ground)',
          'Venison',
        ],
        subCategoryname: 'Beef',
      },
    ],
  };

  const foodListSubcategory = renderer.create(
    <FoodListSubcategory {...props} />,
  );
  const foodListSubcategoryInst = foodListSubcategory.root;

  it('renders correctly', () => {
    expect(foodListSubcategory).toMatchSnapshot();
  });

  it('should have required elements', () => {
    expect(
      foodListSubcategoryInst.findByProps({
        testID: R.id.FOOD_LIST_SUBCAT_TITLE,
      }),
    ).toBeTruthy();
  });
});
