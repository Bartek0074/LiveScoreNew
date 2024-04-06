import styles from './PinnedLeague.module.scss';

import { useNavigate } from 'react-router-dom';

import { usePinnedLeagueIdsStore } from '../../../data/pinnedLeagueIds/store';

import { CountryLeague } from '../../../data/leagues/types';
import { AppRoutes } from '../../../utils/routes';

import { RiStarFill } from 'react-icons/ri';

interface Props {
	league: CountryLeague;
}

export default function PinnedLeague({ league }: Props) {
	const navigate = useNavigate();

	const { togglePinnedLeagueId } = usePinnedLeagueIdsStore();

	const navToLeague = () => {
		navigate(`${AppRoutes.league.slice(0, -4)}/${league.league.id}`);
	};

	return (
		<div className={styles.pinnedLeague} onClick={navToLeague}>
			<div className={styles.leftSection}>
				<img src={league.country.flag} alt={`Flag of ${league.country.name}`} />
				<p className={styles.text}>{league?.league?.name}</p>
			</div>
			<div
				className={styles.iconWrapper}
				onClick={(e) => {
					e.stopPropagation();
					togglePinnedLeagueId(league.league.id);
				}}
			>
				<RiStarFill className={styles.icon} />
			</div>
		</div>
	);
}
