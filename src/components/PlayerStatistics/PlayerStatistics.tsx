import styles from './PlayerStatistics.module.scss';

import ImageComponent from '../ImageComponent/ImageComponent';

import PlayerRating from '../PlayerRating/PlayerRating';
import MatchIcon from '../MatchIcon/MatchIcon';
import { Tooltip } from 'antd';

import { CurrentPlayerStatistic } from '../../data/currentPlayer/types';

import {
	removeDuplicatedStatsById,
	removeEmptyStats,
} from '../../data/currentPlayer/helpers';

import { colors } from '../../utils/colors';

interface Props {
	statistics: CurrentPlayerStatistic[];
}

export default function PlayerStatistics({ statistics }: Props) {
	const isGoalkeeper = statistics[0].games.position === 'Goalkeeper';

	const organisedStatistics: CurrentPlayerStatistic[] = removeEmptyStats(
		removeDuplicatedStatsById(statistics)
	);

	if (organisedStatistics.length === 0)
		return (
			<div className={styles.statistics}>
				<p className={styles.notAvailable}>
					Player stats are not available for this season.
				</p>
			</div>
		);

	return (
		<div className={styles.statistics}>
			<div className={styles.table}>
				<table>
					<thead>
						<tr>
							<th>League</th>
							<th>Rating</th>
							<th>
								<Tooltip title='Appearances' color={colors.tooltipBackground}>
									<div className={styles.icon}>
										<MatchIcon type='shoe' size='large' />
									</div>
								</Tooltip>
							</th>
							<th>
								<Tooltip title='Minutes' color={colors.tooltipBackground}>
									<div className={styles.icon}>
										<MatchIcon type='clock' size='large' />
									</div>
								</Tooltip>
							</th>
							{isGoalkeeper ? (
								<>
									<th>
										<Tooltip
											title='Goals Conceded'
											color={colors.tooltipBackground}
										>
											<div className={styles.icon}>
												<MatchIcon type='ownGoal' size='large' />
											</div>
										</Tooltip>
									</th>
								</>
							) : (
								<>
									<th>
										<Tooltip title='Goals' color={colors.tooltipBackground}>
											<div className={styles.icon}>
												<MatchIcon type='goal' size='large' />
											</div>
										</Tooltip>
									</th>
									<th>
										<Tooltip title='Assists' color={colors.tooltipBackground}>
											<div className={styles.icon}>
												<MatchIcon type='assist' size='large' />
											</div>
										</Tooltip>
									</th>
								</>
							)}
							<th>
								<Tooltip title='Yellow Cards' color={colors.tooltipBackground}>
									<div className={styles.icon}>
										<MatchIcon type='yellowCard' size='large' />
									</div>
								</Tooltip>
							</th>
							<th>
								<Tooltip
									title='Second Yellow Cards'
									color={colors.tooltipBackground}
								>
									<div className={styles.icon}>
										<MatchIcon type='secondYellowCard' size='large' />
									</div>
								</Tooltip>
							</th>
							<th>
								<Tooltip title='Red Cards' color={colors.tooltipBackground}>
									<div className={styles.icon}>
										<MatchIcon type='redCard' size='large' />
									</div>
								</Tooltip>
							</th>
						</tr>
					</thead>
					<tbody>
						{organisedStatistics.map((stat, index) => (
							<tr key={index}>
								<td>
									<Tooltip
										title={stat.league.name}
										color={colors.tooltipBackground}
									>
										<div className={styles.league}>
											<div className={styles.logo}>
												{stat.league.logo ? (
													<ImageComponent
														src={stat.league.logo}
														alt={stat.league.name}
														loaderSize={12}
													/>
												) : (
													'-'
												)}
											</div>
											<p>{stat.league.name}</p>
										</div>
									</Tooltip>
								</td>
								<td>
									{stat.games.rating ? (
										<div className={styles.rating}>
											<PlayerRating
												value={parseFloat(stat.games.rating)}
												size='medium'
											/>
										</div>
									) : (
										'-'
									)}
								</td>
								<td>
									<p>{stat.games.appearences ? stat.games.appearences : '0'}</p>
								</td>
								<td>
									<p>{stat.games.minutes ? stat.games.minutes + "'" : '0'}</p>
								</td>
								{isGoalkeeper ? (
									<>
										<td>
											<p>{stat.goals.conceded ? stat.goals.conceded : '0'}</p>
										</td>
									</>
								) : (
									<>
										<td>
											<p>{stat.goals.total ? stat.goals.total : '0'}</p>
										</td>
										<td>
											<p>{stat.goals.assists ? stat.goals.assists : '0'}</p>
										</td>
									</>
								)}
								<td>
									<p>{stat.cards.yellow ? stat.cards.yellow : '0'}</p>
								</td>
								<td>
									<p>{stat.cards.yellowred ? stat.cards.yellowred : '0'}</p>
								</td>
								<td>
									<p>{stat.cards.red ? stat.cards.red : '0'}</p>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
