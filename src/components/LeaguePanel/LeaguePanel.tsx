import styles from './LeaguePanel.module.scss';
import classNames from 'classnames';

import { useNavigate } from 'react-router-dom';
import { usePinnedLeagueIdsStore } from '../../data/pinnedLeagueIds/store';

import { MatchLeague } from '../../data/matches/types';

import { RiStarFill } from 'react-icons/ri';

interface Props {
	league: MatchLeague;
}

export default function LeaguePanel({ league }: Props) {
	const navigate = useNavigate();

	const { togglePinnedLeagueId } = usePinnedLeagueIdsStore();
	// console.log(league);
	return (
		<div className={styles.leaguePanel}>
			<div className={styles.leftSection}>
				<div className={styles.flag}>
					<img src={league.flag} alt={`${league.country} flag`} />
				</div>
				<p className={styles.country}>{league.country}:</p>
				<p
					className={styles.league}
					onClick={() => {
						navigate(`/league/${league.id}`);
					}}
				>
					{league.name}
				</p>
			</div>
			<div className={styles.rightSection}>
				<div
					className={styles.iconWrapper}
					onClick={(e) => togglePinnedLeagueId(league.id)}
				>
					<RiStarFill className={styles.icon} />
				</div>
			</div>
		</div>
	);
}
