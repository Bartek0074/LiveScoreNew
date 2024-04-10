import styles from './Standings.module.scss';

import { CurrentStanding } from '../../data/currentLeague/types';
interface Props {
	standings: CurrentStanding;
}

export default function Standings({ standings }: Props) {
	console.log(standings);

	return <div className={styles.standings}>Standings</div>;
}
