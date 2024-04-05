import styles from './MainLayout.module.scss';

import { useEffect } from 'react';

import Cookies from 'universal-cookie';
import { CookiesEnum } from '../utils/cookies';

import { Outlet, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../utils/routes';

import { usePinnedLeagueIdsStore } from '../data/pinnedLeagueIds/store';

import { IoFootball, IoLogoGithub } from 'react-icons/io5';

const defaultPinnedLeagues = [39, 140, 78, 135, 61, 106, 107];

export default function MainLayout() {
	const navigate = useNavigate();
	const cookies = new Cookies();

	const { getPinnedLeagueIds } = usePinnedLeagueIdsStore();

	const navToHome = () => {
		navigate(AppRoutes.home);
	};

	const currentYear = new Date().getFullYear();

	useEffect(() => {
		if (!cookies.get(CookiesEnum.firstVisit)) {
			cookies.set(CookiesEnum.firstVisit, 'true', { path: '/' });
			cookies.set(CookiesEnum.pinnedLeagues, defaultPinnedLeagues, {
				path: '/',
			});
		}
		getPinnedLeagueIds();
	}, []);

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
