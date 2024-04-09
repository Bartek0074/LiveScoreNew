import styles from './Pitch.module.scss';
import classNames from 'classnames';

import { CurrentMatch } from '../../../../data/currentMatch/types';
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
								if (player?.player?.grid.startsWith(`${lineIndex + 1}`)) {
									return (
										<div key={playerIndex} className={styles.player}>
											<Player
												playerId={player.player.id}
												name={player.player.name}
												number={player.player.number}
												shirtColor={
													player.player.pos === 'G'
														? homeGoalkeeperShirtColor
														: homePlayerShirtColor
												}
												numberColor={
													player.player.pos === 'G'
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
								if (player?.player?.grid.startsWith(`${lineIndex + 1}`)) {
									return (
										<div key={playerIndex} className={styles.player}>
											<Player
												playerId={player.player.id}
												name={player.player.name}
												number={player.player.number}
												shirtColor={
													player.player.pos === 'G'
														? awayGoalkeeperShirtColor
														: awayPlayerShirtColor
												}
												numberColor={
													player.player.pos === 'G'
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
