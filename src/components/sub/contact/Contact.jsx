import { useEffect, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const { kakao } = window;
	const mapFrame = useRef(null);

	const mapOption = useRef({
		center: new kakao.maps.LatLng(37.52506188634506, 126.9259552665427),
		level: 3,
	});

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(mapFrame.current, mapOption.current);

		const markerInstance = new kakao.maps.Marker({
			position: mapOption.current.center,
		});

		markerInstance.setMap(mapInstance);
	}, []);

	return (
		<Layout title={'Contact'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}
