import styles from './MatchPage.module.scss';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LoadingBall from '../../components/LoadingBall/LoadingBall';
import Button from '../../components/Button/Button';

import { useCurrentMatchStore } from '../../data/currentMatch/store';

import { MatchPageFilters } from '../../utils/matchPageFilters';
import LeagueInfo from './LeagueInfo/LeagueInfo';
import Result from './Result/Result';
import MatchInfo from './MatchInfo/MatchInfo';

const buttons = [
	{ text: 'Summary', filter: MatchPageFilters.Summary },
	{ text: 'Stats', filter: MatchPageFilters.Stats },
	{ text: 'Lineups', filter: MatchPageFilters.Lineups },
	{ text: 'Standings', filter: MatchPageFilters.Standings },
];

export default function MatchPage() {
	const { id } = useParams();

	const { currentMatch, getRemoteCurrentMatch } = useCurrentMatchStore();

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

	const { league } = currentMatch;

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
				<div className={styles.leagueInfo}>
					<LeagueInfo league={league} />
				</div>
				<div className={styles.result}>
					<Result match={currentMatch} />
				</div>
				<div className={styles.buttons}>
					{buttons.map((button, index) => (
						<Button
							key={index}
							text={button.text}
							active={filter === button.filter}
							onClick={() => setFilter(button.filter)}
						/>
					))}
				</div>
				<div className={styles.filteredContent}>
					{filter === MatchPageFilters.Summary && (
						<div className={styles.summary}>
							<p>Summary</p>
						</div>
					)}
					{filter === MatchPageFilters.Stats && (
						<div className={styles.stats}>
							<p>Stats</p>
						</div>
					)}
					{filter === MatchPageFilters.Lineups && (
						<div className={styles.lineups}>
							<p>Lineups</p>
						</div>
					)}
					{filter === MatchPageFilters.Standings && (
						<div className={styles.standings}>
							<p>Standings</p>
						</div>
					)}
				</div>
				{currentMatch.fixture.venue.name || currentMatch.fixture.referee ? (
					<div className={styles.matchInfo}>
						<MatchInfo match={currentMatch} />
					</div>
				) : null}
			</div>
		</div>
	);
}
