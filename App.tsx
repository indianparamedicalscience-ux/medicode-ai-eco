
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Tabs } from './components/Tabs';
import { CodeSuggester } from './components/CodeSuggester';
import { CodeLookup } from './components/CodeLookup';
import { Tab } from './constants';
import { FileText, Search } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Suggester);

  const tabs = [
    { id: Tab.Suggester, label: 'AI Code Suggester', icon: FileText },
    { id: Tab.Lookup, label: 'Code Lookup', icon: Search },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-textPrimary">
      <Header />
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-8">
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-8">
          {activeTab === Tab.Suggester && <CodeSuggester />}
          {activeTab === Tab.Lookup && <CodeLookup />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
