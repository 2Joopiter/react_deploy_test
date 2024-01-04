import './Visual.scss';
import 'swiper/css';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState } from 'react';

export default function Visual() {
	const num = useRef(5);
	const swiperRef = useRef(null);
	const { isSuccess, data } = useYoutubeQuery();
	const [prevIndex, setPrevIndex] = useState(1);
	const [Index, setIndex] = useState(2);
	const [nextIndex, setNextIndex] = useState(3);

	const swiperOpt = useRef({
		loop: true,
		slidesPerView: 1,
		spaceBetween: 50,
		centeredSlides: true,
		onSwiper: swiper => (swiperRef.current = swiper),
		onSlideChange: swiper => {
			setIndex(swiper.realIndex);
			swiper.realIndex === 0 ? setPrevIndex(num.current - 1) : setPrevIndex(Index - 1);
			swiper.realIndex === num.current - 1 ? setNextIndex(0) : setNextIndex(Index + 1);
		},
		breakpoints: {
			1000: { slidesPerView: 2 },
			1400: { slidesPerView: 3 }
		}
	});

	const trimTitle = title => {
		let resultTit = '';
		if (title.includes('(')) resultTit = title.split('(')[0];
		else if (title.includes('[')) resultTit = title.split('[')[0];
		else resultTit = title;
		return resultTit;
	};

	return (
		<figure className='Visual'>
			<div className='txtBox'>
				<ul>
					{isSuccess &&
						data.map((el, idx) => {
							if (idx >= 5) return null;
							return (
								<li key={el.id} className={idx === Index ? 'on' : ''}>
									<h3>{trimTitle(el.snippet.title)}</h3>
								</li>
							);
						})}
				</ul>
			</div>
			<Swiper {...swiperOpt.current}>
				{isSuccess &&
					data.map((el, idx) => {
						if (idx >= num.current - 1) return null;
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
						<p className='prevBox' onClick={() => swiperRef.current.slidePrev(400)}>
							<img
								src={data[prevIndex].snippet.thumbnails.default.url}
								alt={data[prevIndex].snippet.title}
							/>
						</p>
						<p className='nextBox' onClick={() => swiperRef.current.slideNext(400)}>
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
