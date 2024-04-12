import { CurrentPlayerStatistic } from './types';

export function removeDuplicatedStatsById(array: CurrentPlayerStatistic[]) {
	const uniqueIds = new Set();
	let newArray: CurrentPlayerStatistic[] = [];

	array.forEach((object) => {
		if (!uniqueIds.has(object.league.id)) {
			uniqueIds.add(object.league.id);
			newArray.push(object);
		}
	});

	return newArray;
}

export function removeEmptyStats(array: CurrentPlayerStatistic[]) {
	return array.filter((stat) => stat.games.appearences > 0);
}
