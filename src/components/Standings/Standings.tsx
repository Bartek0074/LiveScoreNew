import styles from './Standings.module.scss';
import classNames from 'classnames';

import { StandingProps } from '../../data/currentLeague/types';
import ImageComponent from '../ImageComponent/ImageComponent';
interface Props {
	standings: StandingProps[];
}

export default function Standings({ standings }: Props) {
	console.log(standings);

	return (
		<div className={styles.standings}>
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
					{standings.map((standing, index) => {
						return (
							<tr key={standing.team.id}>
								<td>
									<div className={styles.rank}>
										<p>{standing.rank}.</p>
									</div>
								</td>
								<td className={styles.team}>
									<div className={styles.image}>
										<ImageComponent
											src={standing.team.logo}
											alt={standing.team.name}
											loaderSize={12}
										/>
									</div>
									<p>{standing.team.name}</p>
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
	);
}
