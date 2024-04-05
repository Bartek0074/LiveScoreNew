import styles from './MainLayout.module.scss';

import { Outlet, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../utils/routes';

import { IoFootball, IoLogoGithub } from 'react-icons/io5';

export default function MainLayout() {
	const navigate = useNavigate();

	const navToHome = () => {
		navigate(AppRoutes.home);
	};

	const currentYear = new Date().getFullYear();

	return (
		<div className={styles.mainLayout}>
			<header className={styles.header}>
				<div className={styles.name} onClick={navToHome}>
					<IoFootball className={styles.icon} />
					<p>LiveScore</p>
				</div>
			</header>
			<div className={styles.content}>
				<Outlet />
			</div>
			<footer className={styles.footer}>
				<p>&copy; {currentYear} by Bartosz Stępniak | </p>
				<div className={styles.link}>
					<a
						href='https://github.com/Bartek0074/LiveScoreNew'
						target='_blank'
						rel='noopener noreferrer'
					>
						<IoLogoGithub className={styles.icon} />
					</a>
				</div>
			</footer>
		</div>
	);
}
