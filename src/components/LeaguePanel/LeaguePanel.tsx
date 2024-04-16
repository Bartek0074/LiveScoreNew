import styles from './LeaguePanel.module.scss';
import classNames from 'classnames';

import { useNavigate } from 'react-router-dom';
import { usePinnedLeagueIdsStore } from '../../data/pinnedLeagueIds/store';

import { MatchLeague } from '../../data/currentMatch/types';

import ImageComponent from '../ImageComponent/ImageComponent';
import { Tooltip } from 'antd';

import { RiStarFill } from 'react-icons/ri';

import { colors } from '../../utils/colors';

interface Props {
	league: MatchLeague;
}

export default function LeaguePanel({ league }: Props) {
	const navigate = useNavigate();

	const { togglePinnedLeagueId, pinnedLeagueIds } = usePinnedLeagueIdsStore();

	const isPinned = pinnedLeagueIds.includes(league.id);

	const leagueClasses = classNames(styles.leaguePanel, {
		[styles.leaguePanelPinned]: isPinned,
	});

	return (
		<div className={leagueClasses}>
			<div className={styles.leftSection}>
				<div className={styles.flag}>
					<ImageComponent
						src={league.flag || '../icons/worldFlag.svg'}
						alt={`${league.country} flag`}
						loaderSize={12}
					/>
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
					title={
						isPinned ? 'Remove from pinned leagues' : 'Add to pinned leagues'
					}
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
