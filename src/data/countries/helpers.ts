import { Country } from './types';

export const returnCountryFlag = (countries: Country[], name: string) => {
	const country = countries.find((country) => country.name === name);

	if (country) {
		return country.flag;
	}
};
