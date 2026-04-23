import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import TeamPage from './pages/TeamPage/TeamPage';
import AuvAnatomyPage from './pages/AuvAnatomyPage/AuvAnatomyPage';
import AuvBuilderPage from './pages/AuvBuilderPage/AuvBuilderPage';
import ApplyPage from './pages/ApplyPage/ApplyPage';
import AlumniPage from './pages/AlumniPage/AlumniPage';
import ContactPage from './pages/ContactPage/ContactPage';
import DonatePage from './pages/DonatePage/DonatePage';

export type Page = 'home' | 'team' | 'anatomy' | 'builder' | 'apply' | 'alumni' | 'contact' |'donate';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'team': return <TeamPage />;
      case 'anatomy': return <AuvAnatomyPage />;
      case 'builder': return <AuvBuilderPage />;
      case 'apply': return <ApplyPage />;
      case 'alumni': return <AlumniPage />;
      case 'contact': return <ContactPage />;
      case 'donate': return <DonatePage />;
    }
  };



  return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </>
  );
}

export default App;
