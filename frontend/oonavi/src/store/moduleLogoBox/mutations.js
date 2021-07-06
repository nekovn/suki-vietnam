export default {
  SET_LOGO_BOX(state, data) {
    state.listLogo = data.sort((a, b) => a.place - b.place)
  },
  SET_COUNT_LOGOS(state, data) {
    state.countLogo = data;
  },
  SET_INDEX_PLACE(state, {list}){
    let flag = 1;
    list.forEach((val,index)=>{
      val.place = flag;
      val.id =　flag;
      val.category = 1;
      flag++;
    })
    state.listLogo = list.sort((a, b) => a.place - b.place)
  },
};
