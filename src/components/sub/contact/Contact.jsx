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

	const imgSrc = process.env.PUBLIC_URL + '/img/marker1.png';
	const imgSize = new kakao.maps.Size(232, 99);
	const imgOpt = { offset: new kakao.maps.Point(112, 99) }; // 이미지값의 가로 절반, 세로만큼

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(mapFrame.current, mapOption.current);
		const markerImageInstance = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOpt);

		const markerInstance = new kakao.maps.Marker({
			position: mapOption.current.center,
			image: markerImageInstance,
		});

		markerInstance.setMap(mapInstance);
	}, []);

	return (
		<Layout title={'Contact'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}
