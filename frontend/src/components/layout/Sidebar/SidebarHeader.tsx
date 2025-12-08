import React, { useState } from 'react';
import Avatar from '../../ui/Avatar';
import { ArrowUp2, ArrowDown2 } from 'iconsax-react';

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
      <div className=" ml-auto">
        {isOpen ? (
          <ArrowUp2 size={16} color="#696979" variant="Linear" className="cursor-pointer" onClick={() => setIsOpen(false)} />
        ) : (
          <ArrowDown2 size={16} color="#696979" variant="Linear" className="cursor-pointer" onClick={() => setIsOpen(true)} />
        )}
      </div>
    </div>
  );
}

export default SidebarHeader