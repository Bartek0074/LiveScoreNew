import styles from './MatchEvent.module.scss';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../../utils/routes';
import {
	MatchEvent as MatchEventProps,
	EventDetail,
	EventType,
} from '../../../../data/currentMatch/types';

interface Props {
	event: MatchEventProps;
	isAway: boolean;
}

const svgSources = {
	yellowCard: '../icons/yellowCard.svg',
	redCard: '../icons/redCard.svg',
	goal: '../icons/goal.svg',
	ownGoal: '../icons/ownGoal.svg',
	penalty: '../icons/penalty.svg',
	penaltyMissed: '../icons/penaltyMissed.svg',
	substitution: '../icons/substitution.svg',
	offside: '../icons/offside.svg',
	var: '../icons/var.svg',
};

export default function MatchInfo({ event, isAway }: Props) {
	const navigate = useNavigate();

	const navToPlayer = (playerId: string) => {
		navigate(`${AppRoutes.player.replace(':id', playerId)}`);
	};

	const eventClasses = classNames(styles.event, {
		[styles.eventAway]: isAway,
	});

	const renderImage = (src: string, className: string) => (
		<img className={className} src={src} alt='' />
	);

	if (event.time.elapsed <= 0) return null;

	return (
		<div className={eventClasses}>
			<div className={styles.timeWrapper}>
				<p className={styles.time}>
					{event.time?.elapsed}
					{event.time?.extra ? `+${event.time.extra}` : ''}'
				</p>
			</div>
			<div className={styles.icon}>
				{event.type === EventType.Goal &&
					event.detail === EventDetail.NormalGoal &&
					renderImage(svgSources.goal, styles.goal)}
				{event.type === EventType.Goal &&
					event.detail === EventDetail.OwnGoal &&
					renderImage(svgSources.ownGoal, styles.ownGoal)}
				{event.type === EventType.Goal &&
					event.detail === EventDetail.Penalty &&
					renderImage(svgSources.penalty, styles.goal)}
				{event.type === EventType.Goal &&
					event.detail === EventDetail.MissedPenalty &&
					renderImage(svgSources.penaltyMissed, styles.penaltyMissed)}
				{event.type === EventType.Card &&
					event.detail === EventDetail.YellowCard &&
					renderImage(svgSources.yellowCard, styles.yellowCard)}
				{event.type === EventType.Card &&
					event.detail === EventDetail.RedCard &&
					renderImage(svgSources.redCard, styles.redCard)}
				{event.type === EventType.Substitution &&
					renderImage(svgSources.substitution, styles.substitution)}
				{event.type === EventType.Var &&
					event.detail === EventDetail.Offside &&
					renderImage(svgSources.offside, styles.offside)}
				{event.type === EventType.Var &&
					event.detail !== EventDetail.Offside &&
					renderImage(svgSources.var, styles.var)}
			</div>
			<p
				className={styles.player}
				onClick={() => navToPlayer(event.player.id.toString())}
			>
				{event.player.name}
			</p>
			{event.assist?.name && event.detail !== EventDetail.MissedPenalty && (
				<p
					className={styles.assist}
					onClick={() => navToPlayer(event.assist.id.toString())}
				>
					{event.assist.name}
				</p>
			)}
			{event.comments && <p className={styles.comments}>({event.comments})</p>}
			{(event.detail === EventDetail.Offside ||
				event.detail === EventDetail.PenaltyCancelled ||
				event.detail === EventDetail.PenaltyConfirmed ||
				event.detail === EventDetail.GoalCancelled ||
				event.detail === EventDetail.Penalty ||
				event.detail === EventDetail.MissedPenalty ||
				event.detail === EventDetail.OwnGoal) && (
				<p className={styles.detail}>({event.detail})</p>
			)}
		</div>
	);
}
