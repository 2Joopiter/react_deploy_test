import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';
import Footer from './components/common/footer/Footer';

function App() {
	return (
		<>
			<Header />
			<MainWrap />
			<Community />
			<Contact />
			<Department />
			<Gallery />
			<Members />
			<Youtube />
			<Footer />
		</>
	);
}

export default App;
