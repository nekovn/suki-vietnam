import {handleCookies} from '../../utilities/helps/handleCookies'
import axiosInstance from "../../plugins/axios";
import CSRF_TOKEN from "../../plugins/csrf_token";

export default {
    async actLogin({dispatch}, {user_name, password}) {
        try {
            const config = {
                headers: {
                    "content-type": "application/json",
                    "X-CSRFToken": CSRF_TOKEN
                }
            }
            const data = {
                user_name,
                password
            }
            const response = await axiosInstance.post('/user/login/', data, config);
            if (response.status === 200 && response.data) {
                document.cookie = `access_token=${response.data.tokens}`;
                dispatch('actFetchCurrentUser', response.data.tokens)
                return {
                    status: true,
                    is_active: response.data.is_active
                }
            }
        } catch (e) {
            return {
                status: false,
                error: e.message
            }
        }
    },
    async actFetchCurrentUser({commit}, tokens) {
        try {
            const response = await axiosInstance.get('/user/profile/', {
                headers: {
                    Authorization: `JWT ${tokens}`
                }
            });
            if (response.status === 200 && response.data.data) {
                commit('setCurrentUser', {
                    token: tokens,
                    user: response.data.data[0],
                    roles: response.data.data[0].is_staff
                })
                return {
                    status: true
                }
            }
        } catch (e) {
            return {
                status: false,
                error: e.message
            }
        }
    },
    async actRegister({dispatch}, {user_name, password, email}) {

        try {
            const response = await axiosInstance.post('/user/create/', {
                user_name,
                password,
                email,
            });
            if (response.status === 201 && response.data) {
                await dispatch('actLogin', {user_name, password})
                return {
                    status: true,
                }
            }
        } catch (e) {
            if (e.response && e.response.data) {
                return {
                    status: false,
                    error: e.response.data
                }
            }
            return {
                status: false,
                error: e.message
            }
        }
    },

    actLogout({commit}) {
        handleCookies();
        commit('setCurrentUser', {
            token: '',
            user: null
        })

    },
    actResetCurrentUser({commit}) {
        handleCookies();
        commit('setCurrentUser', {
            token: '',
            user: null
        })

    },

    async actUploadAvatar({state, commit}, {
        id,
        user_name,
        file,
    }) {
        try {
            const token = state.token;
            const config = {
                headers: {
                    Authorization: `JWT ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                }
            }
            const formData = new FormData();//upload file thi dung formData de goi api
            formData.append('image', file);
            formData.append('user_name', user_name);

            const resUser = await axiosInstance.put('/user/upload/' + id + '/', formData, config);
            state.currentUser.id = id
            state.currentUser.image = resUser.data.image
            state.currentUser.user_name = resUser.data.user_name
            const user = state.currentUser
            commit('setCurrentUser', {token, user});
            return {
                status: true,
                data: resUser.data.image
            }

        } catch (e) {
            if (e.response) {
                return {
                    status: false,
                    error: e.response.data
                }
            }
            return {
                status: false,
                error: e.message
            }
        }
    },

    async actUpdateProfile({commit, dispatch, state}, {
        id,
        first_name,
        user_name,
        email,
        gender,
        birthday,
    }) {
        try {
            const token = state.token;
            const config = {
                headers: {
                    Authorization: `JWT ${token}`,
                }
            }
            const data = {
                first_name,
                user_name,
                email,
                gender,
                birthday,
            }
            const resUser = await axiosInstance.put('/user/update-profile/' + id + '/', data, config);

            resUser.data.id = id
            const user = resUser.data;

            commit('setCurrentUser', {token, user});
            return {
                status: true,
            }
        } catch (e) {
            if (e.response) {
                return {
                    status: false,
                    error: e.response.data
                }
            }
            return {
                status: false,
                error: e.message
            }
        }

    },
    async actContactForm({commit, dispatch, state}, {
        name,
        email,
        content,
        code
    }) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                }
            }
            const data = {
                'name': name,
                'email': email,
                'message': content,
                'code': code
            }
            const form = new FormData();
            for (const field in data) {
                form.append(field, data[field]);
            }

            const response = await axiosInstance.post('/user/contact/', form, config);
            if (response.status === 200) {
                return {
                    status: true,
                }
            }

        } catch (e) {
            return {
                status: false,
                error: e.message
            }
        }
    },

    async actChangePassword({state}, {new_password, old_password}) {
        try {
            const data = {
                old_password,
                new_password,
            }
            const token = state.token;
            const config = {
                headers: {
                    Authorization: `JWT ${token}`
                }
            }
            const response = await axiosInstance.put('/user/change-password/', data, config);

            if (response.status === 200 && response.data) {
                return {
                    status: true,
                    message: response.data.message
                }
            }

        } catch (e) {
            if (e.response) {
                return {
                    status: false,
                    error: e.response.data
                }
            }
            return {
                status: false,
                error: e.message
            }
        }
    },

    async actResetPassword({state}, data) {
        try {
            const response = await axiosInstance.post('/password_reset/', {email: data});
            if (response.status === 200 && response.data) {
                return {
                    status: true
                }
            }

        } catch (e) {
            if (e.response) {
                return {
                    status: false,
                    error: e.response.data
                }
            }
            return {
                ok: false,
                error: e.message
            }
        }
    },
    async actSetNewPassword({state}, {token, password}) {
        try {
            const data = {
                token,
                password
            }
            const response = await axiosInstance.post('/password_reset/confirm/', data);
            if (response.status === 200 && response.data) {
                return {
                    status: true
                }
            }
        } catch (e) {
            if (e.response) {
                return {
                    ok: false,
                    error: e.response.data
                }
            }
            return {
                ok: false,
                error: e.message
            }
        }
    },

    async actCheckNewPassword({state}, {new_password, confirm_new_password}) {
        try {
            const data = {
                new_password,
                confirm_new_password
            }
            const response = await axiosInstance.put('/users/reset-password', data);
            return {
                ok: true,
                password: response.data.password
            }
        } catch (e) {
            if (e.response) {
                return {
                    ok: false,
                    error: e.response.data
                }
            }
            return {
                ok: false,
                error: e.message
            }
        }
    }
}