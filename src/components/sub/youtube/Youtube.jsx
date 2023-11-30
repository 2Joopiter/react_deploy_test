import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useState, useEffect } from 'react';

export default function Youtube() {
	const [Vids, setVids] = useState([]);
	console.log(Vids);

	const fetchYoutube = () => {
		const api_key = 'AIzaSyBCqSk4zIkhEpjHpiWBU8U5ZbT7HiSItqc';
		const pid = 'PL7mCE55Wm-dixtLfubWtcGFp5lge1UHKA';
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
		fetch(baseURL)
			.then((data) => {
				return data.json();
			})
			.then((json) => {
				setVids(json.items);
			});
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<Layout title={'Youtube'}>
			<p>Youtube 전용 컨텐츠</p>
		</Layout>
	);
}
