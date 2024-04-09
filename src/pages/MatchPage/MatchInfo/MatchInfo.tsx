import styles from './MatchInfo.module.scss';

import { CurrentMatch } from '../../../data/currentMatch/types';

interface Props {
	match: CurrentMatch;
}

export default function MatchInfo({ match }: Props) {
	const referee = match?.fixture?.referee;
	const venueName = match?.fixture?.venue?.name;
	const venueCity = match?.fixture?.venue?.city;

	const infos = [
		{
			label: 'Referee',
			value: referee,
		},
		{
			label: 'Venue',
			value: `${venueName}` + (venueCity ? `, ${venueCity}` : ''),
		},
	];
	return (
		<div className={styles.matchInfo}>
			{infos.map((info, index) => {
				if (info?.value) {
					return (
						<div className={styles.info} key={index}>
							<p className={styles.label}>{info?.label}:</p>
							<p className={styles.value}>{info?.value}</p>
						</div>
					);
				}
				return null;
			})}
		</div>
	);
}
