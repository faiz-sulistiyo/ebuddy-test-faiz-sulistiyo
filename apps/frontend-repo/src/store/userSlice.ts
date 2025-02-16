import { Pagination, User } from "@ebuddy/types";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: User
    pagination: Pagination
}

const initialState: UserState = {
    user: {
        name: "",
        email: "",
        totalAverageWeightRatings: 0,
        numberOfRents: 0,
        recentlyActive: 0
    },
    pagination: {
        page: 1,
        limit: 10,
        totalItem: 0
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        resetUser: (state) => {
            state.user = initialState.user
        },
        setPagination: (state, action) => {
            state.pagination = action.payload
        }
    }
});

export const { setUser, resetUser, setPagination } = userSlice.actions;

export default userSlice.reducer;