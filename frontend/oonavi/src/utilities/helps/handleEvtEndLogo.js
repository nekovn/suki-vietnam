async function handleEvtEndLogo(e, listLogo, store, cloneData) {
    const fromId = parseInt(e.from.id.split("-")[1]);
    const toId = parseInt(e.to.id.split("-")[1]);
    const toTrash = String(e.to.id)

    const valueNewIndex = parseInt(e.newIndex) + 1;
    const elmChildren = e.to.children[valueNewIndex];

    const removedRow = await removeRow(toId, fromId, listLogo, store);
    if (removedRow) {
        return removedRow;
    }

    const deletedData = await deleteItem(toTrash, listLogo, store);
    if (deletedData) {
        return deletedData;
    }

    const removedColumn = await removeColumn(toId, valueNewIndex, elmChildren, cloneData, e, store);
    if (removedColumn) {
        return removedColumn
    }

    async function removeColumn(toId, valueNewIndex, elmChildren, cloneData, e, store) {
        if (toId && valueNewIndex && elmChildren) {
            store.commit("setIsLoading", true);
            const elmTitle = e.to.children[valueNewIndex].title;
            const searchTitle = (element) => element.title === elmTitle
            const getIndexTitle = store.getters.getItems.findIndex(searchTitle)
            cloneData.category = parseInt(toId)
            const data = {
                newData: cloneData,
                newIndex: parseInt(getIndexTitle) + 1,
                type: 'LogoBox'
            }
            const result = await store.dispatch("getItemFromLogo", data);
            const returnObj = returnData(result, store, "movedColumn");
            store.commit("setIsLoading", false);
            return returnObj;

        }
    }

    async function removeRow(toId, fromId) {
        if (toId === fromId) {
            store.commit("setIsLoading", true);
            const result = await store.dispatch("changeIndexPlace", {list: listLogo});
            const returnObj = returnData(result, store, "movedRow");
            store.commit("setIsLoading", false);
            return returnObj;
        }
    }

    async function deleteItem(toTrash) {
        if (toTrash === "trash-logo-box" || toTrash === "trash-top") {
            store.commit("setIsLoading", true);
            const result = await store.dispatch("changeIndexPlace", {list: listLogo});
            const returnObj = returnData(result, store, "deleteItem");
            store.commit("setIsLoading", false);
            return returnObj;
        }
    }

}

function returnData(result, store, type) {
    if (result.status) {
        return {
            list: store.getters.getListLogo,
            type: type
        };
    } else {
        alert("Error");
    }
}

export {handleEvtEndLogo};