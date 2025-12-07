import React from 'react'
import SidebarHeader from './SidebarHeader'
import SidebarNavSection from './SidebarNavSection'
import { SlPeople } from 'react-icons/sl';
import { FiBookOpen, FiPlayCircle } from 'react-icons/fi';
import { BsJournalBookmark } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { TbFileInvoice } from 'react-icons/tb';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { BiBarChartSquare } from 'react-icons/bi';

export interface ISidebarNavItem {
  title: string;
  icon: React.ReactNode;
  label: string;
  key: string;
  children?: ISidebarNavItem[];
  path?: string;
}

const sidebarNavItems: ISidebarNavItem[] = [
  {
    title: 'Dashboard', 
    icon: <BiBarChartSquare />,
    label: 'Dashboard',
    key: 'Dashboard',
    path: '/dashboard',
  },
  {
    title: 'Nexus',
    icon: <SlPeople />,
    label: 'Nexus',
    key: 'Nexus',
    path: '/nexus',
  },
  {
    title: 'Intake',
    icon: <FiPlayCircle />,
    label: 'Intake',
    key: 'Intake',
    path: '/intake',
  },
  {
    title: 'Services',
    icon: <BsJournalBookmark />,
    label: 'Services',
    key: 'Services',
    children: [
      {
        title: 'Pre-active',
        icon: <FiPlayCircle />,
        label: 'Pre-active',
        key: 'Pre-active',
        path: '/pre-active',
      },
      {
        title: 'Active',
        icon: <FiBookOpen />,
        label: 'Active',
        key: 'Active',
        path: '/active',
      },
      {
        title: 'Blocked',
        icon: <RxCrossCircled />,
        label: 'Blocked',
        key: 'Blocked',
        path: '/blocked',
      },
      {
        title: 'Closed',
        icon: <FaRegCircleCheck />,
        label: 'Closed',
        key: 'Closed',
        path: '/closed',
      },
    ]
  },
  {
    title: 'Invoices',
    icon: <TbFileInvoice />,
    label: 'Invoices',
    key: 'Invoices',
    children: [
      {
        title: 'Proforma-Invoices',
        icon: <LiaFileInvoiceSolid />,
        label: 'Proforma-Invoices',
        key: 'Proforma-Invoices',
        path: '/proforma-invoices',
      },
      {
        title: 'Final-Invoices',
        icon: <LiaFileInvoiceSolid />,
        label: 'Final-Invoices',
        key: 'Final-Invoices',
        path: '/final-invoices',
      },
    ]
  },
]

const Sidebar: React.FC = () => {
  return (
    <div className='col-span-1 bg-[#F3F3F3] h-screen p-2 text-left'>
      <SidebarHeader />
      <SidebarNavSection items={sidebarNavItems} />
    </div>
  )
}

export default Sidebar