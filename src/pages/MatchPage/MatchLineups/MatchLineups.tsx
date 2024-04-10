import styles from './MatchLineups.module.scss';

import { CurrentMatch, MatchPlayer } from '../../../data/currentMatch/types';
import Pitch from './Pitch/Pitch';
import PlayerRow from './PlayerRow/PlayerRow';

interface Props {
	match: CurrentMatch;
}

export default function MatchLineups({ match }: Props) {
	if (!match.lineups[0] || !match.players[0])
		return (
			<div className={styles.matchLineups}>
				<p className={styles.notAvailable}>
					Match lineups are not available.
				</p>
			</div>
		);

	return (
		<div className={styles.matchLineups}>
			<div className={styles.formationInfo}>
				<p className={styles.formation}>{match.lineups[0].formation}</p>
				<p className={styles.infoTitle}>Formation</p>
				<p className={styles.formation}>{match.lineups[1].formation}</p>
			</div>
			<div className={styles.pitch}>
				<Pitch match={match} />
			</div>
			<div className={styles.info}>
				<p className={styles.infoTitle}>Starting Lineups</p>
			</div>
			<div className={styles.playerList}>
				<div className={styles.home}>
					{match.lineups[0].startXI.map((player, index) => {
						const matchPlayer: MatchPlayer | undefined =
							match.players[0].players.find(
								(findPlayer) => findPlayer.player.id === player.player.id
							);
						if (matchPlayer) {
							return (
								<div key={index} className={styles.player}>
									<PlayerRow
										player={matchPlayer}
										events={match.events}
										number={player.player.number}
										isAway={false}
									/>
								</div>
							);
						}
						return null;
					})}
				</div>
				<div className={styles.away}>
					{match.lineups[1].startXI.map((player, index) => {
						const matchPlayer: MatchPlayer | undefined =
							match.players[1].players.find(
								(findPlayer) => findPlayer.player.id === player.player.id
							);
						if (matchPlayer) {
							return (
								<div key={index} className={styles.player}>
									<PlayerRow
										player={matchPlayer}
										events={match.events}
										number={player.player.number}
										isAway={true}
									/>
								</div>
							);
						}
						return null;
					})}
				</div>
			</div>
			<div className={styles.info}>
				<p className={styles.infoTitle}>Substitutes</p>
			</div>
			<div className={styles.playerList}>
				<div className={styles.home}>
					{match.lineups[0].substitutes.map((player, index) => {
						const matchPlayer: MatchPlayer | undefined =
							match.players[0].players.find(
								(findPlayer) => findPlayer.player.id === player.player.id
							);
						if (matchPlayer) {
							return (
								<div key={index} className={styles.player}>
									<PlayerRow
										player={matchPlayer}
										events={match.events}
										number={player.player.number}
										isAway={false}
									/>
								</div>
							);
						}
						return null;
					})}
				</div>
				<div className={styles.away}>
					{match.lineups[1].substitutes.map((player, index) => {
						const matchPlayer: MatchPlayer | undefined =
							match.players[1].players.find(
								(findPlayer) => findPlayer.player.id === player.player.id
							);
						if (matchPlayer) {
							return (
								<div key={index} className={styles.player}>
									<PlayerRow
										player={matchPlayer}
										events={match.events}
										number={player.player.number}
										isAway={true}
									/>
								</div>
							);
						}
						return null;
					})}
				</div>
			</div>
		</div>
	);
}
