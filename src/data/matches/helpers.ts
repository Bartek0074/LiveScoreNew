import { Match, MatchesInLeague } from '../../data/matches/types';
import { MatchStatuses } from '../../utils/matchStatuses';

export const returnSortedMatchesInLeague = (
	pinnedLeagueIds: number[],
	matches: Match[],
	statuses: MatchStatuses[]
) => {
	let newGrupedMatchesInLeague: MatchesInLeague[] = [];

	pinnedLeagueIds.forEach((leagueId) => {
		const leagueMatches = matches.filter(
			(match) =>
				match.league.id === leagueId &&
				statuses.includes(match.fixture.status.short)
		);

		const league = matches.find(
			(match) => match.league.id === leagueId
		)?.league;

		newGrupedMatchesInLeague.push({
			leagueId,
			league: league!,
			matches: leagueMatches,
		});
	});

	return newGrupedMatchesInLeague;
};

export const formatDate =(date: Date) =>{
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}
