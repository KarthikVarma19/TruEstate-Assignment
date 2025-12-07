import React, { useState } from 'react';
import Avatar from '../../ui/Avatar';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

const SidebarHeader: React.FC = () => {
  const user = {
    name: "Karthik Varma",
    organization: "TruEstate"
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-start rounded-sm bg-white p-0.5 border border-[#D3D4DD]">
      <Avatar src="/truestateindia_logo.svg" name="TruEstate" size="sm" rounded={false} />
      <div className="flex flex-col"> 
        <h6 className="font-bold text-[14px] text-black">{user.organization}</h6>
        <p className="text-sm  text-[14px] text-[#3A3A47]">{user.name}</p>
      </div>
      <div className=' ml-auto'>
        {isOpen ? (
          <MdOutlineKeyboardArrowUp className="text-[#696979] text-1xl cursor-pointer" onClick={() => setIsOpen(false)} />
        ) : (
          <MdOutlineKeyboardArrowDown className="text-[#696979] text-1xl cursor-pointer" onClick={() => setIsOpen(true)} />
        )}
      </div>
    </div>
  )
}

export default SidebarHeader