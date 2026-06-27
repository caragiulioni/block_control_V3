import styles from './Button.module.css';

/**
 * Shared button/link component.
 * @param {Object} props
 * @param {'outlined'|'filled'} props.variant - Visual style (default: 'outlined')
 * @param {'cyan'|'neon'} props.color - Color scheme (default: 'cyan')
 * @param {string} props.href - If provided, renders as an <a> link
 * @param {Function} props.onClick - Click handler (for button usage)
 * @param {string} props.className - Additional class
 * @param {React.ReactNode} props.children
 */
const Button = ({
  variant = 'outlined',
  color = 'cyan',
  href,
  onClick,
  className = '',
  children,
  ...rest
}) => {
  const cls = [
    styles.btn,
    styles[variant],
    styles[color],
    className,
  ].filter(Boolean).join(' ');

  if (href) {
    return (
      <a
        className={cls}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={cls} onClick={onClick} type="button" {...rest}>
      {children}
    </button>
  );
};

export default Button;
