import styles from './NotFoundPage.module.scss';

import { useNavigate } from 'react-router-dom';

import { Result } from 'antd';
import Button from '../../components/Button/Button';

import { AppRoutes } from '../../utils/routes';

export default function NotFoundPage() {
	const nav = useNavigate();

	const navToHome = () => {
		nav(AppRoutes.home);
	};
	return (
		<div className={styles.notFoundPage}>
			<Result
				status={404}
				title='Error 404'
				subTitle='Sorry, the page you visited does not exist.'
				extra={<Button text='Go home' onClick={navToHome} />}
			/>
		</div>
	);
}
