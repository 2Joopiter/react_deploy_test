import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);

	const kakao = useRef(window.kakao);
	const marker = useRef(null);
	const mapInstance = useRef(null);
	const viewFrame = useRef(null);

	const mapFrame = useRef(null);
	const mapInfo = useRef([
		{
			title: '여의도 IFC몰',
			latlng: new kakao.current.maps.LatLng(37.52506188634506, 126.9259552665427),
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
		mapFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3,
		});
		marker.current.setMap(mapInstance.current);
		setTraffic(false);

		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 100, (panoId) => {
			new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});

		mapInstance.current.addControl(new kakao.current.maps.MapTypeControl(), kakao.current.maps.ControlPosition.TOPRIGHT);
		mapInstance.current.addControl(new kakao.current.maps.ZoomControl(), kakao.current.maps.ControlPosition.RIGHT);
		mapInstance.current.setZoomable(false); // 마우스 휠로 맵 줌/아웃 기능 비활성화(true로 바꾸면 다시 활성화)

		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout title={'Contact'}>
			<div className='controlBox'>
				<nav className='branch'>
					{mapInfo.current.map((el, idx) => (
						<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>
							{el.title}
						</button>
					))}
				</nav>
				<nav className='info'>
					<button
						onClick={() => {
							setTraffic(!Traffic);
						}}
					>
						{Traffic ? 'Traffic OFF' : 'Traffic ON'}
					</button>
				</nav>
			</div>
			<article className='mapBox' ref={mapFrame}></article>
			<article className='viewBox' ref={viewFrame}></article>
		</Layout>
	);
}

/* 
	1. cdn 불러온 window에 불러온 외부객체값을 가져와서 인스턴스 생성
	2. 인스턴스값을 참조객체에 담는 이유 (의존성 배열에 불필요하게 등록하지 않기 위해서)
	3. 화면 변경점이 발생해야 될 때 무조건 State 값에 따라서 변경되게 로직화 한 다음에 이벤트 발생시 State를 변경해서 화면 재랜더링 유도
*/
