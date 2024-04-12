import styles from './TransferList.module.scss';

import { useNavigate } from 'react-router-dom';

import ImageComponent from '../ImageComponent/ImageComponent';

import { TransferProps } from '../../data/currentPlayer/types';
import { AppRoutes } from '../../utils/routes';

interface Props {
	transfers: TransferProps[];
}

export default function TransferList({ transfers }: Props) {
	const navigate = useNavigate();

	const navToTeam = (id: number) => {
		navigate(`${AppRoutes.team.replace(':id', id.toString())}`);
	};

	return (
		<div className={styles.transfers}>
			<div className={styles.table}>
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>From</th>
							<th>Value/type</th>
							<th>To</th>
						</tr>
					</thead>
					<tbody>
						{transfers.map((transfer, index) => (
							<tr key={index}>
								<td>{transfer.date}</td>
								<td>
									{transfer.teams.out.logo && transfer.teams.out.name ? (
										<div className={styles.team}>
											<div
												className={styles.logo}
												onClick={() => navToTeam(transfer.teams.out.id)}
											>
												{transfer.teams.out.logo && (
													<ImageComponent
														src={transfer.teams.out.logo}
														alt={transfer.teams.out.name}
														loaderSize={12}
													/>
												)}
											</div>
											<p onClick={() => navToTeam(transfer.teams.out.id)}>
												{transfer.teams.out.name}
											</p>
										</div>
									) : (
										'No data'
									)}
								</td>
								<td>{transfer.type}</td>
								<td>
									{transfer.teams.in.logo && transfer.teams.in.name ? (
										<div className={styles.team}>
											<div
												className={styles.logo}
												onClick={() => navToTeam(transfer.teams.in.id)}
											>
												{transfer.teams.in.logo && (
													<ImageComponent
														src={transfer.teams.in.logo}
														alt={transfer.teams.in.name}
														loaderSize={12}
													/>
												)}
											</div>
											<p onClick={() => navToTeam(transfer.teams.in.id)}>
												{transfer.teams.in.name}
											</p>
										</div>
									) : (
										'No data'
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
