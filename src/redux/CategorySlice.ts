import { createSlice } from "@reduxjs/toolkit";
import { CategoryType } from "../interface/Category";

const initialState: {
    data: null | undefined | CategoryType[] ,
    itemsPerPage: number,
    currentPage: number
    totalPage: number,
    reload: boolean
} = {
    data: null,
    itemsPerPage: 1,
    currentPage: 1,
    totalPage: 0,
    reload: false
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        addCategory: function (state, action) {
            state.data?.push(action.payload);
        },
        // setDataCategory: function (state, action) {
        //     return {
        //         ...state,
        //         data: action.payload,
        //     };
        // },
        updateCategory: (state, action) => {
            const updatedCategory = action.payload;
            const updatedData = state.data?.map((category) => {
                if (category.id === updatedCategory.id) {
                    return updatedCategory;
                }
                return category;
            });
            state.data = updatedData;
        },
        paginationCategory: (state, action) => {
        return{
            ...state,
            data : action.payload
        }
        },
        reload: (state, action) => {
            return{
                ...state,
                reload : ! state.data
            }
            },
    }
      })

export const categoryAction = {
    ...categorySlice.actions,
};

export const categoryReducer = categorySlice.reducer;
