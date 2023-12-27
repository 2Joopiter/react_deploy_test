import { useEffect, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Menu.scss';
import { useGlobalData } from '../../../hooks/useGlobal';

export default function Menu() {
	const { MenuOpen, setMenuOpen } = useGlobalData();
	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && setMenuOpen(false);
	}, [setMenuOpen]);

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, [closeMenu]);

	return (
		<>
			{MenuOpen && (
				<aside className='Menu' onClick={() => setMenuOpen(false)}>
					<h1>Mobile Menu</h1>
					<ul>
						<li>
							<NavLink to='/department' activeClassName={'on'}>
								Department
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeClassName={'on'}>
								Youtube
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeClassName={'on'}>
								Gallery
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeClassName={'on'}>
								Community
							</NavLink>
						</li>
						<li>
							<NavLink to='/members' activeClassName={'on'}>
								Member
							</NavLink>
						</li>
						<li>
							<NavLink to='/contact' activeClassName={'on'}>
								Contact
							</NavLink>
						</li>
					</ul>
				</aside>
			)}
		</>
	);
}
