import styles from './ApplyPage.module.css';

function ApplyPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>APPLY</h1>
      <p className={styles.sub}>Interested in joining the team?</p>
      {/* replace href with the real NYU application link (later)*/}
      <a
        href="https://apply.nyu.edu"
        target="_blank"
        rel="noreferrer"
        className={styles.applyBtn}
      >
        Apply Now
      </a>
      <p className={styles.desc}>
        {/* add info about the process and timelines and available positions? */}
        More details about the application process coming soon.
      </p>
    </div>
  );
}

export default ApplyPage;
