import './Visual.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Visual() {
	const YoutubeData = useSelector(store => store.youtubeReducer.youtube);

	return (
		<figure className='Visual'>
			{/* Vids의 유무로 에러처리를 할 수 없는 이유
			 		- 데이터 반환에 실패하더라도 YoutubeData에 undefined 값이 들어가있기 때문에
					- 데이터 반환 실패 유무로 분기처리 하기보다는 에러객체에만 있는 메시지 property로 분기처리
					- YoutubeData앞에 무조건 optional chaining 처리를 하는 이유는 
					리액트가 조건문을 읽을 때 YoutubeData 값이 초기에는 undefined이기 때문에 message, map 프로퍼티 접근 자체가 구문 오류임
					따라서 초기 구문오류를 피하기 위함
					*/}
			<div className='youtubeBox'>
				{YoutubeData?.message ? (
					<h1>{YoutubeData?.message}</h1>
				) : (
					YoutubeData?.map((vid, idx) => {
						console.log(vid);
						if (idx >= 4) return null;
						return (
							<article key={vid.id}>
								<div className='pic'>
									<img src={vid.snippet.thumbnails.default.url} alt={vid.snippet.title} />
								</div>
							</article>
						);
					})
				)}
			</div>
		</figure>
	);
}
