import styles from './PlayerPage.module.scss';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LoadingBall from '../../components/LoadingBall/LoadingBall';
import Button from '../../components/Button/Button';
import { Select } from 'antd';

import { useCurrentPlayerStore } from '../../data/currentPlayer/store';

import { PlayerPageFilters } from '../../utils/playerMatchFilters';
import PlayerInfo from './PlayerInfo/PlayerInfo';
import TransferList from '../../components/TransferList/TransferList';
import PlayerStatistics from '../../components/PlayerStatistics/PlayerStatistics';

const buttons = [
	{ text: 'Stats', filter: PlayerPageFilters.Stats },
	{ text: 'Transfers', filter: PlayerPageFilters.Transfers },
];

export default function PlayerPage() {
	const { id } = useParams();

	const {
		playerSeasons,
		getRemoteSeasons,
		currentPlayer,
		currentPlayerTransfers,
		getRemoteCurrentPlayer,
	} = useCurrentPlayerStore();

	const [filter, setFilter] = useState<PlayerPageFilters>(
		PlayerPageFilters.Stats
	);

	const [season, setSeason] = useState<number | undefined>(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				await getRemoteSeasons(parseInt(id));
			}
		};
		fetchData();
	}, [id]);

	useEffect(() => {
		if (playerSeasons.length > 0) {
			const currentYear = new Date().getFullYear();
			const currentMonth = new Date().getMonth();
			const currentSeason = currentMonth < 7 ? currentYear - 1 : currentYear;

			setSeason(currentSeason);
		}
	}, [playerSeasons]);

	useEffect(() => {
		if (season) {
			const fetchData = async () => {
				if (id) {
					setLoading(true);
					await getRemoteCurrentPlayer(parseInt(id), season);
					setLoading(false);
				}
			};
			fetchData();
		}
	}, [season]);

	if (loading) {
		return (
			<div className={styles.playerPage}>
				<div className={styles.loading}>
					<LoadingBall size='large' />
				</div>
			</div>
		);
	}

	return (
		<div className={styles.playerPage}>
			<div className={styles.content}>
				<div className={styles.playerInfo}>
					<PlayerInfo player={currentPlayer} />
				</div>
				<div className={styles.buttons}>
					{buttons.map((button, index) => (
						<Button
							key={index}
							text={button.text}
							active={filter === button.filter}
							onClick={() => setFilter(button.filter)}
						/>
					))}
				</div>
				<div className={styles.filteredContent}>
					{filter === PlayerPageFilters.Stats && (
						<div className={styles.stats}>
							<PlayerStatistics statistics={currentPlayer.statistics} />
							<div className={styles.select}>
								<p>Select season:</p>
								<Select
									value={season}
									onChange={(value) => setSeason(value)}
									options={playerSeasons.map((season) => ({
										value: season,
										label: `${season}/${season + 1}`,
									}))}
									size='small'
								/>
							</div>
						</div>
					)}
					{filter === PlayerPageFilters.Transfers && (
						<TransferList transfers={currentPlayerTransfers?.transfers} />
					)}
				</div>
			</div>
		</div>
	);
}
