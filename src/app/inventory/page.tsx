"use client"

import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/store/hooks";
import { changeStatePagination, deleteProduct, getProducts, updateProduct, getState, fetchProduct, deleteProductRequest, updateProductRequest, addProductRequest, fetchUser, fetchOneProduct } from "../lib/store/reducer/inventory";
import { ProductType } from "../types/product.type";
import { useRouter } from 'next/navigation';
import cookies from "js-cookie"


export default function HomePage() {
    const router = useRouter();
    const { user, products, totalProduct } = useAppSelector(getState);
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     const token = cookies.get('access_token');

    //     if (!token) {
    //       router.push("/");
    //       return;
    //     }

    //     dispatch(fetchUser());
    //     dispatch(fetchProduct({ page: 1, pageSize: 10 }));

    // }, []);

    useEffect(() => {
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


    //----- pagination
    // const [page, setPage] = useState("1");
    // const handleOptionChange = (e: any) => {
    //     const page = e.target.value;
    //     setPage(page);
    //     dispatch(fetchProduct({ page, pageSize: 10 }));
    // };

    // Initialize state for the current page
    const [currentPage, setCurrentPage] = useState(1);

    // Function to handle clicking the previous page button
    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => {
            const currentPage = Math.max(prevPage - 1, 1); 
            dispatch(fetchProduct({ page: currentPage, pageSize: 10 }));
            return currentPage;
        });
    };

    // Function to handle clicking the next page button
    const goToNextPage = () => {
        setCurrentPage((prevPage) => {
            const newPrevPage = prevPage + 1
            dispatch(fetchProduct({ page: newPrevPage, pageSize: 10 }));
            return newPrevPage;
        });
    };

    // Function to handle clicking a specific page button
    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber => {
            dispatch(fetchProduct({ page: currentPage, pageSize: 10 }));
            return pageNumber;
        });
    };
    //----- pagination


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
            <div className="navbar bg-base-300">
                <a className="btn btn-ghost text-xl">Inventory System</a>
            </div>
            {/* -------------------navbar------------------- */}

            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <span>Total product: { totalProduct }</span>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        const modal = document?.getElementById('modal_add_product') as HTMLDialogElement | null
                        if (modal) {
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
                            products.map((item: ProductType, index) => (
                                <tr key={index}>
                                    <td
                                        className="cursor-pointer hover:bg-slate-200"
                                        onClick={() => {
                                            dispatch(fetchOneProduct({
                                                id: item.id,
                                            }))
                                            router.push(`/inventory/${item.id}`);
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.imagelink} alt="product-image" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                                {/* <div className="text-sm opacity-50">United States</div> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        className="cursor-pointer hover:bg-slate-200"
                                        onClick={() => {
                                            dispatch(fetchOneProduct({
                                                id: item.id,
                                            }))
                                            router.push(`/inventory/${item.id}`);
                                        }}
                                    >
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
                                                const modal = document?.getElementById('my_modal_1') as HTMLDialogElement | null;
                                                if (modal) {
                                                    modal.showModal();
                                                }
                                            }}
                                        >Update</button>
                                        <button className="btn btn-error" onClick={() => {
                                            dispatch(deleteProductRequest({
                                                id: item.id
                                            }))
                                            dispatch(deleteProduct(item));
                                        }}>Delete</button>
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

            {/* <div className="container mx-auto px-4 py-7 join flex justify-center overflow-x-auto">
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
            </div> */}

            <div className="container mx-auto px-4 py-7 join flex justify-center">
                <button className="join-item btn" onClick={ goToPreviousPage }>«</button>
                <button className="join-item btn" onClick={ () => goToPage(currentPage) }>Page { currentPage }</button>
                <button className="join-item btn" onClick={ goToNextPage }>»</button>
            </div>

            {/* pagination */}

        </div>
    )
}