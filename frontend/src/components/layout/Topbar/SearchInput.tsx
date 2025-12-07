import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';

interface SearchInputProps {
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder = 'Search' }) => {
  const [search, setSearch] = useState('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(search);
    }
  }
  return (
    <div className='flex items-center justify-center bg-[#F3F3F3] border border-[#D3D4DD] rounded-md pl-2 w-full'>
      <CiSearch className='text-[#3A3A47] text-2xl'/>
      <input
        type='search'
        placeholder={placeholder}
        className='w-full h-full p-2 pl-1 bg-transparent text-black focus:outline-none'
        value={search}
        onChange={handleSearch}
        onKeyDown={handleKeyDown} />
    </div>
  )
}

export default SearchInput