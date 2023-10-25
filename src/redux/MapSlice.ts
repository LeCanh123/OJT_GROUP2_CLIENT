
import { AnyAction, Dispatch, createSlice } from '@reduxjs/toolkit';




const mapSlice = createSlice({
  name: "maps",
  initialState: {
  notification:[],
  total:0
  },
  reducers: {

    setnotification: (state, { payload }) => {//v
      console.log("vào getProductByCategoryslgetProductByCategorysl");
      
      state.notification = payload.data;
      state.total = payload.total;
      // state.search=payload
    },


    // setData: function(state, action) {
           
            
    //     state.id= action.payload.id
    //   },

    // const { cartItems } = useSelector((store:any) => {
    //     return store.cartReducer;
    //   });

  },
});

export const mapAction = {
...mapSlice.actions
}



export default mapSlice.reducer;

