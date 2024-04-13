import styles from './MatchPage.module.scss';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Result as AntdResult } from 'antd';

import LoadingBall from '../../components/LoadingBall/LoadingBall';
import Button from '../../components/Button/Button';
import Result from './Result/Result';
import LeagueInfo from './LeagueInfo/LeagueInfo';
import MatchInfo from './MatchInfo/MatchInfo';
import MatchSummary from './MatchSummary/MatchSummary';
import MatchStats from './MatchStats/MatchStats';
import MatchLineups from './MatchLineups/MatchLineups';
import MatchStandings from './MatchStandings/MatchStandings';

import { useCurrentMatchStore } from '../../data/currentMatch/store';
import { AppRoutes } from '../../utils/routes';

import { MatchPageFilters } from '../../utils/matchPageFilters';

const buttons = [
	{ text: 'Summary', filter: MatchPageFilters.Summary },
	{ text: 'Stats', filter: MatchPageFilters.Stats },
	{ text: 'Lineups', filter: MatchPageFilters.Lineups },
	{ text: 'Standings', filter: MatchPageFilters.Standings },
];

export default function MatchPage() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { currentMatch, getRemoteCurrentMatch } = useCurrentMatchStore();

	const [filter, setFilter] = useState<MatchPageFilters>(
		MatchPageFilters.Summary
	);

	const [loading, setLoading] = useState(true);

	const navToHome = () => {
		navigate(AppRoutes.home);
	};

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
			fetchDataInterval = setInterval(refetchData, 1000 * 30);
		};

		fetchData();
		fetchDataPeriodically();

		return () => {
			clearInterval(fetchDataInterval);
		};
	}, [id]);

	if (loading) {
		return (
			<div className={styles.matchPage}>
				<div className={styles.loading}>
					<LoadingBall size='large' />
				</div>
			</div>
		);
	}

	if (currentMatch === undefined || !currentMatch) {
		return (
			<div className={styles.matchPage}>
				<div className={styles.notFoundInfo}>
					<AntdResult
						status='404'
						title='Match not found'
						subTitle='The match you are looking for does not exist.'
						extra={<Button text='Go home' onClick={navToHome} />}
					/>
				</div>
			</div>
		);
	}

	const { league } = currentMatch;

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
						<MatchSummary match={currentMatch} />
					)}
					{filter === MatchPageFilters.Stats && (
						<MatchStats match={currentMatch} />
					)}
					{filter === MatchPageFilters.Lineups && (
						<MatchLineups match={currentMatch} />
					)}
					{filter === MatchPageFilters.Standings && (
						<MatchStandings leagueId={currentMatch.league.id} />
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
