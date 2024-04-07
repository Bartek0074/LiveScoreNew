import { MatchStatuses } from '../../utils/matchStatuses';

export interface CurrentMatch {
	events: Event[];
	fixture: Fixture;
	goals: {
		away: number;
		home: number;
	};
	league: League;
	lineups: [Lineup, Lineup];
	players: [
		{ players: Player[]; team: PlayerTeam },
		{ players: Player[]; team: PlayerTeam }
	];
	score: Score;
	statistics: [
		{ statistics: Statistic[]; team: StatisticsTeam },
		{ statistics: Statistic[]; team: StatisticsTeam }
	];
	teams: {
		home: Team;
		away: Team;
	};
}

interface Event {
	assist: {
		id: number;
		name: string;
	};
	comments: string;
	detail: string;
	player: {
		id: number;
		name: string;
	};
	team: {
		id: number;
		logo: string;
		name: string;
	};
	time: {
		elapsed: number;
		extra: any;
	};
	type: string;
}

interface Fixture {
	id: number;
	date: string;
	periods: {
		first: number;
		second: number;
	};
	referee: string;
	status: {
		elapsed: number;
		long: string;
		short: MatchStatuses;
	};
	timestamp: number;
	timezone: string;
	venue: {
		city: string;
		id: number;
		name: string;
	};
}

interface League {
	id: number;
	country: string;
	flag: string;
	logo: string;
	name: string;
	round: string;
	season: number;
}

interface Lineup {
	coach: Coach;
	formation: string;
	startXI: LineupPlayer[];
	substitutes: LineupPlayer[];
	team: {
		id: number;
		logo: string;
		name: string;
		colors: { player: Colors; goalkeeper: Colors };
	};
}

interface Coach {
	id: number;
	name: string;
	photo: string;
}

interface LineupPlayer {
	id: number;
	grid: string;
	name: string;
	number: number;
	pos: string;
}

interface Colors {
	border: string;
	number: string;
	primary: string;
}

interface Player {
	player: {
		id: number;
		name: string;
		photo: string;
	};
	statisctics: [PlayerStatistics];
}

interface PlayerStatistics {
	cards: {
		red: number;
		yellow: number;
	};
	dribbles: {
		attempts: number;
		success: number;
		past: number;
	};
	duels: {
		total: number;
		won: number;
	};
	fouls: {
		drawn: number;
		committed: number;
	};
	games: {
		captain: boolean;
		minutes: number;
		number: number;
		position: string;
		rating: string;
		substitute: boolean;
	};
	goals: {
		assists: number;
		conceded: number;
		saves: number;
		total: number;
	};
	offsides: number;
	passes: {
		total: number;
		accuracy: number;
		key: number;
	};
	penalty: {
		commited: number;
		missed: number;
		saved: number;
		scored: number;
		won: number;
	};
	shots: {
		total: number;
		on: number;
	};
	tackles: {
		blocks: number;
		interceptions: number;
		total: number;
	};
}

interface PlayerTeam {
	id: number;
	logo: string;
	name: string;
	update: string;
}

interface Score {
	extratime: {
		away: number;
		home: number;
	};
	fulltime: {
		away: number;
		home: number;
	};
	halftime: {
		away: number;
		home: number;
	};
	penalty: {
		away: number;
		home: number;
	};
}

interface Statistic {
	type: string;
	value: string | number;
}

interface StatisticsTeam {
	id: number;
	logo: string;
	name: string;
}

interface Team {
	id: number;
	logo: string;
	name: string;
	winner: boolean;
}
