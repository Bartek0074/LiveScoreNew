import { MatchEvent } from './types';
import { EventType, EventDetail } from './types';

export const isNormalGoalEvent = (event: MatchEvent) => {
	return (
		event.type === EventType.Goal && event.detail === EventDetail.NormalGoal
	);
};

export const isOwnGoalEvent = (event: MatchEvent) => {
	return event.type === EventType.Goal && event.detail === EventDetail.OwnGoal;
};

export const isPenaltyGoalEvent = (event: MatchEvent) => {
	return event.type === EventType.Goal && event.detail === EventDetail.Penalty;
};

export const isPenaltyMissedEvent = (event: MatchEvent) => {
	return (
		event.type === EventType.Goal && event.detail === EventDetail.MissedPenalty
	);
};

export const isFirstYellowCardEvent = (
	event: MatchEvent,
	events: MatchEvent[]
) => {
	const yellowCards = events.filter(
		(e) =>
			e.type === EventType.Card &&
			e.detail === EventDetail.YellowCard &&
			event.player.id === e.player.id
	);
	return yellowCards.indexOf(event) === 0;
};

export const isSecondYellowCardEvent = (
	event: MatchEvent,
	events: MatchEvent[]
) => {
	const yellowCards = events.filter(
		(e) =>
			e.type === EventType.Card &&
			e.detail === EventDetail.YellowCard &&
			event.player.id === e.player.id
	);
	return yellowCards.indexOf(event) === 1;
};

export const isYellowCardEvent = (event: MatchEvent) => {
	return (
		event.type === EventType.Card && event.detail === EventDetail.YellowCard
	);
};

export const isRedCardEvent = (event: MatchEvent) => {
	return event.type === EventType.Card && event.detail === EventDetail.RedCard;
};

export const isRedCardAfterTwoYellowCardsEvent = (
	event: MatchEvent,
	events: MatchEvent[]
) => {
	const yellowCards = events.filter(
		(e) =>
			e.type === EventType.Card &&
			e.detail === EventDetail.YellowCard &&
			event.player.id === e.player.id
	);
	const redCards = events.filter(
		(e) =>
			e.type === EventType.Card &&
			e.detail === EventDetail.RedCard &&
			event.player.id === e.player.id
	);
	return yellowCards.length === 2 && redCards.length === 1 && isRedCardEvent(event);
};

export const isVarEvent = (event: MatchEvent) => {
	return event.type === EventType.Var && event.detail !== EventDetail.Offside;
};

export const isOffsideEvent = (event: MatchEvent) => {
	return event.type === EventType.Var && event.detail === EventDetail.Offside;
};
