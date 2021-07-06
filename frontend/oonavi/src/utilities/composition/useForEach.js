export default function useForEach(item, category_id) {
  let flag = 1;
  item.forEach((val, index) => {
    if (val.category === category_id) {
      val.place = flag;
      val.category = category_id;
      flag++;
    }
  });
  return item;
}
