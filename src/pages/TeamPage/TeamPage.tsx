import styles from './TeamPage.module.scss';

import { Result } from 'antd';
import { BsGear } from 'react-icons/bs';

export default function TeamPage() {
	return (
		<div className={styles.teamPage}>
			<div className={styles.content}>
				<Result
					title='This page is still a work in progress. 😉'
					subTitle='Please come back later for updates!'
					icon={<BsGear />}
				/>
			</div>
		</div>
	);
}
