export interface CountryLeague {
	country: Country;
	league: LeagueProps;
	season: Season;
}

export interface CountryProps {
	country: string;
	code: string;
	flag: string;
	leagues: CountryLeague[];
}

interface Country {
	code: string;
	flag: string;
	name: string;
}

interface LeagueProps {
	id: number;
	name: string;
	type: string;
	logo: string;
	
}

interface Season {
	cooverage: any;
	current: boolean;
	end: string;
	start: string;
	year: number;
}
