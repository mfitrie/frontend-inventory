"use client"

import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/store/hooks";
import { changeStatePagination, deleteProduct, getProducts, updateProduct, getState, fetchProduct, deleteProductRequest, updateProductRequest, addProductRequest, logoutRequest, fetchUser } from "../lib/store/reducer/inventory";
import { ProductType } from "../types/product.type";
import { useRouter } from 'next/navigation';
import cookies from "js-cookie"


export default function HomePage() {
    const router = useRouter();
    const { user, products, totalProduct } = useAppSelector(getState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = cookies.get('access_token');
        
        if (!token) {
          router.push("/");
          return;
        }

        dispatch(fetchUser());
        dispatch(fetchProduct({ page: 1, pageSize: 10 }));

    }, []);


    // add product input
    const defaultAddInput: ProductType = {
        id: "",
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        imagelink: "https://loremflickr.com/640/480?lock=2220378856357888",
    }
    const [addProductInput, setAddProductInput] = useState<ProductType>(defaultAddInput);
    // add product input

    // update product
    const defaultUpdateInput: ProductType = {
        id: "",
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        imagelink: "",
    }
    const [updateInput, setUpdateInput] = useState<ProductType>(defaultUpdateInput);
    // update product

    // useEffect(() => {
    //     console.log(addProductInput);
    // }, [addProductInput]);


    const [page, setPage] = useState("1");
    const handleOptionChange = (e: any) => {
        const page = e.target.value;
        setPage(page);
        dispatch(fetchProduct({ page, pageSize: 10 }));
    };

    return (
        <div>
            {/* -------------------modal add product------------------- */}
            <dialog id="modal_add_product" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Product</h3>
                    <div className="py-5 flex flex-col items-center gap-2">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Product name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                value={addProductInput.name}
                                onChange={(e: FormEvent<HTMLInputElement>) => {
                                    const newValue = e.currentTarget.value;
                                    setAddProductInput(prev => ({
                                        ...prev,
                                        name: newValue,
                                    }))
                                }}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Description</span>
                            </div>
                            <textarea
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                value={addProductInput.description}
                                onChange={(e: FormEvent<HTMLTextAreaElement>) => {
                                    const newValue = e.currentTarget.value;
                                    setAddProductInput(prev => ({
                                        ...prev,
                                        description: newValue,
                                    }))
                                }}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input
                                type="number"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                value={addProductInput.price}
                                onChange={(e: FormEvent<HTMLInputElement>) => {
                                    const newValue = e.currentTarget.value;
                                    setAddProductInput(prev => ({
                                        ...prev,
                                        price: +newValue,
                                    }))
                                }}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Quantity</span>
                            </div>
                            <input
                                type="number"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                value={addProductInput.quantity}
                                onChange={(e: FormEvent<HTMLInputElement>) => {
                                    const newValue = e.currentTarget.value;
                                    setAddProductInput(prev => ({
                                        ...prev,
                                        quantity: +newValue,
                                    }))
                                }}
                            />
                        </label>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className="flex gap-5">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setAddProductInput(prev => ({
                                            ...prev,
                                        }));

                                        dispatch(addProductRequest(addProductInput));

                                        setAddProductInput(defaultAddInput);
                                    }}
                                >Add</button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setAddProductInput(defaultAddInput);
                                    }}
                                >Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* -------------------modal add product------------------- */}
            

            {/* -------------------modal update------------------- */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update {updateInput.name}</h3>
                    <div className="py-5 flex flex-col items-center gap-2">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Product name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                value={updateInput.name}
                                onChange={(e: FormEvent<HTMLInputElement>) => {
                                    const newValue = e.currentTarget.value;
                                    setUpdateInput(prev => ({
                                        ...prev,
                                        name: newValue,
                                    }))
                                }}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Description</span>
                            </div>
                            <textarea
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                value={updateInput.description}
                                onChange={(e: FormEvent<HTMLTextAreaElement>) => {
                                    const newValue = e.currentTarget.value;
                                    setUpdateInput(prev => ({
                                        ...prev,
                                        description: newValue,
                                    }))
                                }}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input
                                type="number"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                value={updateInput.price}
                                onChange={(e: FormEvent<HTMLInputElement>) => {
                                    const newValue = e.currentTarget.value;
                                    setUpdateInput(prev => ({
                                        ...prev,
                                        price: +newValue,
                                    }))
                                }}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Quantity</span>
                            </div>
                            <input
                                type="number"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                value={updateInput.quantity}
                                onChange={(e: FormEvent<HTMLInputElement>) => {
                                    const newValue = e.currentTarget.value;
                                    setUpdateInput(prev => ({
                                        ...prev,
                                        quantity: +newValue,
                                    }))
                                }}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Image link</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                value={updateInput.imagelink}
                                onChange={(e: FormEvent<HTMLInputElement>) => {
                                    const newValue = e.currentTarget.value;
                                    setUpdateInput(prev => ({
                                        ...prev,
                                        imagelink: newValue,
                                    }))
                                }}
                            />
                        </label>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div className="flex gap-5">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        dispatch(updateProductRequest(updateInput));
                                        dispatch(updateProduct(updateInput));
                                        setUpdateInput(defaultUpdateInput);
                                    }}
                                >Update</button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setUpdateInput(defaultUpdateInput);
                                    }}
                                >Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* -------------------modal update------------------- */}

            {/* -------------------navbar------------------- */}
            <div className="navbar bg-base-300 flex justify-between">
                <a className="btn btn-ghost text-xl">Inventory System</a>
                <div className="flex flex-row gap-7">
                    <div className="flex gap-2 items-center">
                        <span className="text-base font-bold">{ user?.name }</span>
                        <span className="text-sm">{ user?.isadmin ? `(Admin)` : `(Guest)`}</span>
                    </div>
                    <button 
                        className="btn btn-error"
                        onClick={() => {
                            // dispatch(logoutRequest());
                            cookies.remove("access_token");
                            router.push("/");
                        }}
                    >Logout</button>
                </div>
            </div>
            {/* -------------------navbar------------------- */}

            <div className="container mx-auto px-4 py-4 text-right">
                <button 
                    className="btn btn-primary"
                    onClick={() => {
                        const modal = document?.getElementById('modal_add_product')
                        if(modal){
                            modal.showModal();
                        }
                    }}
                >Add Product</button>
            </div>

            <div className="container mx-auto px-4 overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.imagelink} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                                {/* <div className="text-sm opacity-50">United States</div> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.description}
                                        {/* <br />
                                        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                    </td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td className="flex gap-5">
                                        {
                                            user?.isadmin ? (
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        setUpdateInput(item);
                                                        const modal = document?.getElementById('my_modal_1');
                                                        if(modal){
                                                            modal.showModal();
                                                        }
                                                    }}
                                                >Update</button>

                                            )
                                            :
                                            (
                                                <button className="btn opacity-50 cursor-not-allowed">Delete</button>
                                            )
                                        }
                                        {
                                            user?.isadmin ? (
                                                <button className="btn btn-error" onClick={() => {
                                                    dispatch(deleteProductRequest({
                                                        id: item.id
                                                    }))
                                                    dispatch(deleteProduct(item));
                                                }}>Delete</button>

                                            )
                                            :
                                            (
                                                <button className="btn btn-error opacity-50 cursor-not-allowed">Delete</button>
                                            )
                                        }
                                    </td>
                                    {/* <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th> */}
                                </tr>
                            ))
                        }
                    </tbody>
                    {/* foot
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot> */}

                </table>
            </div>

            {/* <span>{Math.round(totalProduct / 10)}</span> */}
            {/* pagination */}
            <div className="container mx-auto px-4 py-7 join flex justify-center overflow-x-auto">
                {/* Radio buttons */}
                {
                    Array(Math.round(totalProduct / 10)).fill(null).map((item, index) => (
                        <input
                            key={ index }
                            className="join-item btn btn-square"
                            type="radio"
                            name="options"
                            value={ (index + 1) + "" }
                            aria-label={ (index + 1) + "" }
                            checked={page === (index + 1) + ""}
                            onChange={handleOptionChange}
                        />
                    ))
                }
            </div>
            {/* pagination */}

        </div>
    )
}