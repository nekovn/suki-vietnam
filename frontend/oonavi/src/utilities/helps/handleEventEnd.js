async function handleEventEnd(
  e,
  cloneData,
  store,
  state_items,
  state_categories,
  state_id
) {
  const newIndex = e.newIndex;
  const screenX = e.originalEvent.screenX;
  const screenY = e.originalEvent.screenY;
  const eTo = e.to.id ? e.to.id : "category-1";

  const valueNewIndex =
    parseInt(newIndex) === 4 ? parseInt(newIndex) - 1 : parseInt(newIndex) + 1;
  const fromId = parseInt(e.from.id.split("-")[1]);
  const toId = parseInt(eTo.split("-")[1]);


  const elmChildren = e.to.children[valueNewIndex];

  const deletedData = await deleteItem(
      toId,
      store,
      state_items,
      state_categories,
      fromId,
      eTo,
      state_id
  );
  if (deletedData) {
    return deletedData;
  }

  const removedRow = await removeRow(
    toId,
    fromId,
    elmChildren,
    screenX,
    screenY,
    cloneData,
    store,
    state_categories,
    e
  );
  if (removedRow) {
    return removedRow;
  }
  const removedColumn = await removeColumn(
    toId,
    fromId,
    elmChildren,
    store,
    cloneData,
    state_items,
    state_categories
  );
  if (removedColumn) {
    return removedColumn;
  }

}

async function removeColumn(
  toId,
  fromId,
  elmChildren,
  store,
  cloneData,
  state_items,
  state_categories
) {
  if (toId !== fromId && !isNaN(toId)) {
    store.commit("setIsLoading", true);
    const getIndexTitle = searchNewIndexItem(
      elmChildren,
      store,
      cloneData,
      toId
    );
    const data = {
      newData: cloneData.value,
      newIndex: parseInt(getIndexTitle),
      item: state_items,
      toId: toId,
      fromId: fromId,
      category: state_categories,
    };
    const result = await store.dispatch("getItemFromLogo", data);
    const returnObj = returnData(result, store, "movedColumn");
    store.commit("setIsLoading", false);
    return returnObj;
  }
}
async function removeRow(
  toId,
  fromId,
  elmChildren,
  screenX,
  screenY,
  cloneData,
  store,
  state_categories,
  e
) {
  if (toId === fromId && elmChildren && screenX > screenY) {
    store.commit("setIsLoading", true);

    const elmNewTitle = elmChildren.title;
    const searchNewTitle = (element) => element.title === elmNewTitle;
    const setNewIndexTitle = store.getters.getItems.findIndex(searchNewTitle);

    cloneData.value.category = parseInt(toId);

    const searchOddTitle = (element) => element.title === e.item.title;
    const getOddIndexTitle = store.getters.getItems.findIndex(searchOddTitle);
    const getNewIndexTitle =
      parseInt(e.newIndex) === 4
        ? parseInt(setNewIndexTitle) + 1
        : parseInt(setNewIndexTitle);

    const data = {
      newData: cloneData.value,
      newIndex: getNewIndexTitle,
      category: state_categories,
      oddIndex: parseInt(getOddIndexTitle),
    };
    const result = await store.dispatch("getAddedItem", data);
    const returnObj = returnData(result, store, "movedRow");
    store.commit("setIsLoading", false);
    return returnObj;
  }
}
async function deleteItem(
  toId,
  store,
  state_items,
  state_categories,
  fromId,
  eTo,
  state_id
) {
  if (
    eTo === "trash-top" ||
    eTo === "trash-bottom" ||
    eTo === "trash-left" ||
    eTo === "trash-right"
  ) {
    store.commit("setIsLoading", true);

    const searchNewId = (element) => element.id === state_id;
    const setNewIndexId = store.getters.getItems.findIndex(searchNewId);

    const state_items = store.getters.getItems;
    if (setNewIndexId !== -1) {
      state_items.splice(setNewIndexId, 1);
      let flag = 1;
      state_items.forEach((val, index) => {
        if (val.category === fromId) {
          val.place = flag;
          val.category = fromId;
          flag++;
        }
      });
      const arrItem = state_items;
      if (arrItem) {
        const test_list = state_categories.map((category) => ({
          ...category,
          data: arrItem
            .filter((item) => category.id === item.category)
            .sort((a, b) => a.place - b.place)
            .slice(0, 5),
        }));
        const data = {
          category: state_categories,
          item: arrItem,
        };
        store.commit("SET_LIST_ITEM", data);
        store.commit("setIsLoading", false);
        return {
          list: test_list,
          items: arrItem,
          category: state_categories,
          type: "deleteItem",
        };
      }
    }
  }
}

function returnData(result, store, type) {
  if (result.status) {
    return {
      list: store.getters.getListItems,
      items: store.getters.getItems,
      category: store.getters.getCategories,
      type: type,
    };
  } else {
    alert("Error");
    store.commit("setIsLoading", false);
  }
}
function searchNewIndexItem(elmChildren, store, cloneData, toId) {
  if (elmChildren){
    const elmNewTitle = elmChildren.title;
    const searchNewTitle = (element) => element.title === elmNewTitle;
    cloneData.value.category = parseInt(toId);
    return store.getters.getItems.findIndex(searchNewTitle);
  }else{
    return -1
  }

}

export { handleEventEnd };
