/* eslint-disable react/prop-types */
import { useState } from "react";
import { useShowOptions } from "../hooks";
import { BiPencil, BiCheck } from "react-icons/bi";
import { useRef } from "react";

function OrderDetails({ item }) {
  const { show, handleChange } = useShowOptions();

  const [editing, setEditing] = useState(false);

  const [orders, setOrders] = useState(item.orders);

  const [amount, setAmount] = useState(item.amount);

  const [placedOn, setPlacedOn] = useState(item.placedOn);

  const orderRef = useRef();

  const amountRef = useRef();

  const placedOnRef = useRef();

  const startEditing = () => {
    handleChange();
    setEditing(() => true);
  };

  const stopEditing = () => {
    setOrders(() => orderRef.current.value);
    setAmount(() => amountRef.current.value);
    setPlacedOn(() => placedOnRef.current.value);
    setEditing(() => false);
  };

  return (
    <>
      <div className="flex items-center">
        <input type="radio" />
        <img
          src={item.image}
          alt="product image"
          className="w-[12%] h-7 mx-3 rounded-lg"
        />
        <div className="flex flex-col justify-center">
          <h5 className="text-md font-semi-bold">{item.title}</h5>
          <small className="text-xs text-gray-400">{item.description}</small>
        </div>
      </div>

      <div className="justify-self-center mr-7 text-sm text-slate-500 font-medium">
        {editing ? (
          <input
            type="text"
            defaultValue={orders}
            className="w-2/3 p-1 pl-3 text-right border rounded-md justify-self-center"
            ref={orderRef}
          />
        ) : (
          orders
        )}
      </div>

      <div className="justify-self-center mr-7 text-sm text-slate-500 font-medium">
        {editing ? (
          <input
            type="text"
            defaultValue={amount}
            className="w-2/3 p-1 pl-3 text-right border rounded-md"
            ref={amountRef}
          />
        ) : (
          amount
        )}
      </div>

      <div className="justify-self-center mr-7 text-sm text-slate-500 font-medium">
        {editing ? (
          <input
            type="text"
            defaultValue={placedOn}
            className="w-2/3 p-1 pl-3 text-right border rounded-md"
            ref={placedOnRef}
          />
        ) : (
          placedOn
        )}
      </div>

      <div className="relative justify-self-center mr-3">
        {editing ? (
          <div
            className="flex text-sm text-green-600 hover:border hover:p-1 hover:cursor-pointer rounded-md"
            onClick={stopEditing}
          >
            <BiCheck className="mr-px text-base" />
            Done
          </div>
        ) : (
          <img
            src="/option-icon.svg"
            className="w-3.5 hover:cursor-pointer"
            onClick={handleChange}
          />
        )}
        <div
          className={`px-2.5 py-2 flex absolute right-full text-sm bg-white rounded-md shadow-lg hover:cursor-pointer ${
            show ? "" : "hidden"
          }`}
          onClick={startEditing}
        >
          <BiPencil className="mr-1 mt-0.5 text-blue" />
          Edit
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
