import styles from './MatchStats.module.scss';

import {
	CurrentMatch,
	StatisticType,
	MatchStatistic,
} from '../../../data/currentMatch/types';

import MatchStat from './MatchStat/MatchStat';

interface Props {
	match: CurrentMatch;
}

export default function MatchStats({ match }: Props) {
	const matchStatistics: { home: MatchStatistic; away: MatchStatistic }[] =
		match?.statistics[0]?.statistics.map((stat, index) => {
			return {
				home: stat,
				away: match?.statistics[1]?.statistics[index],
			};
		});

	const displayedStats = [
		StatisticType.ExpectedGoals,
		StatisticType.BallPossession,
		StatisticType.TotalShots,
		StatisticType.ShotsOnGoal,
		StatisticType.ShotsOffGoal,
		StatisticType.BlockedShots,
		StatisticType.ShotsInsideBox,
		StatisticType.ShotsOutsideBox,
		StatisticType.CornerKicks,
		StatisticType.Offsides,
		StatisticType.GoalkeeperSaves,
		StatisticType.Fouls,
		StatisticType.YellowCards,
		StatisticType.RedCards,
		StatisticType.TotalPasses,
		StatisticType.PassesAccurate,
	];

	matchStatistics?.sort((a, b) => {
		return (
			displayedStats.indexOf(a.home.type) - displayedStats.indexOf(b.home.type)
		);
	});

	if (!match.statistics[0])
		return (
			<div className={styles.matchStats}>
				<p className={styles.notAvailable}>
					Match stats are not available.
				</p>
			</div>
		);

	return (
		<div className={styles.matchStats}>
			{matchStatistics.map((stat, index) => {
				const { home, away } = stat;
				if (!displayedStats.includes(home.type)) return null;
				return (
					<MatchStat key={index} homeStatistic={home} awayStatistic={away} />
				);
			})}
		</div>
	);
}
