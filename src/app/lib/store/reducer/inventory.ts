import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppState } from "../store";
import { faker } from "@faker-js/faker";
import { ProductType } from "@/app/types/product.type";

const fakeProduct: ProductType[] = Array(20).fill(null).map((item) => ({
    id: faker.string.uuid(),
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: +faker.commerce.price(),
    quantity: faker.number.int({ max: 100 }),
    imagelink: faker.image.url(),
}))

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: { 
    products: fakeProduct,
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
  }
})

export const {
    changeStatePagination,
    updateProduct,
    deleteProduct,
} = inventorySlice.actions;
export const getProducts = (state: AppState) => state.inventory.products;
