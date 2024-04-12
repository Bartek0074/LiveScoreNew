import styles from './PlayerInfo.module.scss';

import { CurrentPlayer } from '../../../data/currentPlayer/types';
import ImageComponent from '../../../components/ImageComponent/ImageComponent';

import { formatDateToMonthDates } from '../../../utils/formatDateToMonthNames';

import { useCurrentPlayerStore } from '../../../data/currentPlayer/store';
import { useCountriesStore } from '../../../data/countries/store';
import { returnCountryFlag } from '../../../data/countries/helpers';

interface Props {
	player: CurrentPlayer;
}

export default function PlayerInfo({ player }: Props) {
	const { countries } = useCountriesStore();
	const { currentPlayerTransfers } = useCurrentPlayerStore();

	const currentClub = currentPlayerTransfers?.transfers[0]?.teams?.in;

	const nationalityFlag = returnCountryFlag(
		countries,
		player?.player?.nationality
	);
	const birthPlaceFlag = returnCountryFlag(
		countries,
		player?.player?.birth?.country
	);

	return (
		<div className={styles.playerInfo}>
			<div className={styles.nameAndTeam}>
				<p className={styles.name}>
					{player.player.firstname}
					<span className={styles.lastName}> {player.player.lastname}</span>
				</p>
				<div className={styles.team}>
					<div className={styles.logo}>
						<ImageComponent
							src={currentClub.logo}
							alt={currentClub.name}
							loaderSize={12}
						/>
					</div>
					<p>{currentClub.name}</p>
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.image}>
					<ImageComponent
						src={player.player.photo}
						alt={player.player.name}
						loaderSize={18}
					/>
				</div>
				<div className={styles.rightSide}>
					<div className={styles.clubDesktopInfo}>
						<div className={styles.logo}>
							<ImageComponent
								src={currentClub.logo}
								alt={currentClub.name}
								loaderSize={12}
							/>
						</div>
						<p>{currentClub.name}</p>
					</div>
					<div className={styles.infos}>
						<div className={styles.info}>
							<div className={styles.label}>
								<p>Date of birth/Age:</p>
							</div>
							<div className={styles.value}>
								<p>
									{formatDateToMonthDates(new Date(player.player.birth.date))} (
									{player.player.age})
								</p>
							</div>
						</div>
						<div className={styles.info}>
							<div className={styles.label}>
								<p>Place of birth:</p>
							</div>
							<div className={styles.value}>
								{birthPlaceFlag && (
									<div className={styles.flag}>
										<ImageComponent
											src={birthPlaceFlag}
											alt='flag'
											loaderSize={12}
										/>
									</div>
								)}
								<p>{player.player.birth.place}</p>
							</div>
						</div>
						<div className={styles.info}>
							<div className={styles.label}>
								<p>Nationality:</p>
							</div>
							<div className={styles.value}>
								{nationalityFlag && (
									<div className={styles.flag}>
										<ImageComponent
											src={nationalityFlag}
											alt='flag'
											loaderSize={12}
										/>
									</div>
								)}
								<p>{player.player.nationality}</p>
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
		</div>
	);
}
