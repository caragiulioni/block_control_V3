import React, { useState, useRef, useEffect } from 'react';
//adapted from https://codepen.io/ykadosh/pen/ZEJLapj and improved with swipe functionality and  enhanced styles

// import {
// 	TiChevronLeftOutline,
// 	TiChevronRightOutline,
// } from 'https://cdn.skypack.dev/react-icons@4.12.0/ti';

import './carousel.css';

const CARDS = 10;
const MAX_VISIBILITY = 3;

const Card = ({ title, content, active }) => (
	<div className={active ? 'card' : 'card non-active'}>
		<div style={{ opacity: '1' }}>
			<h2>{title}</h2>
			<p>{content}</p>
		</div>
	</div>
);

const Wrapper = ({ children }) => {
	const [active, setActive] = useState(0);
	const count = React.Children.count(children);
	const activeRef = useRef();

	children = children.map((child, i) => {
		return React.cloneElement(child, {
			key: i,
			index: i,
			active: active === i,
		});
	});
	console.log('COUNT', count);
	console.log('ACTIVE', activeRef);

	// Add this inside your Carousel component
	useEffect(() => {
		let startX = null;

		const onTouchStart = (e) => {
			startX = e.touches ? e.touches[0].clientX : e.clientX;
		};

		const onTouchEnd = (e) => {
			if (startX === null) return;
			const endX = e.changedTouches
				? e.changedTouches[0].clientX
				: e.clientX;
			const diff = endX - startX;
			if (diff > 50) {
				// Swipe right
				if (active > 0) setActive((i) => i - 1);
			} else if (diff < -50) {
				// Swipe left
				if (active < count - 1) setActive((i) => i + 1);
			}
			startX = null;
		};

		const carousel = activeRef.current;
		if (carousel) {
			carousel.addEventListener('touchstart', onTouchStart);
			carousel.addEventListener('touchend', onTouchEnd);
			carousel.addEventListener('mousedown', onTouchStart);
			carousel.addEventListener('mouseup', onTouchEnd);
		}

		return () => {
			if (carousel) {
				carousel.removeEventListener('touchstart', onTouchStart);
				carousel.removeEventListener('touchend', onTouchEnd);
				carousel.removeEventListener('mousedown', onTouchStart);
				carousel.removeEventListener('mouseup', onTouchEnd);
			}
		};
	}, [active, count, activeRef, setActive]);

	return (
		<div className='carousel'>
			{active > 0 && (
				<button
					className='nav left'
					onClick={() => setActive((i) => i - 1)}
				>
					<svg
						width='2rem'
						height='2rem'
						viewBox='-96 0 512 512'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z' />
					</svg>
				</button>
			)}
			{React.Children.map(children, (child, i) => {
				return (
					<div
						ref={active == i ? activeRef : null}
						className='card-container non-active'
						style={{
							'--active': i === active ? 1 : 0,
							'--offset': (active - i) / 3,
							'--direction': Math.sign(active - i),
							'--abs-offset': Math.abs(active - i) / 3,
							pointerEvents: active === i ? 'auto' : 'none',
							opacity:
								Math.abs(active - i) >= MAX_VISIBILITY
									? '0'
									: '1',
							display:
								Math.abs(active - i) > MAX_VISIBILITY
									? 'none'
									: 'block',
						}}
					>
						{child}
					</div>
				);
			})}
			{active < count - 1 && (
				<button
					className='nav right'
					onClick={() => setActive((i) => i + 1)}
				>
					<svg
						style={{ display: 'block', transform: 'scale(-1,1)' }}
						width='2rem'
						height='2rem'
						viewBox='-96 0 512 512'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z' />
					</svg>
				</button>
			)}
		</div>
	);
};

const Test = () => (
	<Wrapper>
		{[...new Array(CARDS)].map((_, i) => (
			<Card
				title={'Card ' + (i + 1)}
				index={i}
				content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			/>
		))}
	</Wrapper>
);

export default Test;
