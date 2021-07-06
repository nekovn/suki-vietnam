//get  error notication
const notification_error = (notification, description) => {
    notification.error({
        message: 'エラーが発生しました。',
        description: description,
    });
}
//get  success notication
const notification_success = (notification, description) => {
    notification.success({
        message: '成功',
        description: description,
    });
}
//get  error notication
const notification_warn = (notification, description) => {
    notification.warn({
        message: 'セキュリティ エラー 。',
        description: description,
    });
}
export {
    notification_error,
    notification_warn,
    notification_success,
}