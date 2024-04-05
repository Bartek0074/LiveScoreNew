import styles from './HomePage.module.scss';

import React from 'react';

import LeaguesSidebar from '../../components/LeaguesSidebar/LeaguesSidebar';

export default function HomePage() {
	return (
		<div className={styles.homePage}>
			<div className={styles.sidebar}>
				<LeaguesSidebar />
			</div>
			<div className={styles.content}>HomePage</div>
		</div>
	);
}
