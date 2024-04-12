import styles from './MatchIcon.module.scss';
import classNames from 'classnames';

interface Props {
	type:
		| 'yellowCard'
		| 'secondYellowCard'
		| 'redCard'
		| 'goal'
		| 'shoe'
		| 'clock'
		| 'assist'
		| 'ownGoal'
		| 'penalty'
		| 'penaltyMissed'
		| 'substitution'
		| 'offside'
		| 'var';

	count?: number;
	size?: 'small' | 'medium' | 'large';
	color?: 'light' | 'dark';
}

const svgSources = {
	yellowCard: '../icons/yellowCard.svg',
	secondYellowCard: '../icons/secondYellowCard.svg',
	redCard: '../icons/redCard.svg',
	goal: '../icons/goal.svg',
	assist: '../icons/assist.svg',
	ownGoal: '../icons/ownGoal.svg',
	penalty: '../icons/penalty.svg',
	penaltyMissed: '../icons/penaltyMissed.svg',
	substitution: '../icons/substitution.svg',
	offside: '../icons/offside.svg',
	var: '../icons/var.svg',
	shoe: '../icons/shoe.svg',
	clock: '../icons/clock.svg',
};

export default function MatchIcon({
	type,
	count,
	size = 'medium',
	color = 'light',
}: Props) {
	const matchIconClasses = classNames(styles.matchIcon, {
		[styles.matchIconSmall]: size === 'small',
		[styles.matchIconMedium]: size === 'medium',
		[styles.matchIconLarge]: size === 'large',
		[styles.matchIconLight]: color === 'light',
		[styles.matchIconDark]: color === 'dark',
	});
	return (
		<div className={matchIconClasses}>
			<img
				src={
					type === 'yellowCard'
						? svgSources.yellowCard
						: type === 'secondYellowCard'
						? svgSources.secondYellowCard
						: type === 'redCard'
						? svgSources.redCard
						: type === 'shoe'
						? svgSources.shoe
						: type === 'clock'
						? svgSources.clock
						: type === 'goal'
						? svgSources.goal
						: type === 'assist'
						? svgSources.assist
						: type === 'ownGoal'
						? svgSources.ownGoal
						: type === 'penalty'
						? svgSources.penalty
						: type === 'penaltyMissed'
						? svgSources.penaltyMissed
						: type === 'substitution'
						? svgSources.substitution
						: type === 'offside'
						? svgSources.offside
						: svgSources.var
				}
				alt=''
			/>
			{count && (
				<div className={styles.count}>
					<p>{count}</p>
				</div>
			)}
		</div>
	);
}
