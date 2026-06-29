import styles from './Note.module.css';
/**
 * Simple note component with option decorative prefix //
 * @param {'muted'|'full'} variant - muted and grey for text & smaller font, full is white and standard text
 * @param {boolean} props.prefix - applies pink // decorative prefix to front of <p>
 * @param {string} props.text
 */


const Note = ({prefix, variant, text}) => {
	return (
			<p className={variant == 'muted' ? styles.noteMute : styles.note}>
			  {prefix && <span className={styles.slash} aria-hidden="true">//</span>} {text}
			</p>

	)
}

export default Note