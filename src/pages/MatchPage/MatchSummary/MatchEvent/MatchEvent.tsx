import styles from './MatchEvent.module.scss';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../../utils/routes';
import {
	MatchEvent as MatchEventProps,
	EventDetail,
	EventType,
} from '../../../../data/currentMatch/types';
import MatchIcon from '../../../../components/MatchIcon/MatchIcon';

interface Props {
	event: MatchEventProps;
	isAway: boolean;
}

export default function MatchInfo({ event, isAway }: Props) {
	const navigate = useNavigate();

	const navToPlayer = (playerId: string) => {
		navigate(`${AppRoutes.player.replace(':id', playerId)}`);
	};

	const eventClasses = classNames(styles.event, {
		[styles.eventAway]: isAway,
	});

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
					event.detail === EventDetail.NormalGoal && (
						<MatchIcon type='goal' size='medium' />
					)}
				{event.type === EventType.Goal &&
					event.detail === EventDetail.OwnGoal && (
						<MatchIcon type='ownGoal' size='medium' />
					)}
				{event.type === EventType.Goal &&
					event.detail === EventDetail.Penalty && (
						<MatchIcon type='penalty' size='medium' />
					)}
				{event.type === EventType.Goal &&
					event.detail === EventDetail.MissedPenalty && (
						<MatchIcon type='penaltyMissed' size='medium' />
					)}
				{event.type === EventType.Card &&
					event.detail === EventDetail.YellowCard && (
						<MatchIcon type='yellowCard' size='medium' />
					)}
				{event.type === EventType.Card &&
					event.detail === EventDetail.RedCard && (
						<MatchIcon type='redCard' size='medium' />
					)}
				{event.type === EventType.Substitution && (
					<MatchIcon type='substitution' size='medium' />
				)}
				{event.type === EventType.Var &&
					event.detail === EventDetail.Offside && (
						<MatchIcon type='offside' size='medium' />
					)}
				{event.type === EventType.Var &&
					event.detail !== EventDetail.Offside && (
						<MatchIcon type='var' size='medium' />
					)}
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
