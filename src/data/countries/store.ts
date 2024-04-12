import { create } from 'zustand';

import { Country } from './types';

import { fetchFromAPI } from '../helpers/fetchFromApi';

interface CountriesStoreState {
	countries: Country[];
}

interface CountriesStoreActions {
	getRemoteCountries: () => Promise<void>;
}

type CountriesStore = CountriesStoreState & CountriesStoreActions;

export const useCountriesStore = create<CountriesStore>((set, getState) => ({
	countries: [],

	getRemoteCountries: async () => {
		const data = await fetchFromAPI('/countries');

		set({ countries: data.response });
	},
}));
