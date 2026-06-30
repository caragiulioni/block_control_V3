import { useState, useRef } from 'react';
import SectionHead from '../shared/SectionHead.jsx';
import ScrollReveal from '../shared/ScrollReveal.jsx';
import Panel from '../shared/Panel.jsx';
import FileId from '../shared/FileId.jsx';
import Button from '../shared/Button.jsx';
import Note from '../shared/Note.jsx';
import TransmitTerminal from './TransmitTerminal.jsx';
import { useTextScramble } from '../../hooks/useTextScramble.js';
import styles from './Contact.module.css';
import chipsBg from '../../images/chips-bandw.png';

const Contact = () => {
  const [visible, setVisible] = useState(false);
  const headingRef = useTextScramble('CONNECT', visible);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [transmitting, setTransmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const formRef = useRef(null);
  const termColRef = useRef(null);

  const isValid = name.trim() && email.trim() && message.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttempted(true);
    if (!isValid || transmitting) return;

    setTransmitting(true);

    // Scroll terminal into view so user sees the animation (especially on mobile)
    setTimeout(() => {
      termColRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);

    // Submit to Netlify Forms in background
    const formData = new FormData(formRef.current);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    }).catch(() => {
      // Silently fail — the terminal animation runs regardless
    });
  };

  const handleTransmitComplete = () => {
    setSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section className={styles.section} id="contact">
      <ScrollReveal onResolved={() => setVisible(true)} scanline>
        <SectionHead eyebrow="FILE 03 // open channel" headingRef={headingRef}>
          CONNECT
        </SectionHead>

        <Panel id="03·A" title="SIGNAL RELAY" statusLabel="OPEN" bgImage={chipsBg}>
          <div className={styles.grid}>
            {/* Left: Form */}
            <div className={styles.formCol}>
              <p className={styles.intro}>
                Send a signal — work, collaboration, or just to say hi.
              </p>

              <form
                ref={formRef}
                className={styles.form}
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className={styles.honeypot} aria-hidden="true">
                  <label>Don't fill this out: <input name="bot-field" tabIndex={-1} /></label>
                </p>

                <div className={styles.field}>
                  <label htmlFor="c-name" className={styles.label}>Name</label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className={`${styles.input} ${attempted && !name.trim() ? styles.inputError : ''}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={transmitting || success}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="c-email" className={styles.label}>Your email</label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`${styles.input} ${attempted && !email.trim() ? styles.inputError : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={transmitting || success}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="c-msg" className={styles.label}>Your message</label>
                  <textarea
                    id="c-msg"
                    name="message"
                    required
                    className={`${styles.textarea} ${attempted && !message.trim() ? styles.inputError : ''}`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={transmitting || success}
                  />
                </div>

                <div className={styles.formFooter}>
                  <Button
                    variant="filled"
                    color="neon"
                    onClick={handleSubmit}
                    disabled={transmitting || success}
                  >
                    TRANSMIT <span aria-hidden="true">→</span>
                  </Button>
                  <Note prefix variant="muted" text="all fields required" />
                </div>

                {/* Screen reader announcement for form state */}
                <div aria-live="polite" aria-atomic="true" className={styles.srOnly}>
                  {success && 'Message sent successfully. You will receive a confirmation email shortly.'}
                  {transmitting && !success && 'Sending your message…'}
                </div>
              </form>
            </div>

            {/* Right: Terminal / Transmission */}
            <div className={styles.termCol} aria-hidden="true" ref={termColRef}>
              <div className={styles.termHeader}>
                <FileId>03·B</FileId>
                <span className={styles.termTitle}>TRANSMITTER</span>
                <span className={styles.termStatus}>
                  {success ? (
                    <span className={styles.statusOk}>DELIVERED</span>
                  ) : transmitting ? (
                    <span className={styles.statusLive}>TX</span>
                  ) : (
                    <span className={styles.statusIdle}>STANDBY</span>
                  )}
                </span>
              </div>
              <TransmitTerminal
                transmitting={transmitting}
                onComplete={handleTransmitComplete}
                success={success}
                bufferLength={message.length}
              />
            </div>
          </div>
        </Panel>
      </ScrollReveal>
    </section>
  );
};

export default Contact;
