import React from 'react'
import type { ISidebarNavItem } from './Sidebar';
import SidebarNavItem from './SidebarNavItem';

interface SidebarNavSectionProps {
  items: ISidebarNavItem[] | ISidebarNavItem;
}

const SidebarNavSection: React.FC<SidebarNavSectionProps> = ({ items }) => {
  return (
    <div className='flex flex-col gap-2 mt-5'>
      {Array.isArray(items) ? items.map((item: ISidebarNavItem) =>
        <SidebarNavItem key={item.key} icon={item.icon} label={item.label} items={item.children} />) :
        <SidebarNavItem key={items.key} icon={items.icon} label={items.label} items={items.children} />}
    </div>
  )
  }

export default SidebarNavSection;