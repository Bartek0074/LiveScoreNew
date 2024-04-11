import { create } from 'zustand';

import { fetchFromAPI } from '../helpers/fetchFromApi';

import { CurrentPlayer } from './types';

interface CurrentPlayerStoreState {
	playerSeasons: number[];
	currentPlayer: CurrentPlayer;
}

interface CurrentPlayerStoreActions {
	getRemoteSeasons: (id: number) => Promise<any>;
	getRemoteCurrentPlayer: (id: number, season: number) => Promise<any>;
}

type CurrentPlayerStore = CurrentPlayerStoreState & CurrentPlayerStoreActions;

export const useCurrentPlayerStore = create<CurrentPlayerStore>(
	(set, getState) => ({
		playerSeasons: [] as number[],
		currentPlayer: {} as CurrentPlayer,

		getRemoteSeasons: async (id: number) => {
			const data = await fetchFromAPI(`/players/seasons?player=${id}`);

			set({ playerSeasons: data.response });
		},

		getRemoteCurrentPlayer: async (id: number, season: number) => {
			const data = await fetchFromAPI(`/players?id=${id}&season=${season}`);

			set({ currentPlayer: data.response[0] });
		},
	})
);
