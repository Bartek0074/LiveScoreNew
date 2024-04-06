import styles from './MatchPanel.module.scss';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { MatchStatuses } from '../../utils/matchStatuses';
import ImageComponent from '../ImageComponent/ImageComponent';
import { Match } from '../../data/matches/types';
import { formatDate, getMatchTime } from '../../data/matches/helpers';

interface Props {
	match: Match;
}

export default function MatchPanel({ match }: Props) {
	const navigate = useNavigate();
	const { fixture, teams, goals, score } = match;

	const teamHomeNameClass = classNames(styles.teamName, {
		[styles.teamNameWinner]: teams?.home?.winner,
	});
	const teamAwayNameClass = classNames(styles.teamName, {
		[styles.teamNameWinner]: teams?.away?.winner,
	});

	const getStatusMessage = () => {
		switch (fixture?.status?.short) {
			case MatchStatuses.TimeToBeDefined:
				return <p>TBD</p>;
			case MatchStatuses.NotStarted:
				return <p>{getMatchTime(fixture?.date)}</p>;
			case MatchStatuses.FirstHalf:
				return (
					<p className={styles.timeLive}>
						{fixture?.status?.elapsed}
						<span className={styles.apostrophe}>'</span>
					</p>
				);
			case MatchStatuses.Halftime:
				return <p className={styles.timeLive}>Half Time</p>;
			case MatchStatuses.SecondHalf:
				return (
					<p className={styles.timeLive}>
						{fixture?.status?.elapsed}{' '}
						<span className={styles.apostrophe}>'</span>
					</p>
				);
			case MatchStatuses.ExtraTime:
				return (
					<p className={styles.timeLive}>
						ET
						<br />
						{fixture?.status?.elapsed}{' '}
						<span className={styles.apostrophe}>'</span>
					</p>
				);
			case MatchStatuses.BreakTime:
				return <p className={styles.timeLive}>Break Time</p>;
			case MatchStatuses.PenaltyInProgress:
				return <p className={styles.timeLive}>Pen.</p>;
			case MatchStatuses.Suspended:
				return <p>Suspended</p>;
			case MatchStatuses.Finished:
				return <p>Finished</p>;
			case MatchStatuses.FinishedAfterExtraTime:
				return <p>AET</p>;
			case MatchStatuses.FinishedAfterPenaltyShootout:
				return <p>Pen.</p>;
			case MatchStatuses.Postponed:
				return <p>Postponed</p>;
			case MatchStatuses.Cancelled:
				return <p>Cancelled</p>;
			case MatchStatuses.Abandoned:
				return <p>Abandoned</p>;
			case MatchStatuses.TechnicalLoss:
				return <p>Technical Loss</p>;
			default:
				return null;
		}
	};

	const isMatchLive =
		match?.fixture?.status?.short === MatchStatuses.FirstHalf ||
		match?.fixture?.status?.short === MatchStatuses.Halftime ||
		match?.fixture?.status?.short === MatchStatuses.SecondHalf ||
		match?.fixture?.status?.short === MatchStatuses.ExtraTime ||
		match?.fixture?.status?.short === MatchStatuses.PenaltyInProgress;

	const scoresClasses = classNames(styles.scores, {
		[styles.scoresLive]: isMatchLive,
	});

	return (
		<div
			className={styles.matchPanel}
			onClick={() => navigate(`/match/${fixture?.id}`)}
		>
			<div className={styles.status}>
				{(match?.fixture?.status?.short === MatchStatuses.TimeToBeDefined ||
					match?.fixture?.status?.short === MatchStatuses.NotStarted ||
					match?.fixture?.status?.short === MatchStatuses.Finished ||
					match?.fixture?.status?.short ===
						MatchStatuses.FinishedAfterExtraTime ||
					match?.fixture?.status?.short ===
						MatchStatuses.FinishedAfterPenaltyShootout ||
					match?.fixture?.status?.short === MatchStatuses.Postponed ||
					match?.fixture?.status?.short === MatchStatuses.Cancelled ||
					match?.fixture?.status?.short === MatchStatuses.Abandoned ||
					match?.fixture?.status?.short === MatchStatuses.TechnicalLoss) && (
					<p className={styles.date}>
						{formatDate(new Date(match?.fixture?.date))}
					</p>
				)}
				{getStatusMessage()}
			</div>
			<div className={styles.teams}>
				<div className={styles.team}>
					<div className={styles.logo}>
						<ImageComponent
							src={teams?.home?.logo}
							alt={`${teams?.home?.name} logo`}
							loaderSize={12}
						/>
					</div>
					<div
						className={teamHomeNameClass}
						onClick={(e) => {
							e.stopPropagation();
							navigate(`/team/${teams?.home?.id}`);
						}}
					>
						<p>{teams?.home?.name}</p>
					</div>
				</div>
				<div className={styles.team}>
					<div className={styles.logo}>
						<ImageComponent
							src={teams?.away?.logo}
							alt={`${teams?.away?.name} logo`}
							loaderSize={12}
						/>
					</div>
					<div
						className={teamAwayNameClass}
						onClick={(e) => {
							e.stopPropagation();
							navigate(`/team/${teams?.away?.id}`);
						}}
					>
						<p>{teams?.away?.name}</p>
					</div>
				</div>
			</div>
			<div className={scoresClasses}>
				<div className={styles.score}>
					<div className={styles.scoreExtraTime}>
						{(fixture?.status?.short === MatchStatuses.ExtraTime ||
							fixture?.status?.short === MatchStatuses.PenaltyInProgress) && (
							<p>{goals?.home}</p>
						)}
					</div>
					<div className={styles.scoreExtraTime}>
						{(fixture?.status?.short === MatchStatuses.ExtraTime ||
							fixture?.status?.short === MatchStatuses.PenaltyInProgress) && (
							<p>{goals?.away}</p>
						)}
					</div>
				</div>
				<div className={styles.score}>
					<div className={styles.scoreFullTime}>
						{fixture?.status?.short === MatchStatuses.FirstHalf && (
							<p>{goals?.home}</p>
						)}
						{fixture?.status?.short === MatchStatuses.Halftime && (
							<p>{goals?.home}</p>
						)}
						{fixture?.status?.short === MatchStatuses.SecondHalf && (
							<p>{goals?.home}</p>
						)}
						{fixture?.status?.short === MatchStatuses.ExtraTime && (
							<p className={styles.scoreFullTimeNotBold}>
								{score?.fulltime?.home}
							</p>
						)}
						{fixture?.status?.short === MatchStatuses.PenaltyInProgress && (
							<p className={styles.scoreFullTimeNotBold}>
								{score?.fulltime?.home}
							</p>
						)}
						{fixture?.status?.short === MatchStatuses.Finished && (
							<p>{score?.fulltime?.home}</p>
						)}
						{fixture?.status?.short ===
							MatchStatuses.FinishedAfterExtraTime && (
							<p className={styles.scoreFullTimeNotBold}>
								{score?.fulltime?.home}
							</p>
						)}
						{fixture?.status?.short ===
							MatchStatuses.FinishedAfterPenaltyShootout && (
							<p className={styles.scoreFullTimeNotBold}>
								{score?.fulltime?.home}
							</p>
						)}
					</div>
					<div className={styles.scoreFullTime}>
						{fixture?.status?.short === MatchStatuses.FirstHalf && (
							<p>{goals?.away}</p>
						)}
						{fixture?.status?.short === MatchStatuses.Halftime && (
							<p>{goals?.away}</p>
						)}
						{fixture?.status?.short === MatchStatuses.SecondHalf && (
							<p>{goals?.away}</p>
						)}
						{fixture?.status?.short === MatchStatuses.ExtraTime && (
							<p className={styles.scoreFullTimeNotBold}>
								{score?.fulltime?.away}
							</p>
						)}
						{fixture?.status?.short === MatchStatuses.PenaltyInProgress && (
							<p className={styles.scoreFullTimeNotBold}>
								{score?.fulltime?.away}
							</p>
						)}
						{fixture?.status?.short === MatchStatuses.Finished && (
							<p>{score?.fulltime?.away}</p>
						)}
						{fixture?.status?.short ===
							MatchStatuses.FinishedAfterExtraTime && (
							<p className={styles.scoreFullTimeNotBold}>
								{score?.fulltime?.away}
							</p>
						)}
						{fixture?.status?.short ===
							MatchStatuses.FinishedAfterPenaltyShootout && (
							<p className={styles.scoreFullTimeNotBold}>
								{score?.fulltime?.away}
							</p>
						)}
					</div>
				</div>
				<div className={styles.score}>
					<div className={styles.scoreHalfTime}>
						{(fixture?.status?.short === MatchStatuses.FirstHalf ||
							fixture?.status?.short === MatchStatuses.Halftime ||
							fixture?.status?.short === MatchStatuses.SecondHalf ||
							fixture?.status?.short === MatchStatuses.ExtraTime ||
							fixture?.status?.short === MatchStatuses.PenaltyInProgress ||
							fixture?.status?.short === MatchStatuses.Finished ||
							fixture?.status?.short === MatchStatuses.FinishedAfterExtraTime ||
							fixture?.status?.short ===
								MatchStatuses.FinishedAfterPenaltyShootout) && (
							<p>({score?.halftime?.home})</p>
						)}
					</div>
					<div className={styles.scoreHalfTime}>
						{(fixture?.status?.short === MatchStatuses.FirstHalf ||
							fixture?.status?.short === MatchStatuses.Halftime ||
							fixture?.status?.short === MatchStatuses.SecondHalf ||
							fixture?.status?.short === MatchStatuses.ExtraTime ||
							fixture?.status?.short === MatchStatuses.PenaltyInProgress ||
							fixture?.status?.short === MatchStatuses.Finished ||
							fixture?.status?.short === MatchStatuses.FinishedAfterExtraTime ||
							fixture?.status?.short ===
								MatchStatuses.FinishedAfterPenaltyShootout) && (
							<p>({score?.halftime?.away})</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
