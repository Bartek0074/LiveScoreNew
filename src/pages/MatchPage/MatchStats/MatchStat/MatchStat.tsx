import styles from './MatchStat.module.scss';
import classNames from 'classnames';

import {
	MatchStatistic,
	StatisticType,
} from '../../../../data/currentMatch/types';

interface Props {
	homeStatistic: MatchStatistic;
	awayStatistic: MatchStatistic;
}

export default function MatchStat({ homeStatistic, awayStatistic }: Props) {
	const type = homeStatistic.type;

	let valueHome = homeStatistic.value || 0;
	let valueAway = awayStatistic.value || 0;

	if (typeof valueHome === 'string') {
		valueHome = parseFloat(valueHome);
	}
	if (typeof valueAway === 'string') {
		valueAway = parseFloat(valueAway);
	}

	const parsedValueHome: number = valueHome;
	const parsedValueAway: number = valueAway;

	let valueHomePercent = 0;
	let valueAwayPercent = 0;

	if (parsedValueAway + parsedValueHome !== 0) {
		valueHomePercent =
			(parsedValueHome / (parsedValueHome + parsedValueAway)) * 100;
		valueAwayPercent =
			(parsedValueAway / (parsedValueHome + parsedValueAway)) * 100;
	}

	const returnValue = (value: number | string | null) => {
		switch (type) {
			case StatisticType.BallPossession:
				return `${value}%`;
			case StatisticType.PassesPercentage:
				return `${value}%`;
			case StatisticType.ExpectedGoals:
				return value;

			default:
				return value;
		}
	};

	const returnType = (type: string) => {
		switch (type) {
			case StatisticType.ExpectedGoals:
				return 'Expected Goals (xG)';
			case StatisticType.TotalShots:
				return 'Total Shots';
			case StatisticType.ShotsInsideBox:
				return 'Shots Inside Box';
			case StatisticType.ShotsOutsideBox:
				return 'Shots Outside Box';
			case StatisticType.TotalPasses:
				return 'Total Passes';
			case StatisticType.PassesAccurate:
				return 'Completed Passes';
			default:
				return type;
		}
	};

	const fillHomeClassess = classNames(styles.fill, {
		[styles.fillBigger]: valueHomePercent > valueAwayPercent,
	});

	const fillAwayClassess = classNames(styles.fill, {
		[styles.fillBigger]: valueAwayPercent > valueHomePercent,
	});

	return (
		<div className={styles.matchStat}>
			<div className={styles.header}>
				<span className={styles.value}>{returnValue(valueHome)}</span>
				<span className={styles.type}>{returnType(type)}</span>
				<span className={styles.value}>{returnValue(valueAway)}</span>
			</div>
			<div className={styles.bar}>
				<div className={styles.barHome}>
					<div
						className={fillHomeClassess}
						style={{ width: `${valueHomePercent}%` }}
					></div>
				</div>
				<div className={styles.barAway}>
					<div
						className={fillAwayClassess}
						style={{ width: `${valueAwayPercent}%` }}
					></div>
				</div>
			</div>
		</div>
	);
}
