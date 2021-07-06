import useMapItems from "../../utilities/composition/useMapItems";
import useForEach from "../../utilities/composition/useForEach";
import moveArrayItemToNewIndex from "../../utilities/composition/useSplice";
export default {
  SET_LIST_ITEM(state, { category = [], item = [] }) {
    // const test = category.slice(0,10)
    state.categories = category;
    state.category_items = item;
    state.list_items = useMapItems(state.list_items, category.slice(0,10), item);
  },
  SET_PAGINATION_PAGE(state, data = []) {
    state.list_items = useMapItems(
      state.list_items,
      data,
      state.category_items
    );
  },

  SET_LIST_ADDED_ITEM(
    state,
    { category = [], newData = [], newIndex = 0, oddIndex = 0 }
  ) {
    const arrSelectedData = state.category_items;
    const newArray = moveArrayItemToNewIndex(
      0,
      0,
      arrSelectedData,
      oddIndex,
      newIndex,
      "SET_LIST_ADDED_ITEM"
    );
    const getListItem = useForEach(newArray, newData.category);
    const data = [];
    const getCategory = category ? category : state.categories;
    state.list_items = useMapItems(data, getCategory, getListItem);
    state.category_items = getListItem;
    state.categories = getCategory;
  },

  SET_ITEM_FROM_LOGO(
    state,
    {
      category = [],
      toId = 1,
      fromId = 0,
      item = [],
      newData = [],
      newIndex = 0,
      type = "ItemsInTable",
    }
  ) {
    if (type === "ItemsInTable") {
      item.push(newData);
      set_list_items(item, newIndex, newData, category, toId, fromId);
    }
    if (type === "LogoBox") {
      state.category_items.push(newData);
      const arrSelectedData = state.category_items;
      set_list_items(
        arrSelectedData,
        newIndex,
        newData,
        category,
        toId,
        fromId
      );
    }
    function set_list_items(
      list_data,
      new_index,
      new_data,
      category,
      toId,
      fromId
    ) {
      const newArray = moveArrayItemToNewIndex(
        toId,
        fromId,
        list_data,
        list_data.length - 1,
        new_index,
        "SET_ITEM_FROM_LOGO"
      );
      const getListItem = useForEach(newArray, new_data.category);
      const data = [];
      const getCategory = category ? category : state.categories;
      const list_items = useMapItems(data, getCategory, getListItem);
      if (list_items) {
        state.list_items = list_items;
        state.category_items = getListItem;
        state.categories = getCategory;
      }
    }
  },
  SET_TOTAL_CATEGORY(state, data) {
    state.total_category = data.count;
  },
};
