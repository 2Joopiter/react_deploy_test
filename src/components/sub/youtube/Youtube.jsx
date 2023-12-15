import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useCustomText } from '../../../hooks/useText';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Youtube() {
	const YoutubeData = useSelector(store => store.youtubeReducer.youtube);
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');

	return (
		<Layout title={'Youtube'}>
			{YoutubeData?.map(data => {
				const [date, time] = data.snippet.publishedAt.split('T');

				return (
					<article key={data.id}>
						<h2>{shortenText(data.snippet.title, 50)}</h2>

						<div className='txt'>
							<p>{shortenText(data.snippet.description, 250)}</p>
							<div className='infoBox'>
								<span>{customText(date, '.')}</span>
								<em>{time.split('Z')[0]}</em>
							</div>
						</div>

						<div className='pic'>
							<Link to={`/detail/${data.id}`}>
								<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
							</Link>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}
