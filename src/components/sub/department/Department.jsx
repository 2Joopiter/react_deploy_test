import Layout from '../../common/layout/Layout';
import { useCustomText } from '../../../hooks/useText';
import { useSelector } from 'react-redux';
import './Department.scss';

// 비동기데이터를 내부적으로 활용하는 컴포넌트에서 너무 빨리 다른 컴포넌트로 마운트이동시 특정값이 없다고 뜨면서 메모리릭이라는 에러 발생
// 이유: 특정 컴포넌트 마운트시 만약 비동기데이터 fetching로직이 들어가 있다면 fetchihg 완료후 해당 값을 state에 담기까지 물리적인 시간이 필요함.
// 따라서 데이터가 fetching요청 후 반환되기 전에 해당 컴포넌트가 unmount 되면 담을 state값은 이미 사라졌는데 fetching요청은 계속 수행되고 있음 (메모리 누수 현상 발생)
// 해결방법: 해당 컴포넌트에 state를 만들어서 초기값을 false로 지정 후 해당 컴포넌트가 unmount시 해당 state값을 강제로 true로 변경처리
// 해당 state값이 true일때는 state에 값 담기는 과정이 실행되지 않도록 조건문처리
// state값이 false일때만 담기게 처리하는것임. 그래서 unmount되면 담기는 과정 자체가 없도록

export default function Department() {
	const MemberData = useSelector(store => store.memberReducer.members);
	const HistoryData = useSelector(store => store.historyReducer.history);
	const combinedTitle = useCustomText('combined');
	const path = process.env.PUBLIC_URL;

	return (
		<Layout title={'Department'}>
			<section className='historyBox'>
				<h2>{combinedTitle('History')}</h2>
				<div className='con'>
					{/* {2016: 배열} */}
					{HistoryData?.map((history, idx) => {
						return (
							<article key={history + idx}>
								<h3>{Object.keys(history)[0]}</h3>
								<ul>
									{Object.values(history)[0].map((list, idx) => {
										return <li key={list + idx}>{list}</li>;
									})}
								</ul>
							</article>
						);
					})}
				</div>
			</section>

			<section className='memberBox'>
				<h2>{combinedTitle('Members')}</h2>
				<div className='con'>
					{MemberData?.map((member, idx) => {
						return (
							<article key={member + idx}>
								<div className='pic'>
									<img src={`${path.current}/img/${member.pic}`} alt='{member.name}' />
								</div>
								<h3>{member.name}</h3>
								<p>{member.position}</p>
							</article>
						);
					})}
				</div>
			</section>
		</Layout>
	);
}
