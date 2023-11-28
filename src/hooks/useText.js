export function useSplitText() {
	return (ref, txt, speed = 0, interval = 0) => {
		let tags = '';
		let count = 0;

		for (let letter of txt) {
			tags += `<span style='transition-duration: ${speed}s; transition-delay:${interval * count}s; display: inline-block;'>${letter}</span>`;
			count++;
		}
		ref.innerHTML = tags;
	};
}

export function useCustomText(type) {
	if (type === 'title') {
		return (txt) => {
			return txt.charAt(0).toUpperCase() + txt.slice(1);
		};
	}
	if (type === 'shorten') {
		return (txt, len = 100) => {
			if (txt.length > len) {
				return txt.slice(0, len) + '...';
			} else {
				return txt;
			}
		};
	}
	if (type === 'combined') {
		return (txt, spc) => {
			const resultText = txt // 원본 텍스트를 가져옴
				.split(spc) // split으로 받은 텍스트를 구분자로 분리해 배열로 반환
				.map((data) => data.charAt(0).toUpperCase() + data.slice(1)) // 배열값을 map으로 반복돌며 첫글자만 대문자로 반환해서 새로운 배열로 반환
				.join(' '); // 새롭게 반환된 배열을 다시 빈칸을 구분자로(기준으로) 하나의 문자열로 이어붙여줌
			return resultText; // 위에서 만들어진 문자값을 최종적으로 반환
		};
	}
}
