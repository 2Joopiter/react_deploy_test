import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const [Index, setIndex] = useState(0);
	const kakao = useRef(window.kakao);
	const marker = useRef(null);
	const mapInstance = useRef(null);

	const mapFrame = useRef(null);
	const mapInfo = useRef([
		{
			title: '삼성역 코엑스',
			latlng: new kakao.current.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) },
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.current.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.current.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) },
		},
	]);

	// 마커 인스턴스 생성
	marker.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(mapInfo.current[Index].imgSrc, mapInfo.current[Index].imgSize, mapInfo.current[Index].imgOpt),
	});

	const setCenter = () => mapInstance.current.setCenter(mapInfo.current[Index].latlng);

	useEffect(() => {
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3,
		});
		marker.current.setMap(mapInstance.current);
		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index]);

	return (
		<Layout title={'Contact'}>
			<ul className='branch'>
				{mapInfo.current.map((el, idx) => (
					<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>
						{el.title}
					</button>
				))}
			</ul>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}
