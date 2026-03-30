import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPost = createAsyncThunk('post/fetchPost', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')

    if (!response.ok) {
        throw new Error('Failed to fetch posts')
    }

    const data = await response.json()
    return data
})

const postSlice = createSlice({
    name: 'post',
    initialState: {items: [], status: 'idle'},
    reducers: {},
    extraReducers: (builder) => {
        // case atau pengkondisian fetchPost sudah diatur disini, jadi tidak perlu lagi diatur di component, cukup dispatch fetchPost saja
        builder.addCase(fetchPost.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.items = action.payload
        })    
        builder.addCase(fetchPost.rejected, (state) => {
            state.status = 'failed'
        })
    }
})

export default postSlice.reducer