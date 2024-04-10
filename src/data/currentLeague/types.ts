export interface CurrentLeague {
	league: LeagueProps;
	country: CountryProps;
	seasons: SeasonProps[];
}

export interface CurrentStanding {
	league: {
		id: number;
		name: string;
		country: string;
		logo: string;
		flag: string;
		season: number;
		standings: [StandingProps[]];
	};
}

interface LeagueProps {
	id: number;
	name: string;
	type: string;
	logo: string;
}

interface CountryProps {
	name: string;
	cade: string;
	flag: string;
}

interface SeasonProps {
	year: number;
	start: string;
	end: string;
	current: boolean;
	coverage: SeasonCooverageProps;
}

interface SeasonCooverageProps {
	fixtures: SeasonCoverageFixturesProps;
	standings: boolean;
	players: boolean;
	top_scorers: boolean;
	top_assists: boolean;
	top_cards: boolean;
	injuries: boolean;
	predictions: boolean;
	odds: boolean;
}

interface SeasonCoverageFixturesProps {
	events: boolean;
	lineups: boolean;
	statistics_fixtures: boolean;
	statistics_players: boolean;
}

export interface StandingProps {
	rank: number;
	team: {
		id: number;
		name: string;
		logo: string;
	};
	points: number;
	goalsDiff: number;
	group: string;
	form: string;
	status: string;
	description: string;
	all: StandingsAllProps;
	home: StandingsAllProps;
	away: StandingsAllProps;
	update: string;
}

interface StandingsAllProps {
	played: number;
	win: number;
	draw: number;
	lose: number;
	goals: {
		for: number;
		against: number;
	};
}
