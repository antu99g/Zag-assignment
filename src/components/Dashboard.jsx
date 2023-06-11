import { useEffect, useState } from "react";
import { items as itemData } from "../../data";
import { OrderDetails } from "./index";
import { useShowOptions } from "../hooks";

function Dashboard() {
  const orderStatusList = [
    { status: "confirmed", title: "Confirmed" },
    { status: "delivered", title: "Delivered" },
    { status: "refunded", title: "Refund Completed (30d)" },
    { status: "pending", title: "Pending" },
  ];

  const [activeStatus, setActiveStatus] = useState("confirmed");

  const [items, setItems] = useState(() => {
    if (itemData && itemData.length > 0) {
      let data;
      if (activeStatus) {
        data = itemData.filter((item) => item.status === activeStatus);
      } else {
        data = itemData;
      }
      return data;
    } else {
      return [];
    }
  });

  const { show: showOrderStatus, handleChange: handleShowOrders } =
    useShowOptions();

  const { show: showSortPrice, handleChange: handleSortPrice } =
    useShowOptions();

  const { show: showSortDate, handleChange: handleSortDate } = useShowOptions();

  useEffect(() => {
    setItems(() => {
      const filteredItems = itemData.filter(
        (item) => item.status === activeStatus
      );
      return filteredItems;
    });
  }, [activeStatus]);

  const handleChangeStatus = (newStatus) => {
    setActiveStatus(() => newStatus);
    handleShowOrders();
  };

  const sortPricesAscending = () => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => a.amount - b.amount);
    setItems(() => sortedItems);
  };

  const sortPricesDescending = () => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => b.amount - a.amount);
    setItems(() => sortedItems);
  };

  const convertDatesToSort = (items) => {
    const convertedDates = items.map((item) => {
      let cloneItem = { ...item };
      let [day, month, year] = cloneItem.placedOn.split("/");
      cloneItem.placedOn = new Date(
        `20${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
      );
      return cloneItem;
    });
    return convertedDates;
  };

  const structureDates = (items) => {
    const convertedDates = items.map((item) => {
      let cloneItem = { ...item };
      let date = cloneItem.placedOn;
      cloneItem.placedOn = `${date.getDate()}/${date.getMonth() + 1}/${date
        .getFullYear()
        .toString()
        .slice(-2)}`;
      return cloneItem;
    });
    return convertedDates;
  };

  const sortDatesAscending = () => {
    const sortedItems = convertDatesToSort([...items]);
    sortedItems.sort((a, b) => a.placedOn - b.placedOn);
    let updatedItems = structureDates(sortedItems);
    setItems(() => updatedItems);
  };

  const sortDatesDescending = () => {
    const sortedItems = convertDatesToSort([...items]);
    sortedItems.sort((a, b) => b.placedOn - a.placedOn);
    let updatedItems = structureDates(sortedItems);
    setItems(() => updatedItems);
  };

  return (
    <div className="h-full grow p-5 overflow-y-auto">
      <div className="flex justify-between">
        <h2 className="font-bold text-lg">Orders</h2>
        <button className="px-3 py-1 flex items-center bg-blue-btn text-white text-md rounded-md">
          <img src="/plus-white.svg" alt="Add" className="w-2.5 mr-1" />
          Add Order
        </button>
      </div>

      <hr className="my-5 border-t-2 border-gray-200" />

      <div className="w-full mb-4 p-3 bg-white rounded-lg">
        <div className="flex items-center justify-between">
          <h5 className="text-md font-medium">Confirmed</h5>
          <span className="ml-2 mb-[-2px] font-semi-bold text-md text-gray-400">
            258
          </span>
          {/* Dummy - to be changed */}
          <div className="h-6 w-6 ml-auto grid place-content-center bg-grey rounded-full">
            <img src="/minus-black.png" alt="Add" className="w-2.5" />
          </div>
        </div>

        <hr className="mt-2.5 mb-3 border-t-2 border-gray-100" />

        <div className="grid grid-cols-custom-grid gap-x-1.5 gap-y-3.5 items-center">
          <div className="flex items-start">
            <img src="/search-icon.png" alt="search" className="w-3 mr-2" />
            <span className="mt-[-1px] text-[0.65rem] font-medium text-gray-500">
              Search
            </span>
          </div>

          <div className="relative">
            <div className="flex">
              <span
                className="w-4/5 px-3 pt-1.5 pb-1 flex justify-between items-center bg-slate-100 rounded-md hover:cursor-pointer"
                onClick={handleShowOrders}
              >
                <span className="text-[0.5rem] lg:text-[0.58rem] text-slate-500 font-semi-bold">
                  ACTIVE ORDERS
                </span>
                <img
                  src="/down-arrow-thin.svg"
                  alt="dropdown"
                  className="w-2 h-2.5"
                />
              </span>
              <span className="ml-2 flex flex-col justify-center">
                <img
                  src="/up-arrow-solid.svg"
                  alt="ascending"
                  className="w-1.2 mb-px hover:cursor-pointer"
                />
                <img
                  src="/down-arrow-solid.svg"
                  alt="discending"
                  className="w-1.2 mt-px hover:cursor-pointer"
                />
              </span>
            </div>

            <ul
              className={`w-max px-3 py-1.5 absolute top-full right-20p list-none flex flex-col text-md bg-white rounded-lg shadow-lg ${
                showOrderStatus ? "" : "hidden"
              }`}
            >
              {orderStatusList.map((order) => {
                return (
                  <li
                    className="py-1 flex items-center hover:cursor-pointer"
                    onClick={() => handleChangeStatus(order.status)}
                    key={order.status}
                  >
                    <span
                      className={`mr-2 rounded-full ${
                        activeStatus === order.status
                          ? "h-3 w-3 bg-slate-600"
                          : "h-3.5 w-3.5 border-2"
                      }`}
                    />
                    {order.title}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative">
            <div className="flex">
              <span
                className="w-4/5 px-3 pt-1.5 pb-1 flex justify-between items-center bg-slate-100 rounded-md hover:cursor-pointer"
                onClick={handleSortPrice}
              >
                <span className="text-xs text-slate-500 font-semi-bold">
                  Amount
                </span>
                <img
                  src="/down-arrow-thin.svg"
                  alt="dropdown"
                  className="w-2 h-2.5 ml-1.5"
                />
              </span>
              <span className="ml-2 flex flex-col justify-center">
                <img
                  src="/up-arrow-solid.svg"
                  alt="ascending"
                  className="w-1.2 mb-px hover:cursor-pointer"
                  onClick={sortPricesAscending}
                />
                <img
                  src="/down-arrow-solid.svg"
                  alt="discending"
                  className="w-1.2 mt-px hover:cursor-pointer"
                  onClick={sortPricesDescending}
                />
              </span>
            </div>

            <ul
              className={`w-max px-3 py-1.5 absolute top-full right-20p list-none flex flex-col text-md bg-white rounded-lg shadow-lg ${
                showSortPrice ? "" : "hidden"
              }`}
            >
              <li
                className="py-1 hover:cursor-pointer"
                onClick={() => {
                  handleSortPrice();
                  sortPricesAscending();
                }}
              >
                Ascending
              </li>
              <li
                className="py-1 hover:cursor-pointer"
                onClick={() => {
                  handleSortPrice();
                  sortPricesDescending();
                }}
              >
                Descending
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="flex">
              <span
                className="w-4/5 px-3 pt-1.5 pb-1 flex justify-between items-center bg-slate-100 rounded-md hover:cursor-pointer"
                onClick={handleSortDate}
              >
                <span className="text-xs text-slate-500 font-semi-bold">
                  Placed on
                </span>
                <img
                  src="/down-arrow-thin.svg"
                  alt="dropdown"
                  className="w-2 h-2.5 ml-1.5"
                />
              </span>
              <span className="ml-2 flex flex-col justify-center">
                <img
                  src="/up-arrow-solid.svg"
                  alt="ascending"
                  className="w-1.2 mb-px hover:cursor-pointer"
                  onClick={sortDatesAscending}
                />
                <img
                  src="/down-arrow-solid.svg"
                  alt="discending"
                  className="w-1.2 mt-px hover:cursor-pointer"
                  onClick={sortDatesDescending}
                />
              </span>
            </div>

            <ul
              className={`w-max px-3 py-1.5 absolute top-full right-20p list-none flex flex-col text-md bg-white rounded-lg shadow-lg ${
                showSortDate ? "" : "hidden"
              }`}
            >
              <li
                className="py-1 hover:cursor-pointer"
                onClick={() => {
                  handleSortDate();
                  sortDatesAscending();
                }}
              >
                Ascending
              </li>
              <li
                className="py-1 hover:cursor-pointer"
                onClick={() => {
                  handleSortDate();
                  sortDatesDescending();
                }}
              >
                Descending
              </li>
            </ul>
          </div>

          <div className="justify-self-end mr-3.5 flex items-center">
            <span className="text-sm text-gray-500 font-medium">Options</span>
            <img
              src="/arrow-dropdown.svg"
              alt="dropdown"
              className="w-2 ml-1.5"
            />
          </div>

          {items.map((item) => {
            return <OrderDetails item={item} key={item.id} />;
          })}
        </div>
      </div>

      <div className="w-full p-3 flex items-center bg-white rounded-lg">
        <h5 className="text-md font-medium">Issues</h5>
        <span className="ml-3 mb-[-2px] font-semi-bold text-md text-gray-400">
          21
        </span>
        <div className="h-6 w-6 ml-auto grid place-content-center bg-grey rounded-full">
          <img src="/plus-black.png" alt="Add" className="w-2.5" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
