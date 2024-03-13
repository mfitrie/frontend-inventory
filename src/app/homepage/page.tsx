"use client"

import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/store/hooks";
import { changeStatePagination, deleteProduct, getProducts, updateProduct } from "../lib/store/reducer/inventory";
import { ProductType } from "../types/product.type";

export default function HomePage() {
    const products: ProductType[] = useAppSelector(getProducts);
    const dispatch = useAppDispatch();

    const defaultUpdateInput: ProductType = {
        id: "",
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        imagelink: "",
    }
    const [updateInput, setUpdateInput] = useState<ProductType>(defaultUpdateInput);

    // Initialize state for selected option
    const [page, setPage] = useState("1");

    // Event handler to update selected option
    const handleOptionChange = (e: any) => {
        setPage(e.target.value);
        dispatch(changeStatePagination())
    };

    return (
        <div>
            {/* -------------------modal------------------- */}
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
                                type="text"
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
                                type="text"
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
            {/* -------------------modal------------------- */}

            <div className="navbar bg-base-300 flex justify-between">
                <a className="btn btn-ghost text-xl">Inventory System</a>
                <div className="flex gap-2 items-center">
                    <span className="text-base font-bold">John</span>
                    <span className="text-sm">(Admin)</span>
                </div>
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
                        {/* row 1 */}
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
                                        <button
                                            className="btn"
                                            onClick={() => {
                                                setUpdateInput(item);
                                                document.getElementById('my_modal_1').showModal()
                                            }}
                                        >Update</button>
                                        <button className="btn btn-error" onClick={() => dispatch(deleteProduct(item))}>Delete</button>
                                        {/* <button className="btn btn-error opacity-50 cursor-not-allowed">Delete</button> */}
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

            {/* pagination */}
            <div className="container mx-auto px-4 py-7 join flex justify-center">
                {/* Radio buttons */}
                <input
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    value="1"
                    aria-label="1"
                    checked={page === "1"}
                    onChange={handleOptionChange}
                />
                <input
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    value="2"
                    aria-label="2"
                    checked={page === "2"}
                    onChange={handleOptionChange}
                />
                <input
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    value="3"
                    aria-label="3"
                    checked={page === "3"}
                    onChange={handleOptionChange}
                />
                <input
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    value="4"
                    aria-label="4"
                    checked={page === "4"}
                    onChange={handleOptionChange}
                />
            </div>
            {/* pagination */}

        </div>
    )
}