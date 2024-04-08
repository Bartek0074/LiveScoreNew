import { MatchStatuses } from '../../utils/matchStatuses';
import { MatchLeague } from '../currentMatch/types';

export interface Match {
	fixture: Fixture;
	league: MatchLeague;
	teams: Teams;
	goals: Goals;
	score: Score;
}

export interface MatchesInLeague {
	leagueId: number;
	league: MatchLeague;
	matches: Match[];
}

interface Fixture {
	id: number;
	referee: string;
	timezone: string;
	date: string;
	timestamp: number;
	periods: {
		first: number;
		second: number;
	};
	venue: {
		id: number;
		name: string;
		city: string;
	};
	status: {
		long: string;
		short: MatchStatuses;
		elapsed: number;
	};
}

interface Teams {
	home: {
		id: number;
		name: string;
		logo: string;
		winner: boolean;
	};
	away: {
		id: number;
		name: string;
		logo: string;
		winner: boolean;
	};
}

interface Goals {
	home: number;
	away: number;
}

interface Score {
	halftime: Goals;
	fulltime: Goals;
	extratime: Goals;
	penalty: Goals;
}
