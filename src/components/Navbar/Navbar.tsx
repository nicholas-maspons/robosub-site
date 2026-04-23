import { useState } from 'react';
import type { Page } from '../../App';
import styles from './Navbar.module.css';


interface Props {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

function Navbar({ currentPage, setCurrentPage }: Props) {
  const [kelpieOpen, setKelpieOpen] = useState(false);

  const nav = (page: Page) => setCurrentPage(page);

  const isKelpie = currentPage === 'anatomy' || currentPage === 'builder';

  return (
    <header className={styles.navbar}>
      <nav className={styles.nav}>

        <button
          onClick={() => nav('team')}
          className={`${styles.link} ${currentPage === 'team' ? styles.active : ''}`}
        >
          TEAM
        </button>

        <div
          className={styles.dropdown}
          onMouseEnter={() => setKelpieOpen(true)}
          onMouseLeave={() => setKelpieOpen(false)}
        >
          <span className={`${styles.link} ${isKelpie ? styles.active : ''}`}>
            KELPIE ▼
          </span>
          {kelpieOpen && (
            <div className={styles.dropdownMenu}>
              <button onClick={() => { nav('anatomy'); setKelpieOpen(false); }} className={styles.dropdownItem}>
                Interactive AUV Anatomy Explorer
              </button>
              <button onClick={() => { nav('builder'); setKelpieOpen(false); }} className={styles.dropdownItem}>
                AUV Builder
              </button>
            </div>
          )}
        </div>

        {/* blog is external */}
        <button
          onClick={() => window.open('https://medium.com/@auviolets', '_blank')}
          className={styles.link}
        >
          BLOG
        </button>

        <button
          onClick={() => nav('apply')}
          className={`${styles.link} ${currentPage === 'apply' ? styles.active : ''}`}
        >
          APPLY
        </button>

        <button
          onClick={() => nav('alumni')}
          className={`${styles.link} ${currentPage === 'alumni' ? styles.active : ''}`}
        >
          ALUMNI
        </button>

        <button
          onClick={() => nav('contact')}
          className={`${styles.link} ${currentPage === 'contact' ? styles.active : ''}`}
        >
          CONTACT US
        </button>

        <button
          onClick={() => nav('donate')}
          className={`${styles.link} ${currentPage === 'donate' ? styles.active : ''}`}
        >
          DONATE
        </button>

      </nav>
    </header>
  );
}

export default Navbar;
