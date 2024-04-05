import { create } from 'zustand';

import { League } from './types';

import { fetchFromAPI } from '../helpers/fetchFromApi';

interface LeaguesStoreState {
	leagues: League[];
}

interface LeaguesStoreActions {
    getRemoteLeagues: () => Promise<League[]>;
}

type LeaguesStore = LeaguesStoreState & LeaguesStoreActions;

export const useLeaguesStore = create<LeaguesStore>((set, getState) => ({
	leagues: [],

	getRemoteLeagues: async () => {
		try {
			const currentYear = new Date().getFullYear();
			const leagues = await fetchFromAPI(`leagues?season=${currentYear - 1}`);
			set({ leagues: leagues.response });
			return leagues.response;
		} catch (error) {
			throw error;
		}
	},
}));
