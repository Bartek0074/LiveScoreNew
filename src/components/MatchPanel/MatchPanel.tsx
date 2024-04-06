import styles from './MatchPanel.module.scss';
import classNames from 'classnames';

import { useNavigate } from 'react-router-dom';

import { MatchStatuses } from '../../utils/matchStatuses';

import ImageComponent from '../ImageComponent/ImageComponent';

import { Match } from '../../data/matches/types';

interface Props {
	match: Match;
}

export default function MatchPanel({ match }: Props) {
	const navigate = useNavigate();

	const teamHomeNameClass = classNames(styles.teamName, {
		[styles.teamNameWinner]: match?.teams?.home?.winner,
	});

	const teamAwayNameClass = classNames(styles.teamName, {
		[styles.teamNameWinner]: match?.teams?.away?.winner,
	});

	return (
		<div
			className={styles.matchPanel}
			onClick={() => {
				navigate(`/match/${match?.fixture?.id}`);
			}}
		>
			<div className={styles.time}>
				{(match?.fixture?.status?.short === 'TBD' ||
					match?.fixture?.status?.short === 'NS' ||
					match?.fixture?.status?.short === 'FT' ||
					match?.fixture?.status?.short === 'AET' ||
					match?.fixture?.status?.short === 'PEN' ||
					match?.fixture?.status?.short === 'PST' ||
					match?.fixture?.status?.short === 'CANC' ||
					match?.fixture?.status?.short === 'ABD' ||
					match?.fixture?.status?.short === 'AWD') && (
					<p className={styles.date}>
						{/* {getDateWithoutHour(match?.fixture?.date)} */}
					</p>
				)}
				{match?.fixture?.status?.short === 'TBD' && <p>TBD</p>}
				{/* {match?.fixture?.status?.short === 'NS' && (
					<p>{getMatchTime(match?.fixture?.date)}</p>
				)} */}
				{match?.fixture?.status?.short === '1H' && (
					<p className={styles.timeLive}>{match?.fixture?.status?.elapsed}'</p>
				)}
				{match?.fixture?.status?.short === 'HT' && (
					<p className={styles.timeLive}>Half Time</p>
				)}
				{match?.fixture?.status?.short === '2H' && (
					<p className={styles.timeLive}>{match?.fixture?.status?.elapsed}'</p>
				)}
				{match?.fixture?.status?.short === 'ET' && (
					<p className={styles.timeLive}>
						ET
						<br />
						{match?.fixture?.status?.elapsed}'
					</p>
				)}
				{match?.fixture?.status?.short === 'BT' && (
					<p className={styles.timeLive}>Break Time</p>
				)}
				{match?.fixture?.status?.short === 'P' && (
					<p className={styles.timeLive}>Pen.</p>
				)}
				{match?.fixture?.status?.short === 'SUSP' && <p>Suspended</p>}
				{match?.fixture?.status?.short === 'FT' && <p>Finished</p>}
				{match?.fixture?.status?.short === 'AET' && <p>AET</p>}
				{match?.fixture?.status?.short === 'PEN' && <p>Pen.</p>}
				{match?.fixture?.status?.short === 'PST' && <p>Postponed</p>}
				{match?.fixture?.status?.short === 'CANC' && <p>Cancelled</p>}
				{match?.fixture?.status?.short === 'ABD' && <p>Abandoned</p>}
				{match?.fixture?.status?.short === 'AWD' && <p>Technical Loss</p>}
				{match?.fixture?.status?.short === 'LIVE' && (
					<p className={styles.timeLive}>Awaiting Updates</p>
				)}
			</div>
			<div className={styles.teams}>
				<div className={styles.team}>
					<div className={styles.logo}>
						<ImageComponent
							src={match?.teams?.home?.logo}
							alt={`${match?.teams?.home?.name} logo`}
							loaderSize={12}
						/>
					</div>
					<div className={teamHomeNameClass}>
						<p>{match?.teams?.home?.name}</p>
					</div>
				</div>
				<div className={styles.team}>
					<div className={styles.logo}>
						<ImageComponent
							src={match?.teams?.away?.logo}
							alt={`${match?.teams?.away?.name} logo`}
							loaderSize={12}
						/>
					</div>
					<div className={teamAwayNameClass}>
						<p>{match?.teams?.away?.name}</p>
					</div>
				</div>
			</div>
			<div className={styles.scores}>
				<div className={styles.score}>
					<div className={styles.scoreExtraTime}>
						{match?.fixture?.status?.short === 'ET' && (
							<p>{match?.goals?.home}</p>
						)}
						{match?.fixture?.status?.short === 'P' && (
							<p>{match?.goals?.home}</p>
						)}
						{match?.fixture?.status?.short === 'AET' && (
							<p>{match?.goals?.home}</p>
						)}
						{match?.fixture?.status?.short === 'PEN' && (
							<p>
								{match?.score?.penalty?.home > match?.score?.penalty?.away
									? match?.goals?.home + 1
									: match?.goals?.home}
							</p>
						)}
					</div>
					<div className={styles.scoreExtraTime}>
						{match?.fixture?.status?.short === 'ET' && (
							<p>{match?.goals?.away}</p>
						)}
						{match?.fixture?.status?.short === 'P' && (
							<p>{match?.goals?.away}</p>
						)}
						{match?.fixture?.status?.short === 'AET' && (
							<p>{match?.goals?.away}</p>
						)}
						{match?.fixture?.status?.short === 'PEN' && (
							<p>
								{match?.score?.penalty?.home < match?.score?.penalty?.away
									? match?.goals?.away + 1
									: match?.goals?.away}
							</p>
						)}
					</div>
				</div>
				<div className={styles.score}>
					<div className={styles.scoreFullTime}>
						{match?.fixture?.status?.short === 'TBD' && <p>-</p>}
						{match?.fixture?.status?.short === 'NS' && <p>-</p>}
						{match?.fixture?.status?.short === '1H' && (
							<p>{match?.goals?.home}</p>
						)}
						{match?.fixture?.status?.short === 'HT' && (
							<p>{match?.goals?.home}</p>
						)}
						{match?.fixture?.status?.short === '2H' && (
							<p>{match?.goals?.home}</p>
						)}
						{match?.fixture?.status?.short === 'ET' && (
							<p className={styles.scoreFullTimeNotBold}>
								{match?.score?.fulltime?.home}
							</p>
						)}
						{match?.fixture?.status?.short === 'BT' && (
							<p>{match?.goals?.home}</p>
						)}
						{match?.fixture?.status?.short === 'P' && (
							<p className={styles.scoreFullTimeNotBold}>
								{match?.score?.fulltime?.home}
							</p>
						)}
						{match?.fixture?.status?.short === 'SUSP' && (
							<p>{match?.goals?.home}</p>
						)}
						{match?.fixture?.status?.short === 'FT' && (
							<p>{match?.score?.fulltime?.home}</p>
						)}
						{match?.fixture?.status?.short === 'AET' && (
							<p className={styles.scoreFullTimeNotBold}>
								{match?.score?.fulltime?.home}
							</p>
						)}
						{match?.fixture?.status?.short === 'PEN' && (
							<p className={styles.scoreFullTimeNotBold}>
								{match?.score?.fulltime?.home}
							</p>
						)}
						{match?.fixture?.status?.short === 'PST' && <p>-</p>}
						{match?.fixture?.status?.short === 'CANC' && <p>-</p>}
						{match?.fixture?.status?.short === 'ABD' && <p>-</p>}
						{match?.fixture?.status?.short === 'AWD' && (
							<p>{match?.goals?.home}</p>
						)}
						{match?.fixture?.status?.short === 'LIVE' && (
							<p>{match?.goals?.home}</p>
						)}
					</div>
					<div className={styles.scoreFullTime}>
						{match?.fixture?.status?.short === 'NS' && <p>-</p>}
						{match?.fixture?.status?.short === '1H' && (
							<p>{match?.goals?.away}</p>
						)}
						{match?.fixture?.status?.short === 'HT' && (
							<p>{match?.goals?.away}</p>
						)}
						{match?.fixture?.status?.short === '2H' && (
							<p>{match?.goals?.away}</p>
						)}
						{match?.fixture?.status?.short === 'ET' && (
							<p className={styles.scoreFullTimeNotBold}>
								{match?.score?.fulltime?.away}
							</p>
						)}
						{match?.fixture?.status?.short === 'BT' && (
							<p>{match?.goals?.away}</p>
						)}
						{match?.fixture?.status?.short === 'P' && (
							<p className={styles.scoreFullTimeNotBold}>
								{match?.score?.fulltime?.away}
							</p>
						)}
						{match?.fixture?.status?.short === 'SUSP' && (
							<p>{match?.goals?.away}</p>
						)}
						{match?.fixture?.status?.short === 'FT' && (
							<p>{match?.score?.fulltime?.away}</p>
						)}
						{match?.fixture?.status?.short === 'AET' && (
							<p className={styles.scoreFullTimeNotBold}>
								{match?.score?.fulltime?.away}
							</p>
						)}
						{match?.fixture?.status?.short === 'PEN' && (
							<p className={styles.scoreFullTimeNotBold}>
								{match?.score?.fulltime?.away}
							</p>
						)}
						{match?.fixture?.status?.short === 'PST' && <p>-</p>}
						{match?.fixture?.status?.short === 'CANC' && <p>-</p>}
						{match?.fixture?.status?.short === 'ABD' && <p>-</p>}
						{match?.fixture?.status?.short === 'AWD' && (
							<p>{match?.goals?.away}</p>
						)}
						{match?.fixture?.status?.short === 'LIVE' && (
							<p>{match?.goals?.away}</p>
						)}
					</div>
				</div>
				<div className={styles.score}>
					<div className={styles.scoreHalfTime}>
						{match?.fixture?.status?.short === 'NS' && null}
						{match?.fixture?.status?.short === '1H' && (
							<p>({match?.score?.halftime?.home})</p>
						)}
						{match?.fixture?.status?.short === 'HT' && (
							<p>({match?.score?.halftime?.home})</p>
						)}
						{match?.fixture?.status?.short === '2H' && (
							<p>({match?.score?.halftime?.home})</p>
						)}
						{match?.fixture?.status?.short === 'ET' && (
							<p>({match?.score?.halftime?.home})</p>
						)}
						{match?.fixture?.status?.short === 'BT' && (
							<p>({match?.score?.halftime?.home})</p>
						)}
						{match?.fixture?.status?.short === 'P' && (
							<p>({match?.score?.halftime?.home})</p>
						)}
						{match?.fixture?.status?.short === 'FT' && (
							<p>({match?.score?.halftime?.home})</p>
						)}
						{match?.fixture?.status?.short === 'PST' && null}
						{match?.fixture?.status?.short === 'CANC' && null}
						{match?.fixture?.status?.short === 'AET' && (
							<p>({match?.score?.halftime?.home})</p>
						)}
						{match?.fixture?.status?.short === 'PEN' && (
							<p>({match?.score?.halftime?.home})</p>
						)}
					</div>
					<div className={styles.scoreHalfTime}>
						{match?.fixture?.status?.short === 'NS' && null}
						{match?.fixture?.status?.short === '1H' && (
							<p>({match?.score?.halftime?.away})</p>
						)}
						{match?.fixture?.status?.short === 'HT' && (
							<p>({match?.score?.halftime?.away})</p>
						)}
						{match?.fixture?.status?.short === '2H' && (
							<p>({match?.score?.halftime?.away})</p>
						)}
						{match?.fixture?.status?.short === 'ET' && (
							<p>({match?.score?.halftime?.away})</p>
						)}
						{match?.fixture?.status?.short === 'BT' && (
							<p>({match?.score?.halftime?.away})</p>
						)}
						{match?.fixture?.status?.short === 'P' && (
							<p>({match?.score?.halftime?.away})</p>
						)}
						{match?.fixture?.status?.short === 'FT' && (
							<p>({match?.score?.halftime?.away})</p>
						)}
						{match?.fixture?.status?.short === 'PST' && null}
						{match?.fixture?.status?.short === 'CANC' && null}
						{match?.fixture?.status?.short === 'AET' && (
							<p>({match?.score?.halftime?.away})</p>
						)}
						{match?.fixture?.status?.short === 'PEN' && (
							<p>({match?.score?.halftime?.away})</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
