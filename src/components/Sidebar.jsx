/* eslint-disable react/prop-types */
import { BsFillGrid3X2GapFill } from "react-icons/bs";

function Sidebar({ activeSection }) {
  return (
    <div className="h-full w-1/6 px-[2%] pt-5 bg-white rounded-e-2xl shadow-sm">
      <img src="/logo.png" alt="Logo" className="w-12 mx-auto" />
      <ul className="mt-7 text-md font-medium">
        <li className="p-2 flex items-center mb-3">
          <img src="/report-logo.svg" className="w-5 mr-3" />
          <span>Reports</span>
        </li>
        <li
          className={`flex items-center mb-3 p-2 ${
            activeSection === "desktop"
              ? "text-blue bg-light-blue rounded-lg"
              : ""
          }`}
        >
          <BsFillGrid3X2GapFill className="text-[1.15rem] mr-3" />
          <span>Workspaces</span>
        </li>
        <li className="p-2 flex items-center text-gray-600">
          <img src="/settings-logo.svg" className="w-5 mr-3 text-blue" />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
