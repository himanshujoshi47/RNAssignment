import {CategoryElement} from '../network/models/FoodListModel';
import {default as lodash} from 'lodash';

class CategoryListOperation {
  private static _instance = new CategoryListOperation();
  private constructor() {}
  static get instance() {
    return this._instance;
  }

  refreshCategories(categories: CategoryElement[], searchText: string) {
    const searchQueryLowerCased: string = searchText.toLowerCase();

    if (searchQueryLowerCased.length > 0) {
      const tempDatasource = lodash.cloneDeep(categories);
      let filteredDatasource: CategoryElement[] = [];

      const filteredCategories = this.filterCategories(
        tempDatasource,
        searchQueryLowerCased,
      );

      let nextFilteredCategories = this.removeCategoriesWhichAreFiltered(
        tempDatasource,
        filteredCategories,
      );

      const filteredSubCategories = this.filterSubcategories(
        nextFilteredCategories,
        searchQueryLowerCased,
      );

      nextFilteredCategories = this.removeSubcategoriesWhichAreFiltered(
        nextFilteredCategories,
        filteredSubCategories,
      );

      const filteredSubCategoryNames = this.filteredSubcategoryNames(
        nextFilteredCategories,
        searchQueryLowerCased,
      );

      filteredDatasource = [...filteredDatasource, ...filteredCategories];
      filteredDatasource = [...filteredDatasource, ...filteredSubCategories];
      filteredDatasource = [...filteredDatasource, ...filteredSubCategoryNames];

      return filteredDatasource;
    } else {
      return categories;
    }
  }

  /**
   * Filter the category names based on the search text
   * @param  {CategoryElement[]} categories
   * @param  {string} searchText
   * @returns CategoryElement
   */
  private filterCategories(
    categories: CategoryElement[],
    searchText: string,
  ): CategoryElement[] {
    let searchTextLC = searchText.toLowerCase();
    return categories.filter(ele => {
      const category = ele.category;
      return category.categoryName.toLowerCase().includes(searchTextLC);
    });
  }

  /**
   * Removes the already filtered categories based on category name
   * from original categories
   * @param  {CategoryElement[]} categories
   * @param  {CategoryElement[]} filteredCategories
   * @returns CategoryElement
   */
  private removeCategoriesWhichAreFiltered(
    categories: CategoryElement[],
    filteredCategories: CategoryElement[],
  ): CategoryElement[] {
    return categories.filter(ele => {
      return !filteredCategories.includes(ele);
    });
  }

  /**
   * Filter SubCategories based on the subcategory name from original categories
   * @param  {CategoryElement[]} categories
   * @param  {string} searchText
   * @returns CategoryElement
   */
  private filterSubcategories(
    categories: CategoryElement[],
    searchText: string,
  ): CategoryElement[] {
    let searchTextLC = searchText.toLowerCase();
    return categories.filter(ele => {
      const category = ele.category;
      return (
        category.subcategories.filter(subCat => {
          const subCategoryname = subCat.subCategoryname;
          return subCategoryname.toLowerCase().includes(searchTextLC);
        }).length > 0
      );
    });
  }

  /**
   * Removes the already filtered subcategories based on subcategory name
   * from original categories
   * @param  {CategoryElement[]} categories
   * @param  {CategoryElement[]} filteredSubCategories
   * @returns CategoryElement
   */
  private removeSubcategoriesWhichAreFiltered(
    categories: CategoryElement[],
    filteredSubCategories: CategoryElement[],
  ): CategoryElement[] {
    return categories.filter(ele => {
      return !filteredSubCategories.includes(ele);
    });
  }

  /**
   * Filter items in subcategories based on the searchtext and
   * updates the subcategories array in categories
   * @param  {CategoryElement[]} categories
   * @param  {string} searchText
   * @returns CategoryElement
   */
  private filteredSubcategoryNames(
    categories: CategoryElement[],
    searchText: string,
  ): CategoryElement[] {
    let searchTextLC = searchText.toLowerCase();
    return categories.filter(ele => {
      let subCategories = ele.category.subcategories.filter(subCat => {
        let items = subCat.items.filter(item => {
          return item.toLowerCase().includes(searchTextLC);
        });
        subCat.items = items;
        return items.length > 0;
      });
      ele.category.subcategories = subCategories;
      return subCategories.length > 0;
    });
  }
}

export default CategoryListOperation.instance;
