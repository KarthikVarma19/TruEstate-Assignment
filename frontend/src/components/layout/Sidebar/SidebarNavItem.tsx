import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';

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
        ${hasChildren ? "bg-white border-none rounded-sm" : "text-gray-600 "} 
      `}
    >
        <div className="w-full flex items-center gap-2 rounded-sm hover:font-semibold cursor-pointer text-[#515162] py-1">
          <div className="flex items-center gap-2 pl-2">
            {icon}
            <span className="text-[14px]">{label}</span>
          </div>
          {hasChildren && (
            <button type="button" className="ml-auto pr-2 cursor-pointer" onClick={toggleOpen}>
              {isOpen ? (
                <ArrowUp2 size={16} color="#696979" variant="Linear" />
              ) : (
                <ArrowDown2 size={16} color="#696979" variant="Linear" />
              )}
            </button>
          )}
        </div>
        {hasChildren && isOpen && <div className="mt-2 mb-2 flex flex-col gap-1 pl-6">{items && items.length > 0 && items.map((item) => <SidebarNavItem key={item.key} icon={item.icon} label={item.label} items={item.items} />)}</div>}
    </div>
  );
};

export default SidebarNavItem;