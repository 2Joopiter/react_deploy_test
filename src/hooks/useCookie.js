export function useCookie() {
	return (name, value, time) => {
		let now = new Date();
		let duedate = now.getTime() + 1000 * time;
		now.setTime(duedate);
		document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
	};
}

/* 
path값 경로의 url에서만 쿠키가 생성됨
//csr방식의 리액트에서는 해당 경로로 라우터 이동하더라도 서버쪽에서 해당URL요청이 들어간것이 아니기 때문에 쿠기 생성이 안됨
//해당 URL경로에서 새로고침을 해야지 그때 쿠키가 생성됨
가급적 리액트에서는 쿠기생성 경로 path=/ 로 지정함
*/
