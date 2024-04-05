import styles from './HomePage.module.scss';

import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import LoadingBall from '../../components/LoadingBall/LoadingBall';
import LeaguesSidebar from '../../components/LeaguesSidebar/LeaguesSidebar';
import Button from '../../components/Button/Button';
import { DatePicker } from 'antd';

import { useMatchesStore } from '../../data/matches/store';
import { usePinnedLeagueIdsStore } from '../../data/pinnedLeagueIds/store';

import { MatchStatuses } from '../../utils/matchStatuses';
import { MatchFilters } from '../../utils/matchFilters';
import { MatchesInLeague } from '../../data/matches/types';

import { returnSortedMatchesInLeague } from '../../data/matches/helpers';

const buttons = [
	{ text: 'All', filter: MatchFilters.All },
	{ text: 'Live', filter: MatchFilters.Live },
	{ text: 'Finished', filter: MatchFilters.Finished },
	{ text: 'Scheduled', filter: MatchFilters.Scheduled },
];

export default function HomePage() {
	const { matches, getRemoteMatches } = useMatchesStore();
	const { pinnedLeagueIds } = usePinnedLeagueIdsStore();

	const [statuses, setStatuses] = useState<MatchStatuses[]>([]);
	const [filter, setFilter] = useState<MatchFilters>(MatchFilters.All);

	const [loading, setLoading] = useState(true);

	const [sortedMatchesIneLeague, setSortedMatchesInLeague] = useState<
		MatchesInLeague[]
	>([]);

	const [date, setDate] = useState<Date | null>(new Date());

	useEffect(() => {
		switch (filter) {
			case MatchFilters.All:
				setStatuses([
					MatchStatuses.TimeToBeDefined,
					MatchStatuses.NotStarted,
					MatchStatuses.FirstHalf,
					MatchStatuses.Halftime,
					MatchStatuses.SecondHalf,
					MatchStatuses.ExtraTime,
					MatchStatuses.BreakTime,
					MatchStatuses.PenaltyInProgress,
					MatchStatuses.Suspended,
					MatchStatuses.Interrupted,
					MatchStatuses.Finished,
					MatchStatuses.FinishedAfterExtraTime,
					MatchStatuses.FinishedAfterPenaltyShootout,
					MatchStatuses.Postponed,
					MatchStatuses.Cancelled,
					MatchStatuses.Abandoned,
					MatchStatuses.TechnicalLoss,
					MatchStatuses.Walkover,
					MatchStatuses.Live,
				]);
				break;
			case MatchFilters.Live:
				setStatuses([
					MatchStatuses.FirstHalf,
					MatchStatuses.Halftime,
					MatchStatuses.SecondHalf,
					MatchStatuses.ExtraTime,
					MatchStatuses.BreakTime,
					MatchStatuses.PenaltyInProgress,
					MatchStatuses.Suspended,
					MatchStatuses.Interrupted,
				]);
				break;
			case MatchFilters.Finished:
				setStatuses([
					MatchStatuses.Finished,
					MatchStatuses.FinishedAfterExtraTime,
					MatchStatuses.FinishedAfterPenaltyShootout,
				]);
				break;
			case MatchFilters.Scheduled:
				setStatuses([MatchStatuses.TimeToBeDefined, MatchStatuses.NotStarted]);
				break;
			default:
				break;
		}
	}, [filter]);

	useEffect(() => {
		if (date) {
			setLoading(true);
			getRemoteMatches(date);
		}
	}, [date]);

	useEffect(() => {
		if (matches.length) {
			const newGrupedMatchesInLeague = returnSortedMatchesInLeague(
				pinnedLeagueIds,
				matches,
				statuses
			);
			setSortedMatchesInLeague(newGrupedMatchesInLeague);
			setLoading(false);
		}
	}, [matches, pinnedLeagueIds, statuses]);


	return (
		<div className={styles.homePage}>
			<div className={styles.sidebar}>
				<LeaguesSidebar />
			</div>
			<div className={styles.content}>
				<div className={styles.buttons}>
					{buttons.map((button, index) => (
						<div className={styles.button} key={index}>
							<Button
								text={button.text}
								onClick={() => setFilter(button.filter)}
							/>
						</div>
					))}
					<div className={styles.datePicker}>
						<DatePicker
							value={dayjs(date)}
							onChange={(e: any) => setDate(e?.$d)}
						/>
					</div>
				</div>
				{loading ? (
					<div className={styles.loading}>
						<LoadingBall size='large' />
					</div>
				) : (
					<div className={styles.leagueList}>
						<p>List</p>
					</div>
				)}
			</div>
		</div>
	);
}
