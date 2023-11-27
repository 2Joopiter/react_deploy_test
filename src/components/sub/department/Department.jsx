import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';

export default function Department() {
	//const test = 'abcdef';
	//console.log(test.charAt(0)); = a를 반환
	//console.log(test.slice(1, 3)); // bc를 반환
	//console.log(test.slice(1)); // bcdef 반환
	//console.log(test.toUpperCase()); // 전체 대문자 반환

	const [MemberData, setMemberData] = useState([]);
	const path = process.env.PUBLIC_URL; // public 폴더까지의 경로를 구해주는 구문
	const [MemberTit, setMemberTit] = useState('');

	const fetchDepartment = () => {
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				console.log(json);
				// console.log('key', Object.keys(json)[0]); / 객체를 반복돌며 key값만 배열로 반환
				// console.log('value), Object.keys(json)[0]; / 객체를 반복돌며 value값만 배열로 반환
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
				<h2>{`${MemberTit.charAt(0).toUpperCase() + MemberTit.slice(1g)}`}</h2>
				{MemberData.map((member, idx) => {
					return (
						<article key={member + idx}>
							<div className='pic'>
								<img src={`${path}/img/${member.pic}`} alt='{member.name}' />
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

/*
	React에서 외부데이터를 가져와서 화면에 동적으로 출력하는 순서
	1. 외부데이터를 가져와서 담을 빈 state를 추가 (보통 빈 배열로 초기화)
	2. fecth문을 이용해서 특정 url의 데이터를 가져온뒤 동기적으로 배열로 뽑아서 state에 담아줄 함수 정의(만들기)
	3. 위에서 만든 함수를 의존성배열이 비어있는 useEffect문 안쪽에서 호출 (다음번 렌더링 타이밍에 state값 활용 가능)
	4. state에 담겨있는 Data 배열값을 map으로 반복 돌면서 JSX 구문 생성

	객체의 property에서 key와 value값 반복 도는 방법
	const student = {name: 'david, age:20}
	//Key 반복 돌면서 배열 반환
	Object.keys(studen); ['name','age'];
	Object.values(student); ['David',20];

	문자열 관련 내장 메서드
	전체문자열.charAt(순서): 전체 문자열에서 해당 순서의 문자값만 반환
	전체문자열.slice(순서1, 순서2): 전체 문자열에서 해당 순서1부터 순서2 위치까지 문자를 잘라서 반환
	전체문자열.toUpperCase(): 문자열을 전체 대문자로 반환
	전체문자열.toLowerCase(): 문자열을 전체 소문자로 반환
	전체문자열.split(구분자): 전체문자열을 구분자를 기준으로 나눠서 배열로 반환
	배열.join('구분자): 각 배열값을 구분자로 이어붙이면서 하나의 문자열로 반환

*/
