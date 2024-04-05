import styles from './Button.module.scss';
import classNames from 'classnames';

interface Props {
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	text: string;
	size?: 'extra-small' | 'small' | 'medium' | 'large';
	disabled?: boolean;
}

export default function Button({
	type = 'button',
	onClick,
	text,
	size = 'medium',
	disabled = false,
}: Props) {
	const buttonClass = classNames(styles.button, {
        [styles.buttonDisabled]: disabled,
		[styles[`button--${size}`]]: size,
	});

	return (
		<button
			className={buttonClass}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			{text}
		</button>
	);
}
