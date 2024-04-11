import styles from './Standings.module.scss';
import classNames from 'classnames';

import { useNavigate } from 'react-router-dom';

import { Tooltip } from 'antd';
import ImageComponent from '../ImageComponent/ImageComponent';

import { StandingProps } from '../../data/currentLeague/types';
import { AppRoutes } from '../../utils/routes';

import { colors } from '../../utils/colors';

interface Props {
	standings: StandingProps[];
}

export default function Standings({ standings }: Props) {
	const navigate = useNavigate();

	const allDescriptions: string[] = [];

	standings.forEach((standing) => {
		if (
			!allDescriptions.includes(standing.description) &&
			standing.description !== null
		) {
			allDescriptions.push(standing.description);
		}
	});

	const navToTeam = (teamId: number) => {
		navigate(`${AppRoutes.team.replace(':id', teamId.toString())}`);
	};
	return (
		<div className={styles.standings}>
			<div className={styles.table}>
				<table>
					<thead>
						<tr>
							<th className={styles.rank}>#</th>
							<th className={styles.team}>Team</th>
							<th>MP</th>
							<th>W</th>
							<th>D</th>
							<th>L</th>
							<th>G</th>
							<th>GD</th>
							<th className={styles.points}>PTS</th>
							<th>FORM</th>
						</tr>
					</thead>
					<tbody>
						{standings.map((standing) => {
							const rankClasses = classNames(styles.rank, {
								[styles.rankFirst]: standing.description === allDescriptions[0],
								[styles.rankSecond]:
									standing.description === allDescriptions[1],
								[styles.rankThird]: standing.description === allDescriptions[2],
								[styles.rankFourth]:
									standing.description === allDescriptions[3],
								[styles.rankFifth]: standing.description === allDescriptions[4],
								[styles.rankSixth]: standing.description === allDescriptions[5],
							});
							return (
								<tr key={standing.team.id}>
									<td className={styles.rankCell}>
										<Tooltip
											title={standing.description}
											color={colors.tooltipBackground}
										>
											<div className={rankClasses}>
												<p>{standing.rank}.</p>
											</div>
										</Tooltip>
									</td>
									<td className={styles.team}>
										<div
											className={styles.image}
											onClick={() => navToTeam(standing.team.id)}
										>
											<ImageComponent
												src={standing.team.logo}
												alt={standing.team.name}
												loaderSize={12}
											/>
										</div>
										<p onClick={() => navToTeam(standing.team.id)}>
											{standing.team.name}
										</p>
									</td>
									<td>
										<p>{standing.all.played}</p>
									</td>
									<td>
										<p>{standing.all.win}</p>
									</td>
									<td>
										<p>{standing.all.draw}</p>
									</td>
									<td>
										<p>{standing.all.lose}</p>
									</td>
									<td>
										<p>
											{standing.all.goals.for}:{standing.all.goals.against}
										</p>
									</td>
									<td>
										<p>{standing.goalsDiff}</p>
									</td>
									<td>
										<p className={styles.points}>{standing.points}</p>
									</td>
									<td className={styles.formCell}>
										<div className={styles.form}>
											{standing.form.split('').map((form, index) => {
												const formClasses = classNames(styles.formItem, {
													[styles.formItemWin]: form === 'W',
													[styles.formItemDraw]: form === 'D',
													[styles.formItemLost]: form === 'L',
												});
												return (
													<div key={index} className={formClasses}>
														{form}
													</div>
												);
											})}
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className={styles.legend}>
				{allDescriptions.map((description, index) => {
					const rectClasses = classNames(styles.rect, {
						[styles.rectFirst]: description === allDescriptions[0],
						[styles.rectSecond]: description === allDescriptions[1],
						[styles.rectThird]: description === allDescriptions[2],
						[styles.rectFourth]: description === allDescriptions[3],
						[styles.rectFifth]: description === allDescriptions[4],
						[styles.rectSixth]: description === allDescriptions[5],
					});
					return (
						<div key={index} className={styles.legendItem}>
							<div className={rectClasses} />
							<p>{description}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
