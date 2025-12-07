import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

interface ISidebarNavItem {
  key: string;
  icon?: React.ReactNode;
  label: string;
  path?: string;
  items?: ISidebarNavItem[];
}

interface SidebarNavItemProps {
  icon?: React.ReactNode;
  label: string;
  items?: ISidebarNavItem[];
  path?: string;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ icon, label, items, path }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = !!items && items.length > 0;
  const navigate = useNavigate();
  const toggleOpen = () => {
    if (hasChildren) {
      setIsOpen((prev) => !prev);
    }

    if (path) {
      navigate(path);
    }
  };

  return (
    <div
      className={`
        flex flex-col
        ${hasChildren ? "bg-white border-none rounded-sm" : "text-gray-600"} 
      `}
    >
      <NavLink to={path || ""}>
        <div className="w-full flex items-center gap-2 rounded-sm hover:bg-gray-100 cursor-pointer text-[#515162] py-1">
          <div className="flex items-center gap-2 pl-2">
            {icon}
            <span className="text-[14px]">{label}</span>
          </div>
          {hasChildren && (
            <button type="button" className="ml-auto pr-2 cursor-pointer" onClick={toggleOpen}>
              {isOpen ? <MdOutlineKeyboardArrowUp className="text-[#696979] text-xl" /> : <MdOutlineKeyboardArrowDown className="text-[#696979] text-xl" />}
            </button>
          )}
        </div>
        {hasChildren && isOpen && <div className="mt-2 mb-2 flex flex-col gap-1 pl-6">{items && items.length > 0 && items.map((item) => <SidebarNavItem key={item.key} icon={item.icon} label={item.label} items={item.items} />)}</div>}
      </NavLink>
    </div>
  );
};

export default SidebarNavItem;