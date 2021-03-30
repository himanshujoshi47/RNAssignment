import React, {memo, useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {Icon} from 'react-native-elements';
import R from '../res';

interface FoodListHeaderProps {
  didCloseFoodListModal: () => void;
  performSearch: (text: string) => void;
}

const FoodListHeader: React.FC<FoodListHeaderProps> = ({
  didCloseFoodListModal,
  performSearch,
}) => {
  const [searchText, setSearchText] = useState<string>('');

  function onSearch(text: string) {
    let _originalSearchText = text;
    let trimmedText = text.trim();
    if (trimmedText.length === 0) {
      _originalSearchText = trimmedText;
    }
    performSearch(_originalSearchText);
    setSearchText(_originalSearchText);
  }

  return (
    <View>
      <Icon
        name="close"
        color={R.colors.stroke.black}
        size={R.dimensions.dimen_44}
        testID={R.id.CLOSE_FOOD_LIST_MODAL}
        style={localStyles.closeIcon}
        onPress={() => {
          didCloseFoodListModal();
        }}
      />
      <Text testID={R.id.APPROVED_FOOD_LIST_TITLE} style={localStyles.title}>
        {R.strings.APPROVED_FOOD_LIST}
      </Text>
      <View style={localStyles.searchContainer}>
        <Icon
          name={'search'}
          color={R.colors.text.secondary}
          size={R.dimensions.dimen_24}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={searchText}
          onChangeText={queryText => onSearch(queryText)}
          placeholder={R.strings.SEARCH_PLACEHOLDER}
          placeholderTextColor={R.colors.text.secondary}
          testID={R.id.FOOD_LIST_SEARCH_INPUT}
          style={localStyles.searchInput}
        />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  closeIcon: {
    justifyContent: 'flex-start',
    width: R.dimensions.dimen_44,
    height: R.dimensions.dimen_44,
  },
  title: {
    fontSize: R.dimensions.dimen_24,
    marginVertical: R.dimensions.dimen_24,
    fontWeight: '500',
    color: R.colors.text.primary,
  },
  searchContainer: {
    backgroundColor: R.colors.background.whiteSoft,
    padding: R.dimensions.dimen_16,
    marginBottom: R.dimensions.dimen_16,
    borderRadius: R.dimensions.dimen_4,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    color: R.colors.text.primary,
    marginLeft: R.dimensions.dimen_8,
    fontSize: R.dimensions.dimen_18,
    fontWeight: '500',
  },
});

export default memo(FoodListHeader);
