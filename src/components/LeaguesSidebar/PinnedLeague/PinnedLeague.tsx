import styles from './PinnedLeague.module.scss';

import { useNavigate } from 'react-router-dom';

import { usePinnedLeagueIdsStore } from '../../../data/pinnedLeagueIds/store';

import { Tooltip } from 'antd';

import { CountryLeague } from '../../../data/leagues/types';
import { AppRoutes } from '../../../utils/routes';

import { RiStarFill } from 'react-icons/ri';
import ImageComponent from '../../ImageComponent/ImageComponent';

import { colors } from '../../../utils/colors';

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
			<Tooltip
				title={`${league.country.name}: ${league.league.name}`}
				color={colors.tooltipBackground}
			>
				<div className={styles.leftSection}>
					<div className={styles.flag}>
						<ImageComponent
							src={league.country.flag || '../icons/worldFlag.svg'}
							alt={`Flag of ${league.country.name}`}
							loaderSize={12}
						/>
					</div>
					<p className={styles.text}>{league?.league?.name}</p>
				</div>
			</Tooltip>
			<Tooltip title='Remove from pinned leagues' color={colors.tooltipBackground}>
				<div
					className={styles.iconWrapper}
					onClick={(e) => {
						e.stopPropagation();
						togglePinnedLeagueId(league.league.id);
					}}
				>
					<RiStarFill className={styles.icon} />
				</div>
			</Tooltip>
		</div>
	);
}
