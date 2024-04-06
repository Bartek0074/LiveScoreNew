import styles from './ImageComponent.module.scss';

import { useEffect } from 'react';

import { useResourceBufferStore } from '../../data/imagesBuffer/store';

interface Props {
	src: string;
	alt?: string;
	loaderSize?: number;
}

export default function ImageComponent({
	src,
	alt = 'Initial alt',
	loaderSize = 16,
}: Props) {
	const { addToBuffer, getResourceFromBuffer } = useResourceBufferStore();

	useEffect(() => {
		const fetchData = async () => {
			if (!getResourceFromBuffer(src)) {
				try {
					const response = await fetch(src);
					if (!response.ok) throw new Error('Network response was not ok');
					const imageData = await response.blob();
					addToBuffer(src, imageData);
				} catch (error) {
					setTimeout(fetchData, 1000);
				}
			}
		};

		fetchData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [src]);

	const imageData = getResourceFromBuffer(src);

	if (!imageData) {
		return (
			<div
				className={styles.loader}
				style={{
					width: `${loaderSize}px`,
					height: `${loaderSize}px`,
				}}
			>
				<div className={styles.dotOne}></div>
				<div className={styles.dotTwo}></div>
			</div>
		);
	}

	return <img src={URL.createObjectURL(imageData)} alt={alt} />;
}
