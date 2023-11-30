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
		return (txt, spc = ' ') => { // spc라는 인수를 추가해서 원하는 기호로 이어붙이도록. 값이 없으면 기본값은 여백(' ')으로 설정
			const resultText = txt
				.split(/-|_|\+/)
				.map((data) => toUpperText(data))
				.join(spc);
			return resultText;
		};
	}
}
