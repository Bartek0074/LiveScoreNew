import styles from './LeaguePanel.module.scss';

import { useNavigate } from 'react-router-dom';
import { usePinnedLeagueIdsStore } from '../../data/pinnedLeagueIds/store';

import { MatchLeague } from '../../data/matches/types';

import { Tooltip } from 'antd';

import { RiStarFill } from 'react-icons/ri';

import { colors } from '../../utils/colors';

interface Props {
	league: MatchLeague;
}

export default function LeaguePanel({ league }: Props) {
	const navigate = useNavigate();

	const { togglePinnedLeagueId } = usePinnedLeagueIdsStore();

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
				<Tooltip
					title={'Remove from pinned leagues'}
					color={colors.tooltipBackground}
				>
					<div
						className={styles.iconWrapper}
						onClick={() => togglePinnedLeagueId(league.id)}
					>
						<RiStarFill className={styles.icon} />
					</div>
				</Tooltip>
			</div>
		</div>
	);
}
