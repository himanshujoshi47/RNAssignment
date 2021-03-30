import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Service, Endpoint, IService} from '../network/service';
import R from '../res';
import FoodListModal from './FoodListModal';
import {FoodListModel} from '../network/models/FoodListModel';

interface FoodListData {
  showFoodList: boolean;
  errorMessage: string | null;
  data: FoodListModel | null;
}

const PlayerScreen: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [foodList, setFoodList] = useState<FoodListData>({
    showFoodList: false,
    errorMessage: null,
    data: null,
  });

  const getService = (): IService => {
    return Service;
  };

  const getFoodList = async () => {
    setIsLoading(true);
    let res =
      foodList.data ?? (await getService().fetch(Endpoint.GET_FOOD_LIST));
    setIsLoading(false);
    if (res) {
      setFoodList((prevState: FoodListData) => {
        return {
          ...prevState,
          showFoodList: true,
          data: res,
        };
      });
    } else {
      setFoodList((prevState: FoodListData) => {
        return {
          ...prevState,
          showFoodList: false,
          error: 'Sorry! Cannot fetch food list this time',
        };
      });
    }
  };

  const didCloseFoodListModal = useCallback(() => {
    setFoodList((prevState: FoodListData) => {
      return {
        ...prevState,
        showFoodList: false,
      };
    });
  }, []);

  return (
    <SafeAreaView style={localStyles.safeArea}>
      {foodList.errorMessage && <Text>{foodList.errorMessage}</Text>}
      <View style={localStyles.container}>
        <ActivityIndicator
          testID={R.id.FOOD_LIST_LOADER}
          animating={isLoading}
          hidesWhenStopped={true}
          size="large"
        />
        <Button
          title={R.strings.APPROVED_FOOD_LIST}
          containerStyle={localStyles.containerStyle}
          testID={R.id.APPROVED_FOOD_LIST_BTN}
          onPress={() => getFoodList()}
        />
      </View>
      <FoodListModal
        isVisible={foodList.showFoodList}
        data={foodList.data}
        didCloseFoodListModal={didCloseFoodListModal}
      />
    </SafeAreaView>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: R.dimensions.dimen_24,
  },
  containerStyle: {
    width: '100%',
    justifyContent: 'center',
  },
});

export default PlayerScreen;
