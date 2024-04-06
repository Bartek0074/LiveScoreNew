import styles from './MatchPanel.module.scss';
import classNames from 'classnames';

import { useNavigate } from 'react-router-dom';

import ImageComponent from '../ImageComponent/ImageComponent';

import { MatchStatuses } from '../../utils/matchStatuses';
import { Match } from '../../data/matches/types';

import { formatDate, getMatchTime } from '../../data/matches/helpers';

interface Props {
	match: Match;
}

export default function MatchPanel({ match }: Props) {
	const navigate = useNavigate();
	const { fixture, teams, goals, score } = match;
	const statusShort = fixture?.status?.short;

	const getTeamNameClass = (winner: boolean | undefined) =>
		classNames(styles.teamName, {
			[styles.teamNameWinner]: winner,
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
		statusShort === MatchStatuses.FirstHalf ||
		statusShort === MatchStatuses.Halftime ||
		statusShort === MatchStatuses.SecondHalf ||
		statusShort === MatchStatuses.ExtraTime ||
		statusShort === MatchStatuses.BreakTime ||
		statusShort === MatchStatuses.PenaltyInProgress;

	const scoreClassess = classNames(styles.score, {
		[styles.scoreLive]: isMatchLive,
	});

	return (
		<div
			className={styles.matchPanel}
			onClick={() => navigate(`/match/${fixture?.id}`)}
		>
			<div className={styles.status}>
				{(statusShort === MatchStatuses.TimeToBeDefined ||
					statusShort === MatchStatuses.NotStarted ||
					statusShort === MatchStatuses.Finished ||
					statusShort === MatchStatuses.FinishedAfterExtraTime ||
					statusShort === MatchStatuses.FinishedAfterPenaltyShootout ||
					statusShort === MatchStatuses.Postponed ||
					statusShort === MatchStatuses.Cancelled ||
					statusShort === MatchStatuses.Abandoned ||
					statusShort === MatchStatuses.TechnicalLoss) && (
					<p className={styles.date}>{formatDate(new Date(fixture?.date))}</p>
				)}
				{getStatusMessage()}
			</div>
			<div className={styles.content}>
				<div className={styles.home}>
					<div className={styles.team}>
						<div className={styles.logo}>
							<ImageComponent
								src={teams?.home?.logo}
								alt={`${teams?.home?.name} logo`}
								loaderSize={12}
							/>
						</div>
						<div
							className={getTeamNameClass(teams?.home?.winner)}
							onClick={(e) => {
								e.stopPropagation();
								navigate(`/team/${teams?.home?.id}`);
							}}
						>
							<p>{teams?.home?.name}</p>
						</div>
					</div>
					<div className={scoreClassess}>
						<p className={styles.number}>
							{goals?.home !== null ? goals?.home : '-'}
						</p>
					</div>
				</div>
				<div className={styles.away}>
					<div className={styles.team}>
						<div className={styles.logo}>
							<ImageComponent
								src={teams?.away?.logo}
								alt={`${teams?.away?.name} logo`}
								loaderSize={12}
							/>
						</div>
						<div
							className={getTeamNameClass(teams?.away?.winner)}
							onClick={(e) => {
								e.stopPropagation();
								navigate(`/team/${teams?.away?.id}`);
							}}
						>
							<p>{teams?.away?.name}</p>
						</div>
					</div>
					<div className={scoreClassess}>
						<p className={styles.number}>
							{goals?.away !== null ? goals?.away : '-'}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
