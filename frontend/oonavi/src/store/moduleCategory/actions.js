import axiosInstance from "../../plugins/axios";

export default {
    async getListCategory({ commit }) {
        try {
            commit("setIsLoading", true)
            const category = await axiosInstance.get(`/category`);
            const item = await axiosInstance.get(`/category-item`);
            if (category.status === 200 && item.status === 200) {
                const arr_category = category.data.results;
                const arr_item = item.data;
                const data = {
                    category:arr_category,
                    item:arr_item
                }
                // console.log(arr_category)
                // console.log(data)
                commit("SET_LIST_ITEM", data);
                commit("SET_TOTAL_CATEGORY", category.data);
                commit("setIsLoading", false)
                return {
                    status: true,
                };
            } else {
                return {
                    status: false,
                };
            }
        } catch (error) {
            commit("setIsLoading", false);
            return {
                status: false,
                error: error.message
            };
        }
    },

    async getPaginationPage({ commit },data){
        try {
            commit("setIsLoading",true)
            if(data.length){
                commit("SET_PAGINATION_PAGE",data)
                return {
                    status: true,
                }
            }

        } catch (error) {
            commit("setIsLoading", false);
            return {
                status : false,
                error: error.message
            }
        }
    },
    async getRemovedItem({ commit },data){
        try {
            if(data.item.length && data.category.length){
                commit("SET_LIST_REMOVED_ITEM",data);
                return {
                    status:true
                }
            } else {
                return {
                    status:false
                }
            }
        }catch (error){
            commit("setIsLoading", false);
            return {
                status: false,
                error: error.message
            };
        }
    },

    async getAddedItem({ commit },data){
        try {
            if(data.newData){
                commit("SET_LIST_ADDED_ITEM",data);
                return {
                    status:true
                }
            } else {
                return {
                    status:false
                }
            }
        }catch (error){
            commit("setIsLoading", false);
            console.log("error:",error)
            return {
                status: false,
                error: error.message
            };
        }
    },
    async getItemFromLogo({ commit },data){
        try {
            if(data.newData){
                commit("SET_ITEM_FROM_LOGO",data);
                return {
                    status:true
                }
            } else {
                return {
                    status:false
                }
            }
        }catch (error){
            commit("setIsLoading", false);
            console.log("error:",error)
            return {
                status: false,
                error: error.message
            };
        }
    },

};
