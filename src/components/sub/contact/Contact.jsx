import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const [Index, setIndex] = useState(0);

	const { kakao } = window;
	const mapFrame = useRef(null);
	const mapInfo = useRef([
		{
			title: '코엑스',
			latlng: new kakao.maps.LatLng(37.52506188634506, 126.9259552665427),
			imgsrc: process.env.PUBLIC_URL + '/img/marker1.png',
			imgSize: new kakao.maps.Size(232, 99),
			imgOpt: { offset: new kakao.maps.Point(112, 99) },
		},
	]);

	// 마커 인스턴스 생성
	const markerInstance = new kakao.maps.Marker({
		position: mapInfo.current[0].latlng,
		image: new kakao.maps.MarkerImage(mapInfo.current[Index].imgsrc, mapInfo.current[Index].imgSize, mapInfo.current[Index].imgOpt),
	});
	useEffect(() => {
		const mapInstance = new kakao.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3,
		});
		markerInstance.setMap(mapInstance);
	}, []);

	return (
		<Layout title={'Contact'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}
