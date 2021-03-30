import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import R from '../res';

interface FoodListSubcategoryTitleCellProps {
  title: string;
}

const FoodListSubcategoryTitleCell: React.FC<FoodListSubcategoryTitleCellProps> = ({
  title,
}) => {
  return (
    <View>
      <Text testID={R.id.FOOD_LIST_ITEM_TITLE} style={localStyles.title}>
        {title}
      </Text>
      <View style={localStyles.separator} />
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: R.dimensions.dimen_15,
    marginBottom: R.dimensions.dimen_16,
    fontSize: R.dimensions.dimen_18,
    color: R.colors.text.primary,
  },
  separator: {
    height: R.dimensions.dimen_1,
    backgroundColor: R.colors.background.silver,
  },
});

export default FoodListSubcategoryTitleCell;
