import React, { useState } from 'react';
import './Topbar.css';
import { SearchNormal1 } from 'iconsax-react';

interface TopbarProps {
  title?: string;
  subtitle?: string;
  searchPlaceholder?: string;
}

const Topbar: React.FC<TopbarProps> = ({ title, subtitle, searchPlaceholder }) => {

    const [search, setSearch] = useState("");
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        console.log(search);
      }
    };


  return (
    <div className="flex flex-row items-center justify-between w-full">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        {title && <h5 className="topbar-title">{title}</h5>}
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col items-start topbar-search-input">
        <div className="flex flex-row items-center justify-center rounded-md gap-2">
          <SearchNormal1 size={16} color="#3A3A47" variant="Linear" />
          <input type="search" placeholder={searchPlaceholder} className="w-[350px] h-full bg-transparent text-black focus:outline-none" value={search} onChange={handleSearch} onKeyDown={handleKeyDown} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
