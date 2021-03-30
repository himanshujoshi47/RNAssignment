import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Modal, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FoodListCategory, {
  FoodListItemSeparator,
} from '../components/FoodListCategory';
import FoodListHeader from '../components/FoodListHeader';
import R from '../res';
import {CategoryElement, FoodListModel} from '../network/models/FoodListModel';
import {default as lodash} from 'lodash';
import CategoryListOperation from '../core-js/CategoryListOperation';

interface FoodListModalProps {
  isVisible: boolean;
  data: FoodListModel | null;
  didCloseFoodListModal: () => void;
}

const FoodListModal: React.FC<FoodListModalProps> = ({
  isVisible,
  data,
  didCloseFoodListModal,
}) => {
  const expandedCategoriesIndex = useRef(new Set<number>());
  const originalDatasource = useRef<CategoryElement[]>([]);
  const [datasource, setDatasource] = useState<CategoryElement[]>([]);
  const isSearching = useRef<boolean>(false);

  useEffect(() => {
    if (data?.categories) {
      reloadDatasource(data.categories);
    }
  }, [data]);

  const reloadDatasource = (categories: CategoryElement[]) => {
    originalDatasource.current = lodash.cloneDeep(categories);
    setDatasource(categories);
  };

  function isCategoryExpanded(index: number) {
    let currentExpandedCategoriesIndex = expandedCategoriesIndex.current;
    return currentExpandedCategoriesIndex.has(index);
  }

  function addDeleteExpandedCategoriesIndex(index: number) {
    let currentExpandedCategoriesIndex = expandedCategoriesIndex.current;
    if (isCategoryExpanded(index)) {
      currentExpandedCategoriesIndex.delete(index);
    } else {
      currentExpandedCategoriesIndex.add(index);
    }
  }

  const refreshDatasource = (searchQuery: string) => {
    let refreshedDatasource = CategoryListOperation.refreshCategories(
      originalDatasource.current,
      searchQuery,
    );
    isSearching.current = searchQuery.length > 0;
    setDatasource(refreshedDatasource);
  };

  function renderHeader() {
    return (
      <FoodListHeader
        didCloseFoodListModal={didCloseFoodListModal}
        performSearch={refreshDatasource}
      />
    );
  }

  return (
    <Modal visible={isVisible} animationType={'slide'}>
      <SafeAreaView style={localStyles.safeArea}>
        <View style={localStyles.container}>
          {datasource && (
            <FlatList
              ListHeaderComponent={renderHeader()}
              showsVerticalScrollIndicator={false}
              keyExtractor={(_, index) => `category-key-${index}`}
              data={datasource}
              renderItem={({item, index}) => {
                return (
                  <FoodListCategory
                    key={`category-${index}`}
                    itemIndex={index}
                    item={item}
                    willExpand={
                      isSearching.current
                        ? isSearching.current
                        : isCategoryExpanded(index)
                    }
                    didSelectCategory={idx => {
                      addDeleteExpandedCategoriesIndex(idx);
                    }}
                  />
                );
              }}
              ItemSeparatorComponent={() => <FoodListItemSeparator />}
            />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: R.colors.background.silver,
  },
  container: {
    width: '100%',
    height: '100%',
    padding: R.dimensions.dimen_24,
  },
  closeIcon: {
    justifyContent: 'flex-start',
    width: R.dimensions.dimen_44,
    height: R.dimensions.dimen_44,
  },
});

export default FoodListModal;
