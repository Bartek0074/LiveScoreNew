import styles from './LeaguePage.module.scss';

import { Result } from 'antd';
import { BsGear } from 'react-icons/bs';

export default function LeaguePage() {
	return (
		<div className={styles.leaguePage}>
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
