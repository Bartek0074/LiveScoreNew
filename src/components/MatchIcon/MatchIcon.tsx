import styles from './MatchIcon.module.scss';
import classNames from 'classnames';

interface Props {
	type:
		| 'yellowCard'
		| 'secondYellowCard'
		| 'redCard'
		| 'goal'
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
	ownGoal: '../icons/ownGoal.svg',
	penalty: '../icons/penalty.svg',
	penaltyMissed: '../icons/penaltyMissed.svg',
	substitution: '../icons/substitution.svg',
	offside: '../icons/offside.svg',
	var: '../icons/var.svg',
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
						: type === 'goal'
						? svgSources.goal
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
			{count && <div className={styles.count}>{count}</div>}
		</div>
	);
}
