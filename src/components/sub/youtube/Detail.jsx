import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Detail.scss';
import { useParams } from 'react-router-dom';

export default function Detail() {
	const { id } = useParams();
	const [YoutubeData, setYoutubeData] = useState(null);

	const fetchSingleData = async () => {
		const api_key = 'AIzaSyBCqSk4zIkhEpjHpiWBU8U5ZbT7HiSItqc';
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;

		const data = await fetch(baseURL);
		const json = await data.json();
		setYoutubeData(json.items[0].snippet);
	};

	useEffect(() => {
		fetchSingleData();
	}, []);

	return (
		<Layout title={'Detail'}>
			<h3>{YoutubeData?.title}</h3>
			{/* Optional chaing: 객체명?.property
      해당 객체에 값이 없으면 무시하고 값이 있을때만 property 접근 (선택적 호출)*/}
			<div className='videoBox'>
				<iframe src={`https://www.youtube.com/embed/${YoutubeData?.resourceId.videoId}`} title={YoutubeData?.title}></iframe>
			</div>
			<p>{YoutubeData?.description}</p>
		</Layout>
	);
}
