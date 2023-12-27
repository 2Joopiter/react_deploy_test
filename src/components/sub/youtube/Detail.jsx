import { useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Detail.scss';
import { useParams } from 'react-router-dom';
import { useYoutubeQueryById } from '../../../hooks/useYoutubeQuery';

export default function Detail() {
	const refTitle = useRef(null);
	const { id } = useParams();
	const { data: YoutubeData, isSuccess } = useYoutubeQueryById(id);

	return (
		<Layout title={'Detail'}>
			{/* Optional Chaining : 객체명?.property 해당객체에 값이 없을땐 무시하고 값이 있을때만 property접근 */}
			<h2 ref={refTitle}>{YoutubeData?.title}</h2>
			{isSuccess && (
				<article>
					<div className='videoBox'>
						<iframe
							src={`https://www.youtube.com/embed/${YoutubeData.resourceId.videoId}`}
							title={YoutubeData.title}></iframe>
					</div>
					<h3>{YoutubeData.title}</h3>
					<p>{YoutubeData.description}</p>
				</article>
			)}
		</Layout>
	);
}
