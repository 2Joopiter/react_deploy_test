import './Visual.scss';
import 'swiper/css';
import 'swiper/css/pagination';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { useEffect } from 'react';
import { useCustomText } from '../../../hooks/useText';

function Btns() {
	const swiper = useSwiper();

	useEffect(() => {
		swiper.slideNext(300);
	}, [swiper]);

	return (
		<nav className='swiperController'>
			<button
				onClick={() => {
					swiper.slideNext(300);
					swiper.autoplay.start();
				}}>
				Start
			</button>
			<button onClick={() => swiper.autoplay.stop()}>Stop</button>
		</nav>
	);
}

export default function Visual() {
	const { youtube } = useSelector(store => store.youtubeReducer);
	const shortenText = useCustomText('shorten');

	return (
		<figure className='Visual'>
			<Swiper
				modules={[Pagination, Autoplay]}
				pagination={{
					clickable: true,
					renderBullet: (index, className) => {
						return `<span class=${className}>${index + 1}</span>`;
					}
				}}
				autoplay={{
					delay: 5000,
					disableOnInteraction: true
				}}
				loop={true}>
				{youtube.map((vid, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={vid.id}>
							<div className='inner'>
								<div className='picBox'>
									<p>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</p>
									<p>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</p>
								</div>
								<div className='txtBox'>
									<h2>{shortenText(vid.snippet.title, 50)}</h2>
									<Link to={`/detail/${vid.id}`}>View Detail</Link>
								</div>
							</div>
						</SwiperSlide>
					);
				})}

				<Btns />
			</Swiper>
		</figure>
	);
}
