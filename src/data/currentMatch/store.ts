import { create } from 'zustand';

import { CurrentMatch } from './types';

import { fetchFromAPI } from '../helpers/fetchFromApi';

interface CurrentMatchStoreState {
	currentMatch: CurrentMatch;
	previousFetchCurrentMatch: CurrentMatch;
}

interface CurrentMatchStoreActions {
	getRemoteCurrentMatch: (id: number) => Promise<CurrentMatch>;
}

type CurrentMatchStore = CurrentMatchStoreState & CurrentMatchStoreActions;

export const useCurrentMatchStore = create<CurrentMatchStore>(
	(set, getState) => ({
		currentMatch: {} as CurrentMatch,
		previousFetchCurrentMatch: {} as CurrentMatch,

		getRemoteCurrentMatch: async (id: number) => {
			const previouseCurrentMatch = getState().currentMatch;

			try {
				const match = await fetchFromAPI(`fixtures?id=${id}`);
				set({
					currentMatch: match.response[0],
					previousFetchCurrentMatch: previouseCurrentMatch,
				});
				return match.response;
			} catch (error) {
				throw error;
			}
		},
	})
);
