import React, { useState } from "react";
import {
  ArchiveBook, ChartSquare, Check, CloseCircle, DocumentSketch, DocumentText,
  PlayCircle, Profile2User, TickCircle, ArrowUp2, ArrowDown2
} from "iconsax-react";
import Avatar from "../../ui/Avatar";
import NavItem from "./NavItem/NavItem";
import "./Sidebar.css";

export interface ISidebarNavItem {
  title: string;
  icon: React.ReactNode;
  label: string;
  key: string;
  children?: ISidebarNavItem[];
  path?: string;
}

const sidebarNavItems: ISidebarNavItem[] | ISidebarNavItem = [
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
  const user: { name: string, organization: string } = {
    name: "Karthik Varma",
    organization: "Vault",
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="col-span-1 bg-[#F3F3F3] h-screen text-left w-[220px]">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="flex items-center justify-start rounded-sm bg-white border border-[#D3D4DD] sidebar-header-container">
          <div className="sidebar-header-avatar-container flex items-center justify-start">
            <Avatar src="/vault-logo.png" name="Vault" size="sm" rounded={false} className="sidebar-header-avatar" />
            <div className="flex flex-col sidebar-header-avatar-text-container">
              <h6 className="sidebar-header-avatar-text-container-title">{user.organization}</h6>
              <p className="sidebar-header-avatar-text-container-subtitle">{user.name}</p>
            </div>
          </div>
          <div className="ml-auto">{isOpen ? <ArrowUp2 size={16} color="#696979" variant="Linear" className="cursor-pointer" onClick={() => setIsOpen(false)} /> : <ArrowDown2 size={16} color="#696979" variant="Linear" className="cursor-pointer" onClick={() => setIsOpen(true)} />}</div>
        </div>
      </div>
      {/* Sidebar Navigation */}
      <div className="sidebar-nav-section">
        <div className="flex flex-col gap-[6px]">
          {
            sidebarNavItems.map((item: ISidebarNavItem) =>
            <NavItem key={item.key} icon={item.icon} label={item.label} items={item.children} path={item.path} />)
          }
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
