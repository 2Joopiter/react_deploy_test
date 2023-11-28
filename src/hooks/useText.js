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
	const toUpperText = (txt) => {
		return txt.charAt(0).toUpperCase() + txt.slice(1);
	};

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
		return (txt) => {
			const resultText = txt
			// regEx (regular expression, 정규표현식). 문자열의 패턴별로 특정 기능을 수행하게 만드는 식
			// 형식: /정규표현식/
				.split(/-|_|\+/) // 인수가(안에 써있는 기호) 들어가는 특수 문자가 -,_,+ 일때는 (하이픈or언더바or플러스) 인식해서 분할해줌. (예약어 문자열은 앞에 \(역슬래시) 를 붙여서 처리)
				
				.map((data) => toUpperText(data))
				.join(' ');
			return resultText;
		};
	}
}
