import styles from './MatchPanel.module.scss';
import classNames from 'classnames';

import { useNavigate } from 'react-router-dom';

import ImageComponent from '../ImageComponent/ImageComponent';

import { MatchStatuses } from '../../utils/matchStatuses';
import { Match } from '../../data/matches/types';
import { useMatchesStore } from '../../data/matches/store';

import { formatDate, getMatchTime } from '../../data/matches/helpers';

interface Props {
	match: Match;
}

export default function MatchPanel({ match }: Props) {
	const navigate = useNavigate();

	const { fixture, teams, goals } = match;
	const statusShort = fixture?.status?.short;

	const { previousFetchMatches } = useMatchesStore();

	const getTeamNameClass = (winner: boolean | undefined) =>
		classNames(styles.teamName, {
			[styles.teamNameWinner]: winner,
		});

	const getStatusMessage = () => {
		switch (fixture?.status?.short) {
			case MatchStatuses.TimeToBeDefined:
				return <p className={styles.time}>TBD</p>;
			case MatchStatuses.NotStarted:
				return <p className={styles.time}>{getMatchTime(fixture?.date)}</p>;
			case MatchStatuses.FirstHalf:
				return (
					<p className={styles.time}>
						<span className={styles.number}>{fixture?.status?.elapsed}</span>
						<span className={styles.apostrophe}>'</span>
					</p>
				);
			case MatchStatuses.Halftime:
				return <p className={styles.time}>Half Time</p>;
			case MatchStatuses.SecondHalf:
				return (
					<p className={styles.time}>
						<span className={styles.number}>{fixture?.status?.elapsed}</span>
						<span className={styles.apostrophe}>'</span>
					</p>
				);
			case MatchStatuses.ExtraTime:
				return (
					<p className={styles.time}>
						ET
						<br />
						<span className={styles.number}>{fixture?.status?.elapsed}</span>
						<span className={styles.apostrophe}>'</span>
					</p>
				);
			case MatchStatuses.BreakTime:
				return <p className={styles.time}>Break Time</p>;
			case MatchStatuses.PenaltyInProgress:
				return <p className={styles.time}>Pen.</p>;
			case MatchStatuses.Suspended:
				return <p className={styles.time}>Suspended</p>;
			case MatchStatuses.Interrupted:
				return <p className={styles.time}>Interrupted</p>;
			case MatchStatuses.Finished:
				return <p className={styles.time}>Finished</p>;
			case MatchStatuses.FinishedAfterExtraTime:
				return <p className={styles.time}>AET</p>;
			case MatchStatuses.FinishedAfterPenaltyShootout:
				return <p className={styles.time}>Pen.</p>;
			case MatchStatuses.Postponed:
				return <p className={styles.time}>Postponed</p>;
			case MatchStatuses.Cancelled:
				return <p className={styles.time}>Cancelled</p>;
			case MatchStatuses.Abandoned:
				return <p className={styles.time}>Abandoned</p>;
			case MatchStatuses.TechnicalLoss:
				return <p className={styles.time}>Technical Loss</p>;
			case MatchStatuses.Walkover:
				return <p className={styles.time}>Walkover</p>;
			case MatchStatuses.Live:
				return <p className={styles.time}>Awaiting Updates</p>;
			default:
				return null;
		}
	};

	const matchFromPrevFetch: Match | undefined = previousFetchMatches.find(
		(prevMatch) => prevMatch.fixture.id === fixture?.id
	);

	let hasHomeTeamScored = false;
	let hasAwayTeamScored = false;

	if (matchFromPrevFetch) {
		hasHomeTeamScored = matchFromPrevFetch.goals.home === goals?.home - 1;
		hasAwayTeamScored = matchFromPrevFetch.goals.away === goals?.away - 1;
	}

	const isMatchLive =
		statusShort === MatchStatuses.FirstHalf ||
		statusShort === MatchStatuses.Halftime ||
		statusShort === MatchStatuses.SecondHalf ||
		statusShort === MatchStatuses.ExtraTime ||
		statusShort === MatchStatuses.BreakTime ||
		statusShort === MatchStatuses.PenaltyInProgress ||
		statusShort === MatchStatuses.Live ||
		statusShort === MatchStatuses.Interrupted ||
		statusShort === MatchStatuses.Suspended;

	const scoreClassess = classNames(styles.score, {
		[styles.scoreLive]: isMatchLive,
	});

	const matchPanelClassess = classNames(styles.matchPanel, {
		[styles.matchPanelChange]: hasHomeTeamScored || hasAwayTeamScored,
		[styles.matchPanelLive]: isMatchLive,
	});

	const homeClassess = classNames(styles.home, {
		[styles.homeScore]: hasHomeTeamScored,
	});
	const awayClassess = classNames(styles.away, {
		[styles.awayScore]: hasAwayTeamScored,
	});

	return (
		<div
			className={matchPanelClassess}
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
				<div className={homeClassess}>
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
						<p className={styles.goalInfo}>GOAL</p>
						<p className={styles.number}>
							{goals?.home !== null ? goals?.home : '-'}
						</p>
					</div>
				</div>
				<div className={awayClassess}>
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
						<p className={styles.goalInfo}>GOAL</p>
						<p className={styles.number}>
							{goals?.away !== null ? goals?.away : '-'}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
