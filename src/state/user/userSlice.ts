import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
    name: string
}

const initialState: UserState = {
    name: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.name = action.payload
            console.log("login", state.name)
        },
        logout: (state) => {
            state.name = ''
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer