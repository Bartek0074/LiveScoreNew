import styles from './MatchPage.module.scss';

import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import LoadingBall from '../../components/LoadingBall/LoadingBall';

import { useCurrentMatchStore } from '../../data/currentMatch/store';
import { usePinnedLeagueIdsStore } from '../../data/pinnedLeagueIds/store';

import { MatchPageFilters } from '../../utils/matchPageFilters';
import LeaguePanel from '../../components/LeaguePanel/LeaguePanel';

const buttons = [
	{ text: 'Summary', filter: MatchPageFilters.Summary },
	{ text: 'Stats', filter: MatchPageFilters.Stats },
	{ text: 'Lineups', filter: MatchPageFilters.Lineups },
	{ text: 'Standings', filter: MatchPageFilters.Standings },
];

export default function MatchPage() {
	const { id } = useParams();

	const { currentMatch, getRemoteCurrentMatch } = useCurrentMatchStore();
	const { pinnedLeagueIds } = usePinnedLeagueIdsStore();

	const [filter, setFilter] = useState<MatchPageFilters>(
		MatchPageFilters.Summary
	);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let fetchDataInterval: NodeJS.Timeout;

		const fetchData = async () => {
			if (id) {
				setLoading(true);
				await getRemoteCurrentMatch(parseInt(id));
				setLoading(false);
			}
		};

		const refetchData = async () => {
			if (id) {
				await getRemoteCurrentMatch(parseInt(id));
			}
		};

		const fetchDataPeriodically = () => {
			fetchDataInterval = setInterval(refetchData, 30000);
		};

		fetchData();
		fetchDataPeriodically();

		return () => {
			clearInterval(fetchDataInterval);
		};
	}, [id]);

	const league = currentMatch.league;

	if (loading) {
		return (
			<div className={styles.matchPage}>
				<div className={styles.loading}>
					<LoadingBall size='large' />
				</div>
			</div>
		);
	}

	return (
		<div className={styles.matchPage}>
			<div className={styles.content}>
				<LeaguePanel league={league} />
			</div>
		</div>
	);
}
