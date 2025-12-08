import React from 'react'
import SidebarHeader from './SidebarHeader'
import SidebarNavSection from './SidebarNavSection'
import {
  ArchiveBook, ChartSquare, Check, CloseCircle, DocumentSketch,
  DocumentText, PlayCircle, Profile2User, TickCircle
} from 'iconsax-react';


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
    title: "Dashboard",
    icon: <ChartSquare size={16} color="#696979" variant="Linear" />,
    label: "Dashboard",
    key: "Dashboard",
    path: "/dashboard",
  },
  {
    title: "Nexus",
    icon: <Profile2User size={16} color="#696979" variant="Linear" />,
    label: "Nexus",
    key: "Nexus",
    path: "/nexus",
  },
  {
    title: "Intake",
    icon: <PlayCircle size={16} color="#696979" variant="Linear" />,
    label: "Intake",
    key: "Intake",
    path: "/intake",
  },
  {
    title: "Services",
    icon: <ArchiveBook size={16} color="#696979" variant="Linear" />,
    label: "Services",
    key: "Services",
    children: [
      {
        title: "Pre-active",
        icon: <PlayCircle size={16} color="#696979" variant="Linear" />,
        label: "Pre-active",
        key: "Pre-active",
        path: "/pre-active",
      },
      {
        title: "Active",
        icon: <Check size={16} color="#696979" variant="Linear" />,
        label: "Active",
        key: "Active",
        path: "/active",
      },
      {
        title: "Blocked",
        icon: <CloseCircle size={16} color="#696979" variant="Linear" />,
        label: "Blocked",
        key: "Blocked",
        path: "/blocked",
      },
      {
        title: "Closed",
        icon: <TickCircle size={16} color="#696979" variant="Linear" />,
        label: "Closed",
        key: "Closed",
        path: "/closed",
      },
    ],
  },
  {
    title: "Invoices",
    icon: <DocumentText size={16} color="#696979" variant="Linear" />,
    label: "Invoices",
    key: "Invoices",
    children: [
      {
        title: "Proforma-Invoices",
        icon: <DocumentSketch size={16} color="#696979" variant="Linear" />,
        label: "Proforma-Invoices",
        key: "Proforma-Invoices",
        path: "/proforma-invoices",
      },
      {
        title: "Final-Invoices",
        icon: <DocumentSketch size={16} color="#696979" variant="Linear" />,
        label: "Final-Invoices",
        key: "Final-Invoices",
        path: "/final-invoices",
      },
    ],
  },
];

const Sidebar: React.FC = () => {
  return (
    <div className='col-span-1 bg-[#F3F3F3] h-screen p-2 text-left'>
      <SidebarHeader />
      <SidebarNavSection items={sidebarNavItems} />
    </div>
  )
}

export default Sidebar