import styles from './PlayerRow.module.scss';
import classNames from 'classnames';

import { useNavigate } from 'react-router-dom';

import MatchIcon from '../../../../components/MatchIcon/MatchIcon';
import PlayerRating from '../../../../components/PlayerRating/PlayerRating';

import { AppRoutes } from '../../../../utils/routes';
import {
	MatchPlayer,
	MatchEvent,
	EventDetail,
	EventType,
} from '../../../../data/currentMatch/types';

interface Props {
	player: MatchPlayer;
	events: MatchEvent[];
	number: number;
	isAway: boolean;
}

export default function PlayerRow({ player, events, number, isAway }: Props) {
	const navigate = useNavigate();

	const navToPlayer = () => {
		navigate(`${AppRoutes.player.replace(':id', player.player.id.toString())}`);
	};

	const firstName = player.player.name.split(' ')[0];
	const lastName = player.player.name.split(' ')[1];

	const playerRating = parseFloat(player.statistics[0].games.rating);

	const playerEvents = events.filter(
		(event) =>
			event.player.id === player.player.id ||
			(event.type === EventType.Substitution &&
				event.assist.id === player.player.id)
	);

	const playerGoalsCount = playerEvents.filter(
		(event) =>
			event.type === EventType.Goal &&
			(event.detail === EventDetail.NormalGoal ||
				event.detail === EventDetail.Penalty)
	).length;

	const playerOwnGoalsCount = playerEvents.filter(
		(event) =>
			event.type === EventType.Goal && event.detail === EventDetail.OwnGoal
	).length;

	const isPlayerSubstituted = playerEvents.some(
		(event) => event.type === EventType.Substitution
	);

	const playerYellowCardsCount = playerEvents.filter(
		(event) =>
			event.type === EventType.Card && event.detail === EventDetail.YellowCard
	).length;

	const playerRedCardsCount = playerEvents.filter(
		(event) =>
			event.type === EventType.Card && event.detail === EventDetail.RedCard
	).length;

	const playerRowClasses = classNames(styles.playerRow, {
		[styles.playerRowAway]: isAway,
	});

	return (
		<div className={playerRowClasses}>
			<div className={styles.number}>
				<p>{number}</p>
			</div>

			<div className={styles.name}>
				<p onClick={navToPlayer}>
					{lastName ? `${lastName} ${firstName.charAt(0)}.` : firstName}
				</p>
			</div>
			{playerRating ? (
				<div className={styles.rating}>
					<PlayerRating value={playerRating} size='small' />
				</div>
			) : null}
			<div className={styles.icons}>
				{isPlayerSubstituted && (
					<MatchIcon type='substitution' size='small' color='dark' />
				)}
				{playerYellowCardsCount === 2 && (
					<MatchIcon type='secondYellowCard' size='small' color='dark' />
				)}
				{playerRedCardsCount === 1 && playerYellowCardsCount !== 2 && (
					<MatchIcon type='redCard' size='small' color='dark' />
				)}
				{playerYellowCardsCount > 0 && (
					<MatchIcon type='yellowCard' size='small' color='dark' />
				)}

				{playerOwnGoalsCount > 0 && (
					<MatchIcon
						type='ownGoal'
						size='small'
						count={playerOwnGoalsCount > 1 ? playerOwnGoalsCount : undefined}
						color='dark'
					/>
				)}
				{playerGoalsCount > 0 && (
					<MatchIcon
						type='goal'
						size='small'
						count={playerGoalsCount > 1 ? playerGoalsCount : undefined}
						color='dark'
					/>
				)}
			</div>
		</div>
	);
}
