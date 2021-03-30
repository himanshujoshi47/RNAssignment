import React from 'react';
import renderer, {act} from 'react-test-renderer';
import R from '../../res';
import FoodListCategory from '../FoodListCategory';

jest.useFakeTimers();

describe('renders and behave correctly', () => {
  let props = {
    itemIndex: 0,
    item: {
      category: {
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
          {
            items: ['Lean Loin Chop', 'Lean Pork Loin'],
            subCategoryname: 'Pork',
          },
          {
            items: [
              'Chicken',
              'Cornish Game Hen',
              'Emu',
              'Ostrich',
              'Quail',
              'Turkey',
            ],
            subCategoryname: 'Poultry',
          },
        ],
        quote: '',
        protip: '',
        imagePath:
          'https://s3-us-west-2.amazonaws.com/viking.approvedfoodlistimages/protein%403x.png',
        localImagePath: 'protein',
        categoryName: 'Lean Protein',
        colorCode: '#F168A4',
        servingSize: '4 Oz Servings',
      },
    },
    willExpand: false,
    didSelectCategory: jest.fn(),
  };

  const foodListCategory = renderer.create(<FoodListCategory {...props} />);
  const foodListCategoryInst = foodListCategory.root;

  it('renders correctly', () => {
    expect(foodListCategory).toMatchSnapshot();
  });

  it('should have required elements', () => {
    expect(
      foodListCategoryInst.findByProps({testID: R.id.FOOD_LIST_CAT_BTN}),
    ).toBeTruthy();
    expect(
      foodListCategoryInst.findByProps({testID: R.id.FOOD_LIST_CAT_TITLE}),
    ).toBeTruthy();
    expect(
      foodListCategoryInst.findByProps({
        testID: R.id.FOOD_LIST_CAT_SERVING_SIZE,
      }),
    ).toBeTruthy();
  });

  it('expand/collapse category on select', () => {
    act(() => {
      foodListCategoryInst
        .findByProps({testID: R.id.FOOD_LIST_CAT_BTN})
        .props.onPress();
    });
    expect(props.didSelectCategory).toBeCalled();
  });
});
