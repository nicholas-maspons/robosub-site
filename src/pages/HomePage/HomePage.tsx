import { useEffect, useState } from 'react';
import styles from './HomePage.module.css';

function HomePage() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setActive(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollDown = () => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });

  return (
    <div className={`${styles.overlay} ${active ? styles.active : ''}`}>
      <div className={styles.content}>

        <div className={styles.logosRow}>
          {/* need: tandon-logo.png frmo public/images/ */}
          <img src="/images/tandon-logo.png" alt="NYU Tandon Logo" className={styles.leftLogo} />
          {/* need: auviolets-logo.png from public/images/ */}
          <img src="/images/auviolets-logo.png" alt="AUViolets Logo" className={styles.rightLogo} />
        </div>

        {/* need: hero-photo.png from public/images/ */}
        <img
          src="/images/hero-photo.png"
          alt="Team photo"
          className={`${styles.heroPhoto} ${active ? styles.heroPhotoActive : ''}`}
        />

        <div className={`${styles.titleBlock} ${active ? styles.titleBlockActive : ''}`}>
          <span className={styles.line1}>NEW YORK UNIVERSITY</span>
          <span className={styles.line2}>AUTONOMOUS UNDERWATER VEHICLE</span>
          <span className={styles.line3}>PROJECT TEAM</span>
        </div>

        <div className={styles.highlights}>
          <div className={styles.highlightsInner}>
            <div className={styles.highlightCol}>
              <div className={styles.highlightBox} />
              <p className={styles.highlightText}>highlights<br />highlights<br />highlights</p>
            </div>
            <div className={styles.highlightCol}>
              <div className={styles.highlightBox} />
              {/* this is how it was in the orginal html. put actual content soon */}
              <p className={styles.highlightText}>highlights<br />highlights<br />highlights</p>
            </div>
          </div>
        </div>

        <div className={styles.arrowContainer} onClick={scrollDown}>
          <div className={styles.vArrow} />
        </div>

      </div>
    </div>
  );
}

export default HomePage;
