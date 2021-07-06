export default function moveArrayItemToNewIndex(
  toId = null,
  fromId = null,
  arr = [],
  old_index,
  new_index,
  type = "SET_LIST_ADDED_ITEM"
) {
  if (type === "SET_LIST_ADDED_ITEM") {
    if (new_index >= arr.length) {
      let k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    if (new_index > old_index) {
      arr.splice(new_index - 1, 0, arr.splice(old_index, 1)[0]);
    } else {
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    }
    return arr;
  }
  if (type === "SET_ITEM_FROM_LOGO") {
    if (new_index >= arr.length) {
      let k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    if (fromId < toId) {
      arr.splice(new_index - 1, 0, arr.splice(old_index, 1)[0]);
    } else {
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    }
    return arr;
  }
}
