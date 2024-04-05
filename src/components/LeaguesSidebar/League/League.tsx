import styles from './League.module.scss';
import classNames from 'classnames';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePinnedLeagueIdsStore } from '../../../data/pinnedLeagueIds/store';

import { League as LeagueType } from '../../../data/leagues/types';
import { AppRoutes } from '../../../utils/routes';

import { RiStarFill } from 'react-icons/ri';

interface Props {
	league: LeagueType;
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
			<p className={styles.text} onClick={navToLeague}>
				{league?.league?.name}
			</p>
			<div
				className={styles.iconWrapper}
				onClick={() => togglePinnedLeagueId(league.league.id)}
			>
				<RiStarFill className={styles.icon} />
			</div>
		</div>
	);
}
