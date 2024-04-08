import styles from './Result.module.scss';

import classNames from 'classnames';

import { useNavigate } from 'react-router-dom';

import { CurrentMatch } from '../../../data/currentMatch/types';
import { AppRoutes } from '../../../utils/routes';

import ImageComponent from '../../../components/ImageComponent/ImageComponent';

import { formatDate, getMatchTime } from '../../../data/matches/helpers';
import { MatchStatuses } from '../../../utils/matchStatuses';

interface Props {
	match: CurrentMatch;
}

export default function Result({ match }: Props) {
	const navigate = useNavigate();

	const shortStatus = match.fixture.status.short;
	const time = match.fixture.status.elapsed;

	const isMatchLive =
		shortStatus === MatchStatuses.FirstHalf ||
		shortStatus === MatchStatuses.Halftime ||
		shortStatus === MatchStatuses.SecondHalf ||
		shortStatus === MatchStatuses.ExtraTime ||
		shortStatus === MatchStatuses.BreakTime ||
		shortStatus === MatchStatuses.PenaltyInProgress ||
		shortStatus === MatchStatuses.Live ||
		shortStatus === MatchStatuses.Interrupted ||
		shortStatus === MatchStatuses.Suspended;

	const navToHomeTeam = () => {
		navigate(
			`${AppRoutes.team.replace(':id', match.teams.home.id.toString())}`
		);
	};
	const navToAwayTeam = () => {
		navigate(
			`${AppRoutes.team.replace(':id', match.teams.away.id.toString())}`
		);
	};

	const getStatusMessage = () => {
		switch (shortStatus) {
			case MatchStatuses.TimeToBeDefined:
				return <p className={styles.statusInfo}>Time to be defined</p>;
			case MatchStatuses.NotStarted:
				return <p className={styles.statusInfo}>Not started</p>;
			case MatchStatuses.FirstHalf:
				return (
					<>
						<p className={styles.statusInfo}>1st half</p>
						<p className={styles.statusTime}>
							{time}
							<span className={styles.apostrophe}>'</span>
						</p>
					</>
				);
			case MatchStatuses.Halftime:
				return <p className={styles.statusInfo}>Half time</p>;
			case MatchStatuses.SecondHalf:
				return (
					<>
						<p className={styles.statusInfo}>2nd half</p>
						<p className={styles.statusTime}>
							{time}
							<span className={styles.apostrophe}>'</span>
						</p>
					</>
				);
			case MatchStatuses.ExtraTime:
				return (
					<>
						<p className={styles.statusInfo}>Extra time</p>
						<p className={styles.statusTime}>
							{time}
							<span className={styles.apostrophe}>'</span>
						</p>
					</>
				);
			case MatchStatuses.BreakTime:
				return <p className={styles.statusInfo}>Break time</p>;
			case MatchStatuses.PenaltyInProgress:
				return <p className={styles.statusInfo}>Penalties</p>;
			case MatchStatuses.Suspended:
				return <p className={styles.statusInfo}>Suspended</p>;
			case MatchStatuses.Finished:
				return <p className={styles.statusInfo}>Finished</p>;
			case MatchStatuses.Interrupted:
				return <p className={styles.statusInfo}>Finished</p>;
			case MatchStatuses.FinishedAfterExtraTime:
				return <p className={styles.statusInfo}>After extra time</p>;
			case MatchStatuses.FinishedAfterPenaltyShootout:
				return <p className={styles.statusInfo}>After penalties</p>;
			case MatchStatuses.Postponed:
				return <p className={styles.statusInfo}>Postponed</p>;
			case MatchStatuses.Cancelled:
				return <p className={styles.statusInfo}>Cancelled</p>;
			case MatchStatuses.Abandoned:
				return <p className={styles.statusInfo}>Abandoned</p>;
			case MatchStatuses.TechnicalLoss:
				return <p className={styles.statusInfo}>Technical loss</p>;
			case MatchStatuses.Walkover:
				return <p className={styles.statusInfo}>Walkover</p>;
			case MatchStatuses.Live:
				return <p className={styles.statusInfo}>Awaiting Updates</p>;
			default:
				return null;
		}
	};

	const dateClasses = classNames(styles.date, {
		[styles.dateThroughLined]:
			shortStatus === MatchStatuses.TimeToBeDefined ||
			shortStatus === MatchStatuses.Postponed ||
			shortStatus === MatchStatuses.Cancelled ||
			shortStatus === MatchStatuses.Abandoned ||
			shortStatus === MatchStatuses.TechnicalLoss,
	});

	const resultClasses = classNames(styles.result, {
		[styles.resultLive]: isMatchLive,
	});

	return (
		<div className={resultClasses}>
			<div className={styles.home}>
				<div className={styles.team}>
					<div className={styles.logo} onClick={navToHomeTeam}>
						<ImageComponent
							src={match.teams.home.logo}
							alt={`${match.teams.home.name} logo`}
							loaderSize={32}
						/>
					</div>
					<div
						className={classNames(styles.teamName, {
							[styles.teamNameWinner]: match.teams.home.winner,
						})}
					>
						<p onClick={navToHomeTeam}>{match.teams.home.name}</p>
					</div>
				</div>
			</div>
			<div className={styles.middleSection}>
				<p className={dateClasses}>
					{formatDate(new Date(match.fixture.date))}{' '}
					{getMatchTime(match.fixture.date)}
				</p>

				<div className={styles.score}>
					<p className={styles.scoreNumber}>
						{match.goals.home} - {match.goals.away}
					</p>
				</div>

				<div className={styles.status}>{getStatusMessage()}</div>
			</div>
			<div className={styles.away}>
				<div className={styles.team}>
					<div className={styles.logo} onClick={navToAwayTeam}>
						<ImageComponent
							src={match.teams.away.logo}
							alt={`${match.teams.away.name} logo`}
							loaderSize={32}
						/>
					</div>
					<div
						className={classNames(styles.teamName, {
							[styles.teamNameWinner]: match.teams.away.winner,
						})}
					>
						<p onClick={navToAwayTeam}>{match.teams.away.name}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
