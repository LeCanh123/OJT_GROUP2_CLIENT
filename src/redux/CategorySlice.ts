import { createSlice } from "@reduxjs/toolkit";
import { CategoryType } from "../interface/Category";

const initialState: { data: null | undefined | CategoryType[] } = {
    data: null,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        addCategory: function (state, action) {
            state.data?.push(action.payload);
        },
        setDataCategory: function (state, action) {
            return {
                ...state,
                data: action.payload,
            };
        },
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
    },
});

export const categoryAction = {
    ...categorySlice.actions,
};

export const categoryReducer = categorySlice.reducer;
