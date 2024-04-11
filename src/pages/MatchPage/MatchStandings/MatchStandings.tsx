import styles from './MatchStandings.module.scss';

import { useState, useEffect } from 'react';

import LoadingBall from '../../../components/LoadingBall/LoadingBall';

import { useCurrentLeagueStore } from '../../../data/currentLeague/store';
import Standings from '../../../components/Standings/Standings';

interface Props {
	leagueId: number;
}

export default function MatchStandings({ leagueId }: Props) {
	const {
		currentLeague,
		currentStandings,
		getRemoteCurrentLeague,
		getRemoteCurrentStandings,
		getCurrentSeasonYear,
	} = useCurrentLeagueStore();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			getRemoteCurrentLeague(leagueId);
		};

		if (currentLeague?.league?.id !== leagueId) {
			fetchData();
		}
	}, []);

	useEffect(() => {
		let currentSeasonYear: number | undefined = undefined;

		if (currentLeague) {
			currentSeasonYear = getCurrentSeasonYear();
		}

		if (currentSeasonYear) {
			let fetchDataInterval: NodeJS.Timeout;

			const fetchData = async () => {
				setLoading(true);
				await getRemoteCurrentStandings(leagueId, Number(currentSeasonYear));
				setLoading(false);
			};

			const refetchData = async () => {
				await getRemoteCurrentStandings(leagueId, Number(currentSeasonYear));
			};

			const fetchDataPeriodically = () => {
				fetchDataInterval = setInterval(refetchData, 1000 * 60 * 5);
			};

			fetchData();
			fetchDataPeriodically();

			return () => {
				clearInterval(fetchDataInterval);
			};
		}
	}, [currentLeague]);

	if (loading) {
		return (
			<div className={styles.standings}>
				<div className={styles.loading}>
					<LoadingBall size='large' />
				</div>
			</div>
		);
	}

	if (!currentStandings[0])
		return (
			<div className={styles.standings}>
				<p className={styles.notAvailable}>
					Match standings are not available.
				</p>
			</div>
		);

	return (
		<div className={styles.standings}>
			{currentStandings[0]?.league.standings.map((standing, index) => {
				return (
					<div key={index} className={styles.standing}>
						<Standings
							standings={standing}
							withGroup={currentStandings[0].league.standings.length > 1}
						/>
					</div>
				);
			})}
		</div>
	);
}
