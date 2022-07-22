import { bool, func, object } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
const locale = {
	months: {
		ru: [
			'Январь',
			'Февраль',
			'Март',
			'Апреля',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь',
		],
		uz: [
			'Yanvar',
			'Fevral',
			'Mart',
			'Aprel',
			'May',
			'Iyun',
			'Iyul',
			'Avgust',
			'Sentyabr',
			'Oktyabr',
			'Noyabr',
			'Dekabr',
		],
	},
	days: {
		ru: ['Во', 'По', 'Вт', 'Ср', 'Че', 'Пя', 'Су'],
		uz: ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh'],
	},
};
const useDetect = (ref, state) => {
	const [active, setActive] = useState(state);
	useEffect(() => {
		const onClick = () => {
			if (ref.current !== null) {
				setActive(!active);
			}
		};
		if (active) {
			window.addEventListener('click', onClick);
		}
		return () => {
			window.removeEventListener('click', onClick);
		};
	}, [active, ref]);
	return [active, setActive];
};
const StyledElement = styled.div`
	height: 46px;
	position: relative;
	width: 100%;
	& * {
		box-sizing: border-box;
	}
	& .current-date {
		align-items: center;
		background: #f6f7f9;
		border-radius: 8px;
		border: 1px solid #e2e4ea;
		cursor: pointer;
		display: flex;
		font-size: 15px;
		font-weight: 400;
		height: 46px;
		outline: none;
		padding: 0;
		width: 100%;
		&[disabled] {
			cursor: default;
		}
		& .down {
			display: inline-flex;
			position: relative;
			width: 30px;
		}
		& .selected-date {
			padding: 0 0 0 14px;
			text-align: left;
			width: calc(100% - 30px);
		}
	}
`;
const Card = styled.div`
	background: #ffffff;
	border-radius: 12px;
	box-shadow: 0 0 20px rgba(13, 46, 105, 0.05);
	display: inline-block;
	left: calc(50% - 152px);
	padding: 12px;
	position: absolute;
	top: 46px;
	transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
	&[data-active='active'] {
		opacity: 1;
		transform: translateY(0);
		visibility: visible;
	}
	&[data-active='inactive'] {
		opacity: 0;
		transform: translateY(-20px);
		visibility: hidden;
	}
	& .react-calendar {
		border: none;
		width: 280px !important;
		& button {
			cursor: pointer !important;
		}
		& .react-calendar__navigation {
			margin: 0;
			display: flex;
			& button {
				background-color: #f6f7f9;
			}
			& .react-calendar__navigation__next-button {
				margin: 0 0 0 2px;
				padding: 0;
				& svg {
					margin: 2px 0 0 2px;
					stroke: #000000;
				}
				&:hover {
					& svg {
						stroke: #ffffff;
					}
				}
			}
			& .react-calendar__navigation__prev-button {
				margin: 0 2px 0 0;
				padding: 0;
				& svg {
					margin: 2px 2px 0 0;
					stroke: #000000;
				}
				&:hover {
					& svg {
						stroke: #ffffff;
					}
				}
			}
			& .react-calendar__navigation__label {
				font-size: 15px;
				font-weight: 400;
				padding: 0;
				width: 100%;
				&:hover {
					color: #ffffff;
				}
			}
			& button {
				border-radius: 12px;
				border: none;
				height: 40px;
				min-width: 40px;
				outline: none;
			}
			& button:hover,
			& button[disabled],
			& button:focus {
				background: #0000ff;
				color: #000000;
				cursor: pointer;
			}
		}
	}
	& .react-calendar__month-view__weekdays__weekday {
		align-items: center;
		color: grey;
		display: flex;
		flex-basis: initial !important;
		font-size: 15px;
		font-weight: 400;
		height: 40px;
		justify-content: center;
		padding: 0;
		text-transform: lowercase;
		text-transform: capitalize;
		width: 40px;
		& abbr {
			text-decoration: none !important;
			overflow: hidden;
		}
	}
	& .react-calendar__month-view__days__day {
		align-items: center;
		background: transparent;
		border-radius: 19px;
		border: none;
		display: flex;
		flex-basis: initial !important;
		font-size: 14px;
		font-weight: 500;
		height: 38px;
		justify-content: center;
		margin: 1px;
		width: 38px;
		&:hover {
			color: #ffffff;
			background: #0000ff;
		}
	}
	& .react-calendar__month-view__days__day--neighboringMonth {
		color: grey !important;
	}
	& .react-calendar__month-view__days__day--weekend {
		color: #000000;
	}
	& .react-calendar__year-view__months__month,
	& .react-calendar__decade-view__years__year,
	& .react-calendar__century-view__decades__decade {
		background: transparent;
		border-radius: 6px;
		border: none;
		flex-basis: initial !important;
		font-size: 14px;
		font-weight: 500;
		height: 35px;
		margin: 10px 0;
		padding: 0 !important;
		width: calc(100% / 3);
		&:hover {
			background: #0000ff;
			color: #ffffff;
		}
	}
	& .react-calendar__tile--now {
		background: green;
		color: #ffffff;
		&:hover {
			background: #0000ff;
		}
	}
`;
const Down = () => (
	<span className="down">
		<svg width="11" height="7" viewBox="0 0 10 6" fill="none">
			<path
				d="M1 1L5 5L9 1"
				stroke="#454852"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	</span>
);
const NextLabel = () => (
	<svg width="15" height="15" viewBox="0 0 18 18" fill="none">
		<path
			d="M6.375 3.75L11.625 9L6.375 14.25"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
		/>
	</svg>
);
const PreviousLabel = () => (
	<svg width="14" height="14" viewBox="0 0 18 18" fill="none">
		<path
			d="M11.625 14.25L6.375 9L11.625 3.75"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
		/>
	</svg>
);
const ReactCalendar = ({ value, onChange, onFocus, isDisabled }) => {
	const ref = useRef(null);
	const [active, setActive] = useDetect(ref, false);
	const language = 'ru';
	const months = locale?.months[language];
	const days = locale?.days[language];
	return (
		<StyledElement>
			<div
				onFocus={onFocus}
				onClick={e => {
					e.stopPropagation();
					if (!isDisabled) {
						setActive(!active);
					}
				}}
				disabled={isDisabled}
				className="current-date"
			>
				<span className="selected-date">{`${value?.getDate()} ${
					months[value?.getMonth()]
				} ${value?.getFullYear()}`}</span>
				<Down />
			</div>
			<Card
				data-active={active ? 'active' : 'inactive'}
				onClick={e => e.stopPropagation()}
				ref={ref}
			>
				<Calendar
					maxDate={new Date('2090-01-01')}
					minDate={new Date('1970-01-01')}
					calendarType="ISO 8601"
					formatMonth={(locale, date) => months[date?.getMonth()]}
					formatShortWeekday={(locale, date) => days[date?.getDay()]}
					locale="en-EN"
					navigationLabel={({ view, label, date }) =>
						view === 'month'
							? `${months[date?.getMonth()]} ${date?.getFullYear()}`
							: label
					}
					next2Label={null}
					nextLabel={<NextLabel />}
					onChange={date => {
						onChange(date);
						setActive(!active);
					}}
					prev2Label={null}
					prevLabel={<PreviousLabel />}
					value={value}
				/>
			</Card>
		</StyledElement>
	);
};
ReactCalendar.defaultProps = {
	value: new Date(),
	isDisabled: false,
};
ReactCalendar.propTypes = {
	isDisabled: bool.isRequired,
	onChange: func.isRequired,
	onFocus: func,
	value: object.isRequired,
};
export default ReactCalendar;
