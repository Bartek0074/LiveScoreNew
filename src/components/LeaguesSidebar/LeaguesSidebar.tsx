import styles from './LeaguesSidebar.module.scss';

import { useEffect, useState } from 'react';

import { usePinnedLeagueIdsStore } from '../../data/pinnedLeagueIds/store';
import { useLeaguesStore } from '../../data/leagues/store';
import { CountryProps, CountryLeague } from '../../data/leagues/types';

import Country from './Country/Country';
import LoadingBall from '../LoadingBall/LoadingBall';

import { returnCountries } from '../../data/leagues/helpers';
import PinnedLeague from './PinnedLeague/PinnedLeague';

export default function LeaguesSidebar() {
	const { leagues, getRemoteLeagues } = useLeaguesStore();
	const { pinnedLeagueIds } = usePinnedLeagueIdsStore();

	const [countries, setCountries] = useState<CountryProps[]>([]);

	const [pinnedLeagues, setPinnedLeagues] = useState<CountryLeague[]>([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (leagues.length) return;
		getRemoteLeagues();
	}, []);

	useEffect(() => {
		if (!leagues.length) return;
		setCountries(returnCountries(leagues));

		setTimeout(() => setLoading(false), 250);
	}, [leagues]);

	useEffect(() => {
		let newPinnedLeagues: CountryLeague[] = [];

		pinnedLeagueIds.forEach((id) => {
			const league = leagues.find((league) => league.league.id === id);
			if (league) newPinnedLeagues.push(league);
		});

		setPinnedLeagues(newPinnedLeagues);
	}, [leagues, pinnedLeagueIds]);

	if (loading)
		return (
			<div className={styles.loading}>
				<LoadingBall size='small' />
			</div>
		);

	return (
		<div className={styles.leaguesSidebar}>
			<div className={styles.leagues}>
				<p className={styles.title}>Pinned leagues</p>
				{pinnedLeagues.map((league, index) => {
					return (
						<div key={index} className={styles.league}>
							<PinnedLeague league={league} />
						</div>
					);
				})}
				{!pinnedLeagues.length ? (
					<div className={styles.noPinnedLeaguesInfo}>
						<p>
							To select your leagues just click the ✩ icon located next to
							league names.
						</p>
					</div>
				) : null}
			</div>
			<div className={styles.countries}>
				<p className={styles.title}>Countries</p>
				{countries.map((country, index) => {
					return <Country key={index} country={country} />;
				})}
			</div>
		</div>
	);
}
