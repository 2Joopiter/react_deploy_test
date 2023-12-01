import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';

export default function Gallery() {
	const [Pics, setPics] = useState([]);

	const fetchFlickr = async () => {
		const flickr_api = process.env.REACT_APP_FLICKR_API;
		const baseURL = 'https://www.flickr.com/services/rest/?method=';
		const method_interest = 'flickr.interestingness.getList';
		const num = 30;
		const resultURL = `${baseURL}${method_interest}&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1`;

		const data = await fetch(resultURL);
		const json = await data.json();
		console.log(json.photos.photo);
		setPics(json.photos.photo);
	};

	useEffect(() => {
		fetchFlickr();
	}, []);

	return (
		<Layout title={'Gallery'}>
			<section>
				<masonry
					className={'frame'}
					elementType={'div'}
					options={{ transitionDuration: 0.5 }}
					updateOnEachImageLoad={false}
					disableImagesLoaded={false}
					gap={50}
				>
					{Pics.map((pic, idx) => {
						return (
							<article key={pic.id}>
								<div className='pic'>
									<img
										src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
										alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
									/>
								</div>
								<h2>{pic.title}</h2>

								<div className='profile'>
									<img
										src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
										alt='사용자 프로필 이미지'
										onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
									/>
									<span>{pic.owner}</span>
								</div>
							</article>
						);
					})}
				</masonry>
			</section>
		</Layout>
	);
}
