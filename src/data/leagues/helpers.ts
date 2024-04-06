import { CountryLeague, CountryProps } from './types';

export const returnCountries = (leagues: CountryLeague[]) => {
	const countries = leagues.reduce((acc: CountryProps[], league: CountryLeague) => {
		const { country } = league;
		const countryIndex = acc.findIndex((c) => c.country === country.name);

		if (countryIndex === -1) {
			acc.push({
				country: country.name,
				code: country.code,
				flag: country.flag,
				leagues: [league],
			});
		} else {
			acc[countryIndex].leagues.push(league);
		}

		return acc;
	}, []);

	countries.sort((a, b) => a.country.localeCompare(b.country));

	return countries;
};
