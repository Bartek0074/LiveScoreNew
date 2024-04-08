import styles from './LeagueInfo.module.scss';

import { useNavigate } from 'react-router-dom';

import { MatchLeague } from '../../../data/currentMatch/types';
import { AppRoutes } from '../../../utils/routes';

import ImageComponent from '../../../components/ImageComponent/ImageComponent';

interface Props {
	league: MatchLeague;
}

export default function LeagueInfo({ league }: Props) {
	const navigate = useNavigate();

	const navToLeague = () => {
		navigate(AppRoutes.league.replace(':id', league.id.toString()));
	};

	return (
		<div className={styles.leagueInfo}>
			<div className={styles.flag}>
				<ImageComponent
					src={league.flag}
					alt={`${league.country} flag`}
					loaderSize={12}
				/>
			</div>
			<p className={styles.country}>{league.country}:</p>
			<div className={styles.league} onClick={navToLeague}>
				<div className={styles.logo}>
					<ImageComponent
						src={league.logo}
						alt={`${league.name} logo`}
						loaderSize={12}
					/>
				</div>
				<p className={styles.name}>{league.name}</p>
			</div>
		</div>
	);
}
