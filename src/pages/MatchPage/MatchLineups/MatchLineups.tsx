import styles from './MatchLineups.module.scss';

import { CurrentMatch } from '../../../data/currentMatch/types';
import Pitch from './Pitch/Pitch';

interface Props {
	match: CurrentMatch;
}

export default function MatchLineups({ match }: Props) {
	if (!match.lineups[0])
		return (
			<div className={styles.matchLineups}>
				<p className={styles.notAvailable}>
					Match stats are not available at the moment. Please try again later.
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
			<div className={styles.info}>
				<p className={styles.infoTitle}>Substitutes</p>
			</div>
		</div>
	);
}
