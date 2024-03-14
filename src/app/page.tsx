"use client"

import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "./lib/store/hooks";
import { getProducts, loginRequest } from "./lib/store/reducer/inventory";
import { useRouter, usePathname } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const defaultLoginInput = {
    email: "",
    password: "",
  }
  const [inputLogin, setInputLogin] = useState(defaultLoginInput);

  return (
    <div className="container mx-auto px-4 h-screen flex flex-col justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center">
          <h2 className="card-title">Inventory System Login</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>

          <div className="mt-4 flex flex-col gap-3">
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
              <input 
                type="text" 
                className="grow" 
                placeholder="Email" 
                onChange={(e: FormEvent<HTMLInputElement>) => {
                  const newValue = e.currentTarget.value;

                  setInputLogin(prev => ({
                    ...prev,
                    email: newValue,
                  }));
              }}/>
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
              <input 
                type="password" 
                className="grow" 
                placeholder="Password" 
                onChange={(e: FormEvent<HTMLInputElement>) => {
                  const newValue = e.currentTarget.value;

                  setInputLogin(prev => ({
                    ...prev,
                    password: newValue,
                  }));
              }}/>
            </label>
          </div>

          <div className="mt-4 card-actions justify-end">
            <button className="btn btn-primary" onClick={() => {
              dispatch(loginRequest(inputLogin));
              setInputLogin(defaultLoginInput);
              // router.push("/homepage");
            }}>Login</button>
          </div>

        </div>
      </div>
    </div>
  );
}
