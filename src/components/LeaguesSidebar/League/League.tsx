import styles from './League.module.scss';
import classNames from 'classnames';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePinnedLeagueIdsStore } from '../../../data/pinnedLeagueIds/store';

import { Tooltip } from 'antd';

import { CountryLeague } from '../../../data/leagues/types';
import { AppRoutes } from '../../../utils/routes';

import { RiStarFill } from 'react-icons/ri';

import { colors } from '../../../utils/colors';

interface Props {
	league: CountryLeague;
}

export default function League({ league }: Props) {
	const navigate = useNavigate();

	const { pinnedLeagueIds, togglePinnedLeagueId } = usePinnedLeagueIdsStore();

	const [isPinned, setIsPinned] = useState(
		pinnedLeagueIds.includes(league.league.id)
	);

	const navToLeague = () => {
		navigate(`${AppRoutes.league.slice(0, -4)}/${league.league.id}`);
	};

	useEffect(() => {
		setIsPinned(pinnedLeagueIds.includes(league.league.id));
	}, [pinnedLeagueIds]);

	const leagueClasses = classNames(styles.league, {
		[styles.leaguePinned]: isPinned,
	});

	return (
		<div className={leagueClasses}>
			<Tooltip title={league.league.name} color={colors.tooltipBackground}>
				<p className={styles.text} onClick={navToLeague}>
					{league?.league?.name}
				</p>
			</Tooltip>
			<Tooltip
				title={
					isPinned ? 'Remove from pinned leagues' : 'Add to pinned leagues'
				}
				color={colors.tooltipBackground}
			>
				<div
					className={styles.iconWrapper}
					onClick={() => togglePinnedLeagueId(league.league.id)}
				>
					<RiStarFill className={styles.icon} />
				</div>
			</Tooltip>
		</div>
	);
}
