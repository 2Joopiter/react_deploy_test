import './Visual.scss';
import 'swiper/css';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';

export default function Visual() {
	const { isSuccess, data } = useYoutubeQuery();
	const [Index, setIndex] = useState(0);
	const [prevIndex, setPrevIndex] = useState(4);
	const [nextIndex, setNextIndex] = useState(1);

	const swiperOpt = useRef({
		loop: true,
		slidesPerView: 1,
		spaceBetween: 50,
		centeredSlides: true,
		//onSwiper: swiper => swiper.slideNext(300),
		onSlideChange: swiper => setIndex(swiper.realIndex),
		breakpoints: {
			1000: { slidesPerView: 2 },
			1400: { slidesPerView: 3 }
		}
	});

	useEffect(() => {
		Index === 0 ? setPrevIndex(4) : setPrevIndex(Index - 1);
		Index === 4 ? setNextIndex(0) : setNextIndex(Index + 1);
	}, [Index]);

	return (
		<figure className='Visual'>
			<div className='txtBox'>
				<ul>
					{isSuccess &&
						data.map((el, idx) => {
							if (idx >= 5) return null;
							return (
								<li key={el.id} className={idx === Index ? 'on' : ''}>
									<h3>{el.snippet.title}</h3>
								</li>
							);
						})}
				</ul>
			</div>
			<Swiper {...swiperOpt.current}>
				{isSuccess &&
					data.map((el, idx) => {
						if (idx >= 5) return null;
						return (
							<SwiperSlide key={el.id}>
								<div className='pic'>
									<p>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</p>
									<p>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</p>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>

			<nav className='preview'>
				{isSuccess && (
					<>
						<p className='prevBox'>
							<img
								src={data[prevIndex].snippet.thumbnails.default.url}
								alt={data[prevIndex].snippet.title}
							/>
						</p>
						<p className='nextBox'>
							<img
								src={data[nextIndex].snippet.thumbnails.default.url}
								alt={data[nextIndex].snippet.title}
							/>
						</p>
					</>
				)}
			</nav>
		</figure>
	);
}
