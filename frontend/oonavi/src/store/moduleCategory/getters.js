export default {
    getListItems: (state) => {
        return state.list_items;
    },
    getItems: (state) => {
        return state.category_items;
    },
    getCategories: (state) => {
        return state.categories;
    },
    getTotalItems: (state) => {
        return state.total_category;
    },
};
