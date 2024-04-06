import { create } from 'zustand';

import { Match } from './types';

import { fetchFromAPI } from '../helpers/fetchFromApi';

import { formatDate } from './helpers';

interface MatchesStoreState {
	matches: Match[];
	previousFetchMatches: Match[];
}

interface MatchesStoreActions {
	getRemoteMatches: (date: Date) => Promise<Match[]>;
}

type MatchesStore = MatchesStoreState & MatchesStoreActions;

export const useMatchesStore = create<MatchesStore>((set, getState) => ({
	matches: [],
	previousFetchMatches: [],

	getRemoteMatches: async (date: Date) => {
		const formattedDate = formatDate(date);

		try {
			const previouseMatches = getState().matches;
			const matches = await fetchFromAPI(`fixtures?date=${formattedDate}`);
			set({
				matches: matches.response,
				previousFetchMatches: previouseMatches,
			});
			return matches.response;
		} catch (error) {
			throw error;
		}
	},
}));
