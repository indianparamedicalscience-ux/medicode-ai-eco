
import React from 'react';
import type { LucideProps } from 'lucide-react';
import { Tab } from '../constants';

interface TabItem {
  id: Tab;
  label: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } group inline-flex items-center py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200 ease-in-out focus:outline-none`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                className={`${
                  isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'
                } -ml-0.5 mr-2 h-6 w-6`}
                aria-hidden="true"
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
