import React, { useState } from "react";
import { type NavigateFunction, useNavigate } from "react-router-dom";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import "./NavItem.css";

interface INavItem {
  key: string;
  icon?: React.ReactNode;
  label: string;
  path?: string;
  items?: INavItem[];
}

interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  items?: INavItem[];
  path?: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, items, path }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const hasChildren: boolean = !!items && items.length > 0;
  const navigate: NavigateFunction = useNavigate();

  const handleArrowClick: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement>): void =>{
    e.stopPropagation();
    if (hasChildren) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleRowClick = (): void => {
    if (path) {
      navigate(path);
    }
    if (hasChildren) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className={`flex flex-col ${hasChildren ? "nav-items-conatiner" : "nav-item"}`}>
      <div className="flex items-center rounded-sm hover:font-semibold hover:text-black cursor-pointer" onClick={handleRowClick}>
        <div className="flex items-center gap-2">
          {icon}
          <span className="nav-item-text">{label}</span>
        </div>
        {hasChildren && (
          <button type="button" className="ml-auto" onClick={handleArrowClick}>
            {isOpen
              ? <ArrowUp2 size={16} color="#696979" variant="Linear" />
              : <ArrowDown2 size={16} color="#696979" variant="Linear" />}
          </button>
        )}
      </div>
      {hasChildren && isOpen &&
        <div className={`flex flex-col ${hasChildren ? "nav-items-conatiner" : "nav-item"}`}>
          {items && items.length > 0 && items.map((item: INavItem) =>
          <NavItem key={item.key} icon={item.icon} label={item.label} items={item.items} path={item.path} />)}
        </div>
      }
    </div>
  );
};

export default NavItem;