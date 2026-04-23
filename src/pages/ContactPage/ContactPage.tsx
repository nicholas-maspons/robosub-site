import { useState } from 'react';
import styles from './ContactPage.module.css';

type Status = 'idle' | 'sending' | 'success' | 'error';

function ContactPage() {
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const emailVal = (form.querySelector('#email') as HTMLInputElement).value;
    (form.querySelector('input[name="_replyto"]') as HTMLInputElement).value = emailVal;

    try {
      const res = await fetch('https://formspree.io/f/mqallggj', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Reach out to us</h1>

        {status === 'success' && (
          <div className={styles.successMsg}>✅ Thank you! We'll get back to you within 24-48 hours.</div>
        )}
        {status === 'error' && (
          <div className={styles.errorMsg}>❌ Something went wrong. Try again or email us at auviolets@nyu.edu</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email*</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell us about your interest, questions, or how you'd like to collaborate..."
              required
            />
          </div>

          <input type="hidden" name="_subject" value="New Contact Form Submission - AUViolets Website" />
          <input type="hidden" name="_replyto" value="" />

          <button type="submit" className={styles.sendBtn} disabled={status === 'sending'}>
            {status === 'sending' ? 'SENDING...' : 'SEND'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
