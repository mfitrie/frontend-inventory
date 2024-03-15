"use client"

import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { fetchOneProduct } from '@/app/lib/store/reducer/inventory';
import { AppState } from '@/app/lib/store/store';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';


export default function Product() {
    const product = useAppSelector((state: AppState) => state.inventory.product);
    const path = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(product.name === ""){
            const id = path.split("/")[2];
            dispatch(fetchOneProduct({ id }))
            return;
        }
    })

    return (
        // <div>Route: { path }</div>
        <div className='h-screen '>
            {/* -------------------navbar------------------- */}
            <div className="navbar bg-base-300">
                <a 
                    className="btn btn-ghost text-xl"
                    onClick={ () => {
                        router.push("/inventory")
                    } }
                >Inventory System</a>
            </div>
            {/* -------------------navbar------------------- */}
            <div className='container mx-auto px-4 h-5/6 flex justify-center items-center'>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body items-center flex gap-4">
                        <h2 className="card-title">{ product.name }</h2>
                        <div>
                            <img src={ product.imagelink } alt="product-image" />
                            <div className='mt-2 flex flex-col gap-5'>
                                <p className="text-center">{ product.description }</p>
                                <p>Price: RM { product.price }</p>
                                <p>Quantity: { product.quantity }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}