import styles from './Player.module.scss';
import classNames from 'classnames';

import { useNavigate } from 'react-router-dom';

import MatchIcon from '../../../../../components/MatchIcon/MatchIcon';

import { AppRoutes } from '../../../../../utils/routes';
import { FaTshirt } from 'react-icons/fa';
import {
	MatchPlayer,
	MatchEvent,
	EventDetail,
	EventType,
} from '../../../../../data/currentMatch/types';

interface Props {
	player: MatchPlayer;
	events: MatchEvent[];
	number: number;
	shirtColor: string;
	numberColor: string;
}

export default function Player({
	player,
	events,
	number,
	shirtColor,
	numberColor,
}: Props) {
	const navigate = useNavigate();

	const navToPlayer = () => {
		navigate(`${AppRoutes.player.replace(':id', player.player.id.toString())}`);
	};

	const lastName = player.player.name.split(' ')[1];

	const playerRating = parseFloat(player.statistics[0].games.rating);

	const playerEvents = events.filter(
		(event) => event.player.id === player.player.id
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

	const ratingClasses = classNames(styles.rating, {
		[styles.ratingVeryGood]: playerRating >= 9,
		[styles.ratingGood]: playerRating < 9 && playerRating >= 7,
		[styles.ratingAverage]: playerRating < 7 && playerRating >= 5,
		[styles.ratingBad]: playerRating < 5 && playerRating >= 3,
		[styles.ratingVeryBad]: playerRating < 3,
	});

	return (
		<div className={styles.player}>
			<div className={styles.jersey}>
				<FaTshirt
					className={styles.icon}
					style={{
						color: `#${shirtColor}`,
					}}
				/>
				<span
					className={styles.number}
					style={{
						color: `#${numberColor}`,
					}}
				>
					{number}
				</span>
			</div>
			<div className={styles.name}>
				<p onClick={navToPlayer}>{lastName}</p>
			</div>
			<div className={ratingClasses}>
				<p>{playerRating.toFixed(1)}</p>
			</div>
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
