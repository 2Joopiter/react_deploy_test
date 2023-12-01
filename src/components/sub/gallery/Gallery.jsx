import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';

export default function Gallery() {
	const [Pics, setPics] = useState([]);

	const fetchFlickr = async () => {
		const flickr_api = '96b263310d877718514c269c64e06a63';
		const baseURL = 'https://www.flickr.com/services/rest/?method=';
		const method_interest = 'flickr.interestingness.getList';
		const num = 500;
		const resultURL = `${baseURL}${method_interest}&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1`;

		const data = await fetch(resultURL);
		const json = await data.json();
		setPics(json.photos.photo);
	};

	useEffect(() => {
		fetchFlickr();
	}, []);

	return (
		<Layout title={'Gallery'}>
			{Pics.map((pic, idx) => {
				return (
					<article key={pic.id}>
						<h2>{pic.title}</h2>
					</article>
				);
			})}
		</Layout>
	);
}
