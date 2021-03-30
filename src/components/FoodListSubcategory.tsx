import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Subcategory} from '../network/models/FoodListModel';
import R from '../res';
import FoodListSubcategoryTitleCell from './FoodListSubcategoryTitleCell';

interface FoodListSubcategoryProps {
  quote: string;
  colorCode: string;
  subcategories: Subcategory[];
}

const FoodListSubcategory: React.FC<FoodListSubcategoryProps> = ({
  quote,
  colorCode,
  subcategories,
}) => {
  return (
    <View
      style={{
        paddingHorizontal: R.dimensions.dimen_4,
        paddingTop: R.dimensions.dimen_4,
      }}>
      {subcategories &&
        subcategories.map((item, index) => {
          return (
            <View key={`subcat-title-${index}`}>
              {item.subCategoryname.length > 0 && (
                <Text
                  testID={R.id.FOOD_LIST_SUBCAT_TITLE}
                  style={[localStyles.subCatName, {color: colorCode}]}>
                  {item.subCategoryname.toUpperCase()}
                </Text>
              )}
              <View>
                {item.items &&
                  item.items.map((subCat, subCatIndex) => {
                    return (
                      <FoodListSubcategoryTitleCell
                        key={`subcat-title-${index}-subcat-name-${subCatIndex}`}
                        title={subCat}
                      />
                    );
                  })}
                {quote.length > 0 && (
                  <View style={localStyles.quoteViewContainer}>
                    <Text style={localStyles.quoteText}>{quote}</Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
    </View>
  );
};

const localStyles = StyleSheet.create({
  subCatName: {
    fontWeight: 'bold',
    fontSize: R.dimensions.dimen_18,
    marginTop: R.dimensions.dimen_24,
    marginBottom: R.dimensions.dimen_15,
    color: R.colors.text.primary,
  },
  quoteViewContainer: {
    marginVertical: R.dimensions.dimen_8,
    padding: R.dimensions.dimen_8,
  },
  quoteText: {
    paddingVertical: R.dimensions.dimen_20,
    paddingHorizontal: R.dimensions.dimen_8,
    textAlign: 'center',
    fontSize: R.dimensions.dimen_12,
    backgroundColor: R.colors.background.green,
    borderRadius: R.dimensions.dimen_8,
    overflow: 'hidden',
    fontWeight: '300',
    color: R.colors.text.primary,
  },
});

export default FoodListSubcategory;
