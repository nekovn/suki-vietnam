import axiosInstance from "../../plugins/axios";
import CSRF_TOKEN from "../../plugins/csrf_token"

export default {
  async getListLogoBox({ commit }) {
    try {
      const result = await axiosInstance.get("/logo-box");
      if (result.status === 200) {
        commit("SET_LOGO_BOX", result.data);
        commit("SET_COUNT_LOGOS", result.data.length + 1);
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
        error: error.message,
      };
    }
  },
  async changeIndexPlace({ commit },data){
    try {
        commit("SET_INDEX_PLACE", data);
        return {
          status: true,
        }
    } catch (error) {
      return {
        status: false,
        error: error.message,
      };
    }
  },
  async getDataFromGG({ commit}, src) {
    try {
      const data = {'url':src}
      commit("setIsLoading", true);
      const config = {
        headers: {
          "content-type": "application/json",
          "X-CSRFToken": CSRF_TOKEN
        }
      }
      const result = await axiosInstance.post('/image', data, config);
      if (result.status === 202) {
        commit("setIsLoading", false);
        return {
          data: result.data,
          status: true,
        }
      } else {
        commit("setIsLoading", false);
        return {
          status: false,
        };
      }
    } catch (error) {
      commit("setIsLoading", false);
      return {
        status: false,
        error: error.message,
      };
    }

  },



};
