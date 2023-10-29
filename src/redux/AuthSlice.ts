import { createSlice } from "@reduxjs/toolkit";
import { AuthUserType } from "../interface/AuthUser";

// const initialState: { data: null | AuthUserType } = {
//     data: null,
// };

const authUserSlice = createSlice({
    name: "authUser",
    initialState:{
        isUser:false
    },
    reducers: {
        // reset: function () {
        //     return { data: null };
        // },
        setAuthUser: function (state, action) {
            console.log("action.payload", action.payload);

            return {
                ...state,
                isUser: action.payload,
            };
        },
    },
});

export const authUserAction = {
    ...authUserSlice.actions,
};

export const authUserReducer = authUserSlice.reducer;
