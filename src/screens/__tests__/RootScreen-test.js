import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {Service} from '../../network/service';
import R from '../../res';
import RootScreen from '../RootScreen';

jest.useFakeTimers();

describe('renders and behave correctly', () => {
  const rootScreen = renderer.create(<RootScreen />);
  const rootScreenInst = rootScreen.root;

  it('renders correctly', () => {
    expect(rootScreen).toMatchSnapshot();
  });

  it('should have required elements', () => {
    expect(
      rootScreenInst.findByProps({testID: R.id.APPROVED_FOOD_LIST_BTN}),
    ).toBeTruthy();
  });

  it('should fetch the data on button press', () => {
    act(() => {
      rootScreenInst
        .findByProps({testID: R.id.APPROVED_FOOD_LIST_BTN})
        .props.onPress();
    });
    expect(Service.fetch).toBeCalled();
  });
});
