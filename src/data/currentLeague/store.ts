import { create } from 'zustand';

import { fetchFromAPI } from '../helpers/fetchFromApi';

import { CurrentLeague, CurrentStanding } from './types';

interface CurrentLeagueStoreState {
	currentLeague: CurrentLeague;
	currentStandings: CurrentStanding[];
}

interface CurrentLeagueStoreActions {
	getRemoteCurrentLeague: (id: number) => Promise<any>;
	getRemoteCurrentStandings: (id: number, season: number) => Promise<any>;
	getCurrentSeasonYear: () => number | undefined;
}

type CurrentLeagueStore = CurrentLeagueStoreState & CurrentLeagueStoreActions;

export const useCurrentLeagueStore = create<CurrentLeagueStore>(
	(set, getState) => ({
		currentLeague: {} as CurrentLeague,
		currentStandings: [] as CurrentStanding[],

		getRemoteCurrentLeague: async (id: number) => {
			const data = await fetchFromAPI(`/leagues?id=${id}`);

			set({ currentLeague: data.response[0] });
		},

		getCurrentSeasonYear: () => {
			const { currentLeague } = getState();

			return currentLeague?.seasons?.find((season) => season.current)?.year;
		},

		getRemoteCurrentStandings: async (id: number, season: number) => {
			const data = await fetchFromAPI(
				`/standings?league=${id}&season=${season}`
			);

			set({ currentStandings: data.response });
		},
	})
);
