import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store";
import { faker } from "@faker-js/faker";
import { ProductType } from "@/app/types/product.type";
import { stat } from "fs";



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


// export const loginRequest = createAsyncThunk("loginRequest", async ({ email, password }: any) => {
//     const res = await fetch(`${process.env.serverUrl}/api/login`, {
//         method: "POST",
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             email,
//             password,
//         })
//     });
//     return res?.json();
// });

// export const logoutRequest = createAsyncThunk("logoutRequest", async () => {
//     const res = await fetch(`${process.env.serverUrl}/api/logout`);
//     return res?.json();
// });

export const fetchUser = createAsyncThunk("fetchUser", async () => {
    const res = await fetch(`${process.env.serverUrl}/api/user`);
    return res?.json();
});

export const fetchProduct = createAsyncThunk("fetchProduct", async ({ page, pageSize }: any) => {
    const res = await fetch(`${process.env.serverUrl}/api/inventory?page=${page}&pageSize=${pageSize}`);
    return res?.json();
});

export const fetchOneProduct = createAsyncThunk("fetchOneProduct", async ({ id }: any) => {
    const res = await fetch(`${process.env.serverUrl}/api/inventory/${id}`);
    return res?.json();
});

export const addProductRequest = createAsyncThunk("addProductRequest", async (product: ProductType) => {
    const res = await fetch(`${process.env.serverUrl}/api/add-inventory`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...product,
            id: faker.string.uuid(),
        })
    });
    return res?.json();
});

export const updateProductRequest = createAsyncThunk("updateProductRequest", async (product: ProductType) => {
    const res = await fetch(`${process.env.serverUrl}/api/update-inventory`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    return res?.json();
});

export const deleteProductRequest = createAsyncThunk("deleteProduct", async ({ id }: any) => {
    const res = await fetch(`${process.env.serverUrl}/api/delete-inventory/${id}`, {
        method: "DELETE",
    });
    return res?.json();
});


export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    products: [
        {
            id: "",
            name: "",
            description: "",
            price: 0,
            quantity: 0,
            imagelink: "",
        }
    ],
    totalProduct: 0,
    isLoading: false,
    isError: false,
    user: {
        "id": "",
        "name": "",
        "phoneno": "",
        "address": "",
        "email": "",
        "password": "",
        "isadmin": false
    },
    product: {
        id: "",
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        imagelink: "",
    }
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
    sortByNameProductsCurrentPage(state, action: PayloadAction<boolean>){
        const isAscending = action.payload;
        
        state.products.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            if(isAscending){
                if(nameA < nameB) return -1;
                if(nameA > nameB) return 1;

                return 0;
            }else {
                if(nameA > nameB) return -1;
                if(nameA < nameB) return 1;
                
                return 0;
            }
        });

        return state;

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


    // //------- login
    // builder.addCase(loginRequest.pending, (state, action) => {
    //     console.log("loginRequest pending")
    // })
    // builder.addCase(loginRequest.fulfilled, (state, action) => {
    //     console.log("loginRequest fulfilled")
    //     console.log("payload: ", action.payload)

    //     // state.products = action.payload.products;
    //     // state.totalProduct = action.payload.total;
    // })
    // builder.addCase(loginRequest.rejected, (state, action) => {
    //     console.log("loginRequest rejected")
    // })
    // //------- login


    // //------- Logout
    // builder.addCase(logoutRequest.pending, (state, action) => {
    //     console.log("logoutRequest pending")
    // })
    // builder.addCase(logoutRequest.fulfilled, (state, action) => {
    //     console.log("logoutRequest fulfilled")
    //     console.log("payload: ", action.payload)

    //     // state.products = action.payload.products;
    //     // state.totalProduct = action.payload.total;
    // })
    // builder.addCase(logoutRequest.rejected, (state, action) => {
    //     console.log("logoutRequest rejected")
    // })
    // //------- Logout


    //------- fetch user
     builder.addCase(fetchUser.pending, (state, action) => {

     })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
        console.log("payload user: ", action.payload)

        state.user = action.payload;
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
    })
    //------- fetch user


    //------- fetch product
    builder.addCase(fetchProduct.pending, (state, action) => {
    })
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
        console.log("payload: ", action.payload)

        state.products = action.payload.products;
        state.totalProduct = action.payload.total;
    })
    builder.addCase(fetchProduct.rejected, (state, action) => {
    })
    //------- fetch product


    //------- fetch one product
    builder.addCase(fetchOneProduct.pending, (state, action) => {
    })
    builder.addCase(fetchOneProduct.fulfilled, (state, action) => {
        console.log("fetchOneProduct payload: ", action.payload)

        state.product = action.payload[0];

    })
    builder.addCase(fetchOneProduct.rejected, (state, action) => {
    })
    //------- fetch one product


    //------- add product
    builder.addCase(addProductRequest.pending, (state, action) => {
        console.log("addProductRequest pending")
    })
    builder.addCase(addProductRequest.fulfilled, (state, action) => {
        console.log("addProductRequest fulfilled")
        console.log("payload: ", action.payload)

        return {
            ...state,
            totalProduct: state.totalProduct + 1,
        };

    })
    builder.addCase(addProductRequest.rejected, (state, action) => {
        console.log("addProductRequest rejected")
    })
    //------- add product


    //------- update product
    builder.addCase(updateProductRequest.pending, (state, action) => {
        console.log("updateProductRequest pending")
    })
    builder.addCase(updateProductRequest.fulfilled, (state, action) => {
        console.log("updateProductRequest fulfilled")
        console.log("payload: ", action.payload)

        // state.products = action.payload.products;
        // state.totalProduct = action.payload.total;
    })
    builder.addCase(updateProductRequest.rejected, (state, action) => {
        console.log("updateProductRequest rejected")
    })
    //------- update product


    //------- delete product
    builder.addCase(deleteProductRequest.pending, (state, action) => {
        console.log("deleteProductRequest pending")
    })
    builder.addCase(deleteProductRequest.fulfilled, (state, action) => {
        console.log("deleteProductRequest fulfilled")
        console.log("payload: ", action.payload)

        // state.products = action.payload.products;
        // state.totalProduct = action.payload.total;
    })
    builder.addCase(deleteProductRequest.rejected, (state, action) => {
        console.log("deleteProductRequest rejected")
    })
    //------- delete product
   }
})

export const {
    changeStatePagination,
    sortByNameProductsCurrentPage,
    updateProduct,
    deleteProduct,
} = inventorySlice.actions;
export const getState = (state: AppState) => state.inventory;
export const getProducts = (state: AppState) => state.inventory.products;
