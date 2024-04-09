import styles from './Player.module.scss';

import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '../../../../../utils/routes';
import { FaTshirt } from 'react-icons/fa';

interface Props {
	playerId: number;
	name: string;
	number: number;
	shirtColor: string;
	numberColor: string;
}

export default function Player({
	playerId,
	name,
	number,
	shirtColor,
	numberColor,
}: Props) {
	const navigate = useNavigate();

	const navToPlayer = () => {
		navigate(`${AppRoutes.player.replace(':id', playerId.toString())}`);
	};

	const lastName = name.split(' ')[1];

	return (
		<div className={styles.player}>
			<div className={styles.jersey}>
				<FaTshirt
					className={styles.icon}
					style={{
						color: `#${shirtColor}`,
					}}
				/>
				<span
					className={styles.number}
					style={{
						color: `#${numberColor}`,
					}}
				>
					{number}
				</span>
			</div>
			<div className={styles.name}>
				<p onClick={navToPlayer}>{lastName}</p>
			</div>
		</div>
	);
}
