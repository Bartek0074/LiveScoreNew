import styles from './PlayerRating.module.scss';
import classNames from 'classnames';

interface Props {
	value: number;
	size?: 'small' | 'medium' | 'large';
}

export default function PlayerRating({ value, size = 'medium' }: Props) {
	const ratingClasses = classNames(styles.rating, {
		[styles.ratingSmall]: size === 'small',
		[styles.ratingMedium]: size === 'medium',
		[styles.ratingLarge]: size === 'large',
		[styles.ratingVeryGood]: value >= 9.0,
		[styles.ratingGood]: value < 9.0 && value >= 7.5,
		[styles.ratingAverage]: value < 7.5 && value >= 6.5,
		[styles.ratingBad]: value < 6.5 && value >= 4.5,
		[styles.ratingVeryBad]: value < 4.5,
	});
	return (
		<div className={ratingClasses}>
			<p className={ratingClasses}>{value.toFixed(1)}</p>
		</div>
	);
}
