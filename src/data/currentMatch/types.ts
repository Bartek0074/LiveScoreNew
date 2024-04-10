import { MatchStatuses } from '../../utils/matchStatuses';

export interface CurrentMatch {
	events: MatchEvent[];
	fixture: Fixture;
	goals: {
		away: number;
		home: number;
	};
	league: MatchLeague;
	lineups: [Lineup, Lineup];
	players: [
		{ players: MatchPlayer[]; team: PlayerTeam },
		{ players: MatchPlayer[]; team: PlayerTeam }
	];
	score: Score;
	statistics: [
		{ statistics: MatchStatistic[]; team: StatisticsTeam },
		{ statistics: MatchStatistic[]; team: StatisticsTeam }
	];
	teams: {
		home: Team;
		away: Team;
	};
}

export interface MatchEvent {
	assist: {
		id: number;
		name: string;
	};
	comments: string;
	detail: EventDetail;
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
	type: EventType;
}

export enum EventType {
	Goal = 'Goal',
	Card = 'Card',
	Substitution = 'subst',
	Var = 'Var',
}

export enum EventDetail {
	NormalGoal = 'Normal Goal',
	OwnGoal = 'Own Goal',
	Penalty = 'Penalty',
	MissedPenalty = 'Missed Penalty',
	PenaltyCancelled = 'Penalty cancelled',
	PenaltyConfirmed = 'Penalty confirmed',
	YellowCard = 'Yellow Card',
	RedCard = 'Red Card',
	Offside = 'Goal Disallowed - offside',
	GoalCancelled = 'Goal cancelled',
}

export interface MatchStatistic {
	type: StatisticType;
	value: string | number | null;
}

export enum StatisticType {
	ExpectedGoals = 'expected_goals',
	BallPossession = 'Ball Possession',
	TotalShots = 'Total Shots',
	ShotsOnGoal = 'Shots on Goal',
	ShotsOffGoal = 'Shots off Goal',
	BlockedShots = 'Blocked Shots',
	ShotsInsideBox = 'Shots insidebox',
	ShotsOutsideBox = 'Shots outsidebox',
	CornerKicks = 'Corner Kicks',
	Offsides = 'Offsides',
	GoalkeeperSaves = 'Goalkeeper Saves',
	Fouls = 'Fouls',
	RedCards = 'Red Cards',
	YellowCards = 'Yellow Cards',
	TotalPasses = 'Total passes',
	PassesAccurate = 'Passes accurate',
	PassesPercentage = 'Passes %',
}

export enum PlayerPosition {
	Goalkeeper = 'G',
	Defender = 'D',
	Midfielder = 'M',
	Forward = 'F',
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

export interface MatchLeague {
	id: number;
	name: string;
	country: string;
	logo: string;
	flag: string;
	season: number;
	round: string;
}

interface Lineup {
	coach: Coach;
	formation: string;
	startXI: { player: LineupPlayer }[];
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
	pos: PlayerPosition;
}

interface Colors {
	border: string;
	number: string;
	primary: string;
}

export interface MatchPlayer {
	player: {
		id: number;
		name: string;
		photo: string;
	};
	statistics: [PlayerStatistics];
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
		position: PlayerPosition;
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
