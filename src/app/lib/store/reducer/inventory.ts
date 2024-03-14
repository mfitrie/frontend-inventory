import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store";
import { faker } from "@faker-js/faker";
import { ProductType } from "@/app/types/product.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const fakeProduct: ProductType[] = Array(20).fill(null).map((item) => ({
    id: faker.string.uuid(),
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: +faker.commerce.price(),
    quantity: faker.number.int({ max: 100 }),
    imagelink: faker.image.url(),
}));


// // Todos API
// export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
//     return res?.json();
// });

export const fetchProduct = createAsyncThunk("fetchProduct", async ({ page, pageSize }: any) => {
    const res = await fetch(`${process.env.serverUrl}/api/inventory?page=${page}&pageSize=${pageSize}`);
    return res?.json();
});


export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    products: [],
    totalProduct: 0,
    isLoading: false,
    isError: false
    // data: [],
  },
  reducers: {
    changeStatePagination(state){
        // TODO: do api calling pagination here
        
        const totalData = 50;
        state.products = Array(10).fill(null).map((item) => ({
            id: faker.string.uuid(),
            name: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            price: +faker.commerce.price(),
            quantity: faker.number.int({ max: 100 }),
            imagelink: faker.image.url(),
        }))
    },
    updateProduct(state, action: PayloadAction<ProductType>){
        const { id, ...rest } = action.payload;
        state.products = state.products.map(item => {
            if(item.id === id){
                return {
                    id,
                    ...rest,
                }
            }

            return item;
        });

    },
    deleteProduct(state, action: PayloadAction<Pick<ProductType, "id">>){
        const { id } = action.payload;
        state.products = state.products.filter(item => item.id !== id);
    }
  },
  extraReducers: (builder) => {
    // //------- Todos API
    // builder.addCase(fetchTodos.pending, (state, action) => {
    //     state.isLoading = true;
    //     console.log("pending")
    // })
    // builder.addCase(fetchTodos.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.data = action.payload;
    //     console.log("fulfilled")
    //     console.log("payload: ", action.payload)
    // })
    // builder.addCase(fetchTodos.rejected, (state, action) => {
    //     state.isError = true;
    //     console.log("rejected")
    // })
    // //------- Todos API
    //------- fetch product
    builder.addCase(fetchProduct.pending, (state, action) => {
        // state.isLoading = true;
        console.log("pending")
    })
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
        // state.isLoading = false;
        // state.data = action.payload;
        console.log("fulfilled")
        console.log("payload: ", action.payload)

        state.products = action.payload.products;
        state.totalProduct = action.payload.total;
    })
    builder.addCase(fetchProduct.rejected, (state, action) => {
        // state.isError = true;
        console.log("rejected")
    })
    //------- fetch product
   }
})

export const {
    changeStatePagination,
    updateProduct,
    deleteProduct,
} = inventorySlice.actions;
export const getState = (state: AppState) => state.inventory;
export const getProducts = (state: AppState) => state.inventory.products;
