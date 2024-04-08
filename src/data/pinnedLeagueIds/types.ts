export interface PinnedLeague {
	country: Country;
	league: LeagueProps;
	season: Season;
}

export interface CountryProps {
	country: string;
	code: string;
	flag: string;
	leagues: PinnedLeague[];
}

interface Country {
	code: string;
	flag: string;
	name: string;
}

interface LeagueProps {
	id: number;
	logo: string;
	name: string;
	type: string;
}

interface Season {
	cooverage: any;
	current: boolean;
	end: string;
	start: string;
	year: number;
}
