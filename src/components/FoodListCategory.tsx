import React, {memo, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {CategoryElement} from '../network/models/FoodListModel';
import R from '../res';
import FoodListSubcategory from './FoodListSubcategory';

interface FoodListCategoryProps {
  itemIndex: number;
  item: CategoryElement;
  willExpand: boolean;
  didSelectCategory: (index: number) => void;
}

const FoodListCategory: React.FC<FoodListCategoryProps> = ({
  itemIndex,
  item,
  willExpand,
  didSelectCategory,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(willExpand);

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(willExpand);
  }, [willExpand]);

  function expandItem() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    didSelectCategory?.(itemIndex);
    setIsExpanded(!isExpanded);
  }

  let category = item.category;
  return (
    <View style={localStyles.container}>
      <View style={localStyles.touchableContainer}>
        <TouchableOpacity
          testID={R.id.FOOD_LIST_CAT_BTN}
          activeOpacity={0.9}
          onPress={() => expandItem()}>
          <View style={localStyles.touchableChild}>
            <Image
              source={{uri: category.imagePath}}
              style={[
                localStyles.touchableImage,
                {backgroundColor: category.colorCode},
              ]}
            />
            <View style={localStyles.touchableTextContainer}>
              <Text
                testID={R.id.FOOD_LIST_CAT_TITLE}
                style={[
                  localStyles.touchableText,
                  {color: category.colorCode},
                ]}>
                {category.categoryName}
              </Text>
              {category.servingSize && (
                <Text
                  testID={R.id.FOOD_LIST_CAT_SERVING_SIZE}
                  style={localStyles.touchableText}>
                  {` (${category.servingSize})`}
                </Text>
              )}
            </View>
            <Icon
              name={isExpanded ? 'arrow-drop-up' : 'arrow-drop-down'}
              color={R.colors.stroke.black}
              size={R.dimensions.dimen_24}
            />
          </View>
        </TouchableOpacity>
        {isExpanded && (
          <FoodListSubcategory
            quote={category.quote}
            colorCode={category.colorCode}
            subcategories={category.subcategories}
          />
        )}
      </View>
      {isExpanded && category.protip.length > 0 && (
        <View style={localStyles.protipContainer}>
          <View style={localStyles.tipContainer}>
            <Text style={localStyles.tip}>{R.strings.TIP}</Text>
          </View>
          <Text style={localStyles.tip}>{category.protip}</Text>
        </View>
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    borderRadius: R.dimensions.dimen_8,
    overflow: 'hidden',
  },
  touchableContainer: {
    paddingHorizontal: R.dimensions.dimen_8,
    paddingTop: R.dimensions.dimen_8,
    backgroundColor: R.colors.background.white,
  },
  touchableChild: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: R.dimensions.dimen_8,
  },
  touchableImage: {
    height: R.dimensions.dimen_44,
    width: R.dimensions.dimen_44,
    borderRadius: R.dimensions.dimen_4,
  },
  touchableTextContainer: {
    flex: 1,
    marginHorizontal: R.dimensions.dimen_16,
    flexDirection: 'row',
    fontWeight: '500',
  },
  touchableText: {
    fontWeight: '600',
    fontSize: R.dimensions.dimen_16,
    color: R.colors.text.primary,
  },
  protipContainer: {
    marginTop: R.dimensions.dimen_16,
    padding: R.dimensions.dimen_16,
    backgroundColor: R.colors.background.seaGreen,
    borderRadius: R.dimensions.dimen_8,
  },
  tipContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: R.dimensions.dimen_12,
    backgroundColor: R.colors.background.blue,
    borderRadius: R.dimensions.dimen_8,
    marginBottom: R.dimensions.dimen_8,
  },
  tip: {
    color: R.colors.background.white,
  },
});

export const FoodListItemSeparator = () => {
  return <View style={{height: R.dimensions.dimen_24}} />;
};

export default memo(FoodListCategory);
