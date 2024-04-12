import { create } from 'zustand';

import { fetchFromAPI } from '../helpers/fetchFromApi';

import { CurrentPlayer, CurrentPlayerTransfers } from './types';

interface CurrentPlayerStoreState {
	playerSeasons: number[];
	currentPlayer: CurrentPlayer;
	currentPlayerTransfers: CurrentPlayerTransfers;
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
		currentPlayerTransfers: {} as CurrentPlayerTransfers,

		getRemoteSeasons: async (id: number) => {
			const data = await fetchFromAPI(`/players/seasons?player=${id}`);

			set({ playerSeasons: data.response });
		},

		getRemoteCurrentPlayer: async (id: number, season: number) => {
			const currentPlayerData = await fetchFromAPI(
				`/players?id=${id}&season=${season}`
			);
			const currentPlayerTransfersData = await fetchFromAPI(
				`/transfers?player=${id}`
			);

			set({
				currentPlayer: currentPlayerData.response[0],
				currentPlayerTransfers: currentPlayerTransfersData.response[0],
			});
		},
	})
);
