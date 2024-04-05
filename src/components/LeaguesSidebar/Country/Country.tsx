import styles from './Country.module.scss';
import classNames from 'classnames';

import League from '../League/League';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CountryProps } from '../../../data/leagues/types';
import { AppRoutes } from '../../../utils/routes';

import { RiArrowDownSFill, RiStarFill } from 'react-icons/ri';

interface Props {
	country: CountryProps;
}

export default function Country({ country }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const countryClasses = classNames(styles.country, {
		[styles.countryOpen]: isOpen,
	});

	const navToLeague = () => {
		navigate(
			`${AppRoutes.league.slice(0, -4)}/${country.leagues[0].league.id}`
		);
	};

	return (
		<div className={countryClasses}>
			<div className={styles.countryName} onClick={toggleOpen}>
				<p className={styles.text}>{country.country}</p>
				<RiArrowDownSFill className={styles.icon} />
			</div>
			{isOpen ? (
				<div className={styles.leagueList}>
					{country.leagues.map((league, index) => {
						return <League key={index} league={league} />;
					})}
				</div>
			) : null}
		</div>
	);
}
