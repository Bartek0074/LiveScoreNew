import styles from './PlayerInfo.module.scss';

import { CurrentPlayer } from '../../../data/currentPlayer/types';
import ImageComponent from '../../../components/ImageComponent/ImageComponent';

import { formatDateToMonthDates } from '../../../utils/formatDateToMonthNames';

interface Props {
	player: CurrentPlayer;
}

export default function PlayerInfo({ player }: Props) {
	console.log(player);

	return (
		<div className={styles.playerInfo}>
			<p className={styles.name}>
				{player.player.firstname}{' '}
				<span className={styles.lastName}>{player.player.lastname}</span>
			</p>
			<div className={styles.content}>
				<div className={styles.image}>
					<ImageComponent
						src={player.player.photo}
						alt={player.player.name}
						loaderSize={18}
					/>
				</div>
				<div className={styles.infos}>
					<div className={styles.info}>
						<div className={styles.label}>
							<p>Date of birth/Age:</p>
						</div>
						<div className={styles.value}>
							<p>
								{formatDateToMonthDates(new Date(player.player.birth.date))}(
								{player.player.age})
							</p>
						</div>
					</div>
					<div className={styles.info}>
						<div className={styles.label}>
							<p>Place of birth:</p>
						</div>
						<div className={styles.value}>
							<p>{player.player.birth.place}</p>
						</div>
					</div>
					<div className={styles.info}>
						<div className={styles.label}>
							<p>Nationality:</p>
						</div>
						<div className={styles.value}>
							<p>{player.player.nationality} </p>
						</div>
					</div>
					<div className={styles.info}>
						<div className={styles.label}>
							<p>Height:</p>
						</div>
						<div className={styles.value}>
							<p>{player.player.height} </p>
						</div>
					</div>
					<div className={styles.info}>
						<div className={styles.label}>
							<p>Weight:</p>
						</div>
						<div className={styles.value}>
							<p>{player.player.weight} </p>
						</div>
					</div>
					<div className={styles.info}>
						<div className={styles.label}>
							<p>Position:</p>
						</div>
						<div className={styles.value}>
							<p>{player.statistics[0].games.position} </p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
