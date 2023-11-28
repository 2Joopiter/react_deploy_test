import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { useCustomText } from '../../../hooks/useText';

export default function Department() {
	const [MemberData, setMemberData] = useState([]);
	const [MemberTit, setMemberTit] = useState('');
	const path = useRef(process.env.PUBLIC_URL);
	const changeTitle = useCustomText('title');

	const test1 = 'our-members';
	console.log(test1.split('-')); // ['our','member']로 - 를 기준으로 단어를 나눠줌
	const [forward, backward] = test1.split('-');
	console.log(changeTitle(forward) + '' + changeTitle(backward)); // 'Our Members' 출력

	const combinedTitle = useCustomText('combined');
	const test2 = 'our-members-score';
	console.log(combinedTitle(test2, '-'));

	const fetchDepartment = () => {
		fetch(`${path.current}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				console.log(json);
				setMemberTit(Object.keys(json)[0]);
				setMemberData(Object.values(json)[0]);
			});
	};

	useEffect(() => {
		fetchDepartment();
	}, []);

	return (
		<Layout title={'Department'}>
			<section className='memberBox'>
				<h2>{changeTitle(MemberTit)}</h2>
				{MemberData.map((member, idx) => {
					return (
						<article key={member + idx}>
							<div className='pic'>
								<img src={`${path.current}/img/${member.pic}`} alt='{member.name}' />
							</div>
							<h2>{member.name}</h2>
							<p>{member.position}</p>
						</article>
					);
				})}
			</section>
		</Layout>
	);
}
