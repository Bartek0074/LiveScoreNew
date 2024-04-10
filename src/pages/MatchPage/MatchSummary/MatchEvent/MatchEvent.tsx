import styles from './MatchEvent.module.scss';
import classNames from 'classnames';

import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../../utils/routes';

import MatchIcon from '../../../../components/MatchIcon/MatchIcon';

import {
	MatchEvent as MatchEventProps,
	EventDetail,
	EventType,
} from '../../../../data/currentMatch/types';

import {
	isFirstYellowCardEvent,
	isNormalGoalEvent,
	isOffsideEvent,
	isOwnGoalEvent,
	isPenaltyGoalEvent,
	isPenaltyMissedEvent,
	isRedCardAfterTwoYellowCardsEvent,
	isRedCardEvent,
	isSecondYellowCardEvent,
	isVarEvent,
	isYellowCardEvent,
} from '../../../../data/currentMatch/helpers';

interface Props {
	event: MatchEventProps;
	events: MatchEventProps[];
	isAway: boolean;
}

export default function MatchInfo({ event, events, isAway }: Props) {
	const navigate = useNavigate();

	const navToPlayer = (playerId: string) => {
		navigate(`${AppRoutes.player.replace(':id', playerId)}`);
	};

	const eventClasses = classNames(styles.event, {
		[styles.eventAway]: isAway,
	});

	if (
		event.time.elapsed <= 0 ||
		isRedCardAfterTwoYellowCardsEvent(event, events)
	)
		return null;

	return (
		<div className={eventClasses}>
			<div className={styles.timeWrapper}>
				<p className={styles.time}>
					{event.time?.elapsed}
					{event.time?.extra ? `+${event.time.extra}` : ''}'
				</p>
			</div>
			<div className={styles.icon}>
				{isNormalGoalEvent(event) && <MatchIcon type='goal' size='medium' />}
				{isOwnGoalEvent(event) && <MatchIcon type='ownGoal' size='medium' />}
				{isPenaltyGoalEvent(event) && (
					<MatchIcon type='penalty' size='medium' />
				)}
				{isPenaltyMissedEvent(event) && (
					<MatchIcon type='penaltyMissed' size='medium' />
				)}
				{isFirstYellowCardEvent(event, events) && (
					<MatchIcon type='yellowCard' size='medium' />
				)}
				{isSecondYellowCardEvent(event, events) && (
					<MatchIcon type='secondYellowCard' size='medium' />
				)}
				{isRedCardEvent(event) && <MatchIcon type='redCard' size='medium' />}
				{event.type === EventType.Substitution && (
					<MatchIcon type='substitution' size='medium' />
				)}
				{isOffsideEvent(event) && <MatchIcon type='offside' size='medium' />}
				{isVarEvent(event) && <MatchIcon type='var' size='medium' />}
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
				event.detail === EventDetail.OwnGoal ||
				event.detail === EventDetail.CardUpgrade) && (
				<p className={styles.detail}>({event.detail})</p>
			)}
		</div>
	);
}
