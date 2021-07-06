import {notification_error, notification_success, notification_warn} from "../composition/useNotification";

async function setHandleSubmit(isLoading, password, confirm_password, notification,
                               username, email, validateEmail, validatePassword,
                               store, message, level, times, code
) {
    isLoading = true

    if (username.value && password.value || email.value || code.value) {
        if (level === 1) {
            if (password.value !== confirm_password.value) {
                notification_error(notification, 'パスワードが確認用パスワードと一致していません。');
                password.value = ""
                confirm_password.value = ""
                isLoading = false
                return;
            }
            const valEmail = validateEmail(email.value)
            const valPass = validatePassword(password.value)
            if (!valEmail) {
                notification_error(notification, '無効なメールアドレス。')
                email.value = ""
                isLoading = false
                return;
            }
            if (!valPass) {
                notification_error(notification, '無効な新パスワード。')
                password.value = ""
                confirm_password.value = ""
                isLoading = false
                return;
            }
            const data = {
                "user_name": username.value,
                "password": password.value,
                "email": email.value
            }
            await store.dispatch("actRegister", data).then((res) => {
                if (res.status) {
                    username.value = ''
                    password.value = ''
                    isLoading = false
                    notification_success(notification, '正常に登録しました。')
                    store.commit("setRegisterModal", false)
                    store.commit("setMobileModal", false)

                } else {
                    if (res.error.user_name) message = (res.error.user_name.user_name || res.error.user_name[0])
                    if (res.error.email) message = (res.error.email.email || res.error.email[0])
                    username.value = ''
                    email.value = ''
                    isLoading = false
                    notification_error(notification, message)
                }

            })
        }
        if (level === 2) {
            const data = {
                "user_name": username.value,
                "password": password.value
            }
            const result = await store.dispatch("actLogin", data);
            if (result.status) {
                username.value = ''
                password.value = ''
                isLoading = false
                notification_success(notification, '正常にログインしました。')
                store.commit("setLoginModal", false)
                store.commit("setMobileModal", false)
            } else {
                const timeOut = setTimeout(() => {
                    if (times.value === 4) {
                        clearTimeout(timeOut)
                        store.commit("setLoginModal", false)
                        store.commit("setMobileModal", false)
                        username.value = ''
                        password.value = ''
                        notification_warn(notification, 'セキュリティ確保のため、一旦ログイン処理を停止させていただきます。')
                        times.value = 0
                    }

                    username.value = ''
                    password.value = ''
                    isLoading = false
                    times.value++;
                    notification_error(notification, 'パスワード又はユーザー名を確認してください。')
                }, 300)
            }
        }
        if (level === 3) {
            await store.dispatch("actResetPassword", email.value).then((res) => {
                if (res.status) {
                    email.value = ''
                    isLoading = false
                    notification_success(notification, 'ご登録されているメールアドレスに、確認メールをお送りしました。メールに記載されているコードをコピーして再設定を進めてください。')
                    store.commit("setCodeModal", true)
                    store.commit("setResetPasswordModal", false)
                    store.commit("setMobileModal", false)

                } else {
                    const timeOut = setTimeout(() => {
                        if (times.value === 4) {
                            clearTimeout(timeOut)
                            email.value = ''
                            store.commit("setResetPasswordModal", false)
                            store.commit("setMobileModal", false)
                            notification_warn(notification, 'セキュリティ確保のため、一旦ログイン処理を停止させていただきます。')
                        }
                        email.value = ''
                        isLoading = false
                        times.value++
                        notification_error(notification, 'そのメールに関連付けられているアカウントが見つかりませんでした。 別のメールアドレスをお試しください。')
                    }, 300)
                }

            })
        }
        if (level === 4) {
            if (password.value !== confirm_password.value) {
                notification_error(notification, 'パスワードが確認用パスワードと一致していません。');
                password.value = ""
                confirm_password.value = ""
                isLoading = false
                return;
            }
            const valPass = validatePassword(password.value)
            if (!valPass) {
                notification_error(notification, '無効な新パスワード。')
                password.value = ""
                confirm_password.value = ""
                isLoading = false
                return;
            }
            const data = {
                "token": code.value,
                "password": password.value,
            }
            await store.dispatch("actSetNewPassword", data).then((res) => {
                if (res.status) {
                    code.value = ''
                    password.value = ''
                    confirm_password.value = ''
                    isLoading = false
                    notification_success(notification, '正常にパースワードをリッセトしました。')
                    store.commit("setLoginModal", true)
                    store.commit("setMobileModal", true)
                    store.commit("setCodeModal", false)
                } else {
                    const timeOut = setTimeout(() => {
                        if (times.value === 4) {
                            clearTimeout(timeOut)
                            store.commit("setCodeModal", false)
                            code.value = ''
                            password.value = ''
                            confirm_password.value = ''
                            notification_warn(notification, 'セキュリティ確保のため、一旦ログイン処理を停止させていただきます。')
                        }
                        code.value = ''
                        isLoading = false
                        times.value++;
                        notification_error(notification, 'コードが正しくありません。再入力してください。')
                    }, 300)
                }
            })
        }
    } else {
        password.value = ''
        confirm_password.value = ''
        isLoading = false
        notification_error(notification, 'データを入力してください。')
    }


}

export {
    setHandleSubmit
}