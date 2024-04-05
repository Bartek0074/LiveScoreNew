import { create } from 'zustand';

import Cookies from 'universal-cookie';
import { CookiesEnum } from '../../utils/cookies';

interface PinnedLeagueIdsStoreState {
	pinnedLeagueIds: number[];
}

interface PinnedLeagueIdsStoreActions {
	getPinnedLeagueIds: () => void;
	togglePinnedLeagueId: (leagueId: number) => void;
}

type PinnedLeagueIdsStore = PinnedLeagueIdsStoreState &
	PinnedLeagueIdsStoreActions;

export const usePinnedLeagueIdsStore = create<PinnedLeagueIdsStore>(
	(set, getState) => ({
		pinnedLeagueIds: [],

		getPinnedLeagueIds: () => {
			const cookies = new Cookies();
			const pinnedLeagueIds = cookies.get(CookiesEnum.pinnedLeagues) || [];
			set({ pinnedLeagueIds });
		},

		togglePinnedLeagueId: (leagueId: number) => {
			const cookies = new Cookies();
			const pinnedLeagues = getState().pinnedLeagueIds;

			if (pinnedLeagues.includes(leagueId)) {
				const newPinnedLeagues = pinnedLeagues.filter(
					(id: number) => id !== leagueId
				);
				cookies.set(CookiesEnum.pinnedLeagues, newPinnedLeagues);
				set({ pinnedLeagueIds: newPinnedLeagues });
			} else {
				cookies.set(CookiesEnum.pinnedLeagues, [...pinnedLeagues, leagueId]);
				set({ pinnedLeagueIds: [...pinnedLeagues, leagueId] });
			}
		},
	})
);
