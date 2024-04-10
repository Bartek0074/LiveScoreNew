import styles from './MatchSummary.module.scss';

import MatchEvent from './MatchEvent/MatchEvent';

import { CurrentMatch } from '../../../data/currentMatch/types';
import { MatchStatuses } from '../../../utils/matchStatuses';

interface Props {
	match: CurrentMatch;
}

export default function MatchSummary({ match }: Props) {
	const shortStatus = match?.fixture?.status?.short;
	const sortedEvents = match?.events?.sort(
		(a, b) => a.time.elapsed + a.time.extra - (b.time.elapsed + b.time.extra)
	);

	const isMatchSummaryAvailable = [
		MatchStatuses.FirstHalf,
		MatchStatuses.Halftime,
		MatchStatuses.SecondHalf,
		MatchStatuses.ExtraTime,
		MatchStatuses.BreakTime,
		MatchStatuses.PenaltyInProgress,
		MatchStatuses.Suspended,
		MatchStatuses.Interrupted,
		MatchStatuses.Finished,
		MatchStatuses.FinishedAfterExtraTime,
		MatchStatuses.FinishedAfterPenaltyShootout,
		MatchStatuses.Live,
		MatchStatuses.Walkover,
	].includes(shortStatus);

	if (!isMatchSummaryAvailable) {
		return (
			<div className={styles.matchSummary}>
				<p className={styles.notAvailable}>Match summary is not available.</p>
			</div>
		);
	}

	return (
		<div className={styles.matchSummary}>
			<div className={styles.half}>
				<div className={styles.halfInfo}>
					<p className={styles.halfType}>1st half</p>
					<p className={styles.halfScore}>
						{match?.fixture?.status?.short === MatchStatuses.FirstHalf
							? `${match?.goals?.home} - ${match?.goals?.away}`
							: `${match?.score?.halftime?.home} - ${match?.score?.halftime?.away}`}
					</p>
				</div>
				<div className={styles.events}>
					{sortedEvents.map((event, index) => {
						const isAway = event.team.id === match?.teams.away.id;
						if (event.time.elapsed <= 45) {
							return (
								<MatchEvent
									key={index}
									event={event}
									events={match.events}
									isAway={isAway}
								/>
							);
						}
						return null;
					})}
				</div>
			</div>
			{shortStatus !== MatchStatuses.Halftime &&
				shortStatus !== MatchStatuses.FirstHalf && (
					<div className={styles.half}>
						<div className={styles.halfInfo}>
							<p className={styles.halfType}>2nd half</p>
							<p className={styles.halfScore}>
								{shortStatus === MatchStatuses.SecondHalf
									? `${match?.goals?.home - match?.score?.halftime?.home} - ${
											match?.goals?.away - match?.score?.halftime?.away
									  }`
									: `${
											match?.score?.fulltime?.home -
											match?.score?.halftime?.home
									  } - ${
											match?.score?.fulltime?.away -
											match?.score?.halftime?.away
									  }`}
							</p>
						</div>
						<div className={styles.events}>
							{sortedEvents.map((event, index) => {
								const isAway = event.team.id === match?.teams.away.id;
								if (event.time.elapsed > 45 && event.time.elapsed <= 90) {
									return (
										<MatchEvent
											key={index}
											event={event}
											events={match.events}
											isAway={isAway}
										/>
									);
								}
								return null;
							})}
						</div>
					</div>
				)}
		</div>
	);
}
