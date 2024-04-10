import styles from './Pitch.module.scss';

import {
	CurrentMatch,
	PlayerPosition,
} from '../../../../data/currentMatch/types';
import Player from './Player/Player';

interface Props {
	match: CurrentMatch;
}

export default function Pitch({ match }: Props) {
	const homeStartXI = match.lineups[0].startXI.sort((a, b) => {
		return (
			Number(a.player.grid.split(':')[1]) + Number(b.player.grid.split(':')[1])
		);
	});
	const awayStartXI = match.lineups[1].startXI.sort((a, b) => {
		return (
			Number(a.player.grid.split(':')[1]) - Number(b.player.grid.split(':')[1])
		);
	});
	const homeFormationLength = match?.lineups[0].formation.split('-').length + 1;
	const awayFormationLength = match?.lineups[1].formation.split('-').length + 1;

	const homeGoalkeeperShirtColor =
		match?.lineups[0]?.team?.colors?.goalkeeper?.primary;
	const homeGoalkeeperNumberColor =
		match?.lineups[0]?.team?.colors?.goalkeeper?.number;
	const homePlayerNumberColor = match?.lineups[0]?.team?.colors?.player?.number;
	const homePlayerShirtColor = match?.lineups[0]?.team?.colors?.player?.primary;

	const awayGoalkeeperShirtColor =
		match?.lineups[1]?.team?.colors?.goalkeeper?.primary;
	const awayGoalkeeperNumberColor =
		match?.lineups[1]?.team?.colors?.goalkeeper?.number;
	const awayPlayerNumberColor = match?.lineups[1]?.team?.colors?.player?.number;
	const awayPlayerShirtColor = match?.lineups[1]?.team?.colors?.player?.primary;

	return (
		<div className={styles.pitch}>
			<div className={styles.background}>
				<img
					className={styles.vertical}
					src='../icons/pitchVertical.svg'
					alt='pitch'
				/>
				<img
					className={styles.horizontal}
					src='../icons/pitchHorizontal.svg'
					alt='pitch'
				/>
			</div>
			<div className={styles.home}>
				{Array.from({ length: homeFormationLength }).map((_, lineIndex) => {
					return (
						<div key={lineIndex} className={styles.line}>
							{homeStartXI.map((player, playerIndex) => {
								const matchPlayer = match.players[0].players.find(
									(findPlayer) => player.player.id === findPlayer.player.id
								);
								if (
									player?.player?.grid.startsWith(`${lineIndex + 1}`) &&
									matchPlayer
								) {
									return (
										<div key={playerIndex} className={styles.player}>
											<Player
												player={matchPlayer}
												events={match.events}
												number={player.player.number}
												shirtColor={
													player.player.pos === PlayerPosition.Goalkeeper
														? homeGoalkeeperShirtColor
														: homePlayerShirtColor
												}
												numberColor={
													player.player.pos === PlayerPosition.Goalkeeper
														? homeGoalkeeperNumberColor
														: homePlayerNumberColor
												}
											/>
										</div>
									);
								} else return null;
							})}
						</div>
					);
				})}
			</div>
			<div className={styles.away}>
				{Array.from({ length: awayFormationLength }).map((_, lineIndex) => {
					return (
						<div key={lineIndex} className={styles.line}>
							{awayStartXI.map((player, playerIndex) => {
								const matchPlayer = match.players[1].players.find(
									(findPlayer) => player.player.id === findPlayer.player.id
								);
								if (
									player?.player?.grid.startsWith(`${lineIndex + 1}`) &&
									matchPlayer
								) {
									return (
										<div key={playerIndex} className={styles.player}>
											<Player
												player={matchPlayer}
												events={match.events}
												number={player.player.number}
												shirtColor={
													player.player.pos === PlayerPosition.Goalkeeper
														? awayGoalkeeperShirtColor
														: awayPlayerShirtColor
												}
												numberColor={
													player.player.pos === PlayerPosition.Goalkeeper
														? awayGoalkeeperNumberColor
														: awayPlayerNumberColor
												}
											/>
										</div>
									);
								} else return null;
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
}
