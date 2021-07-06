async function getUrlFromGG(evt, state_items, state_categories = [], store, type = 'ItemsInTable') {
    evt.stopPropagation();
    evt.preventDefault();
    const getUrl = evt.dataTransfer.getData("URL");
    if (getUrl) {
        // const start = new Date().getTime();
        let id_item = state_items.length + 1
        const getTitle = evt.dataTransfer.getData("text/html");
        const title_sub = getTitle.match(/(?!>)([^><]+)(?=<\/div>)/g) ? getTitle.match(/(?!>)([^><]+)(?=<\/div>)/g)[0] : ''
        const title = getTitle.match(/(?!>)([^><]+)(?=<\/h3>)/g) ? getTitle.match(/(?!>)([^><]+)(?=<\/h3>)/g)[0] : title_sub
        const result = await store.dispatch("getDataFromGG", getUrl);
        const pathname = new URL(getUrl).pathname;
        const host_name = getUrl.replace(pathname, "")
        const element =  handleElement(evt, store, type)
        const category_id = element ?  element.category_id : 0
        const getIndexTitle = element ? element.getIndexTitle : 1
        const obj_logo = {
            open: true,
            id: id_item,
            place: id_item,
            title: title,
            url: host_name,
        }
        const obj_items = {
            id: id_item,
            title: title,
            url: host_name,
            place: 1,
            category: parseInt(category_id),
        }
        if (result.status) {
            const data = result.data
            const arr_image = [];
            for (let i = 0; i <= data.length; i++) {
                if (data[i]) {
                    const img_src = host_name + data[i]
                    const get_img = img_src.replace('//', '/')
                    const getImg = (data[i].startsWith('https') || data[i].startsWith('http'))
                        ? data[i]
                        : get_img;
                    arr_image.push(getImg)
                }
            }
            if (arr_image) {
                if (type === 'LogoBox') {
                    obj_logo.image = arr_image
                    return obj_logo
                } else {
                    obj_items.image = arr_image
                    return {
                        newData: obj_items,
                        data: {
                            newIndex: parseInt(getIndexTitle) + 1,
                            item: state_items,
                            category: state_categories,
                        }

                    }

                }

            }

        } else {
            if (type === 'LogoBox') {
                obj_logo.image = ''
                return obj_logo
            } else {
                obj_items.image = ''
                return {
                    newData: obj_items,
                    data: {
                        newIndex: parseInt(getIndexTitle) + 1,
                        item: state_items,
                        category: state_categories,
                    }

                }
            }

        }
    }
}

function handleElement(evt, store, type) {
    if (type === 'ItemsInTable') {
        const elm = evt.toElement.parentElement
        const elmNewTitle = evt.toElement.getAttribute('title')
        const category_id = elm.getAttribute("id").split("-")[1];
        const searchNewTitle = (element) => element.title === elmNewTitle
        const getIndexTitle = store.getters.getItems.findIndex(searchNewTitle)

        return {category_id, getIndexTitle}
    }


}

export {
    getUrlFromGG
}



