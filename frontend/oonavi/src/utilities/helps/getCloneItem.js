function getCloneItem(state_totalLogo,title_item,url_item,image_item,created,modified,cloneData) {
    const data = {
        id: state_totalLogo,
        title: title_item,
        url: url_item,
        place:state_totalLogo,
        image: image_item,
        category:1,
        created: created,
        modified: modified,

    };
    cloneData.value = data
    return data
}
export {
    getCloneItem
}