import { create } from 'zustand';

import { CountryLeague } from './types';

import { fetchFromAPI } from '../helpers/fetchFromApi';

interface LeaguesStoreState {
	leagues: CountryLeague[];
}

interface LeaguesStoreActions {
	getRemoteLeagues: () => Promise<CountryLeague[]>;
}

type LeaguesStore = LeaguesStoreState & LeaguesStoreActions;

export const useLeaguesStore = create<LeaguesStore>((set, getState) => ({
	leagues: [],

	getRemoteLeagues: async () => {
		try {
			const currentYear = new Date().getFullYear();
			const leagues = await fetchFromAPI(`leagues?season=${currentYear - 1}`);

			leagues.response = leagues.response.filter(
				(league: CountryLeague) => league.league.type === 'League'
			);

			set({ leagues: leagues.response });
			return leagues.response;
		} catch (error) {
			throw error;
		}
	},
}));
