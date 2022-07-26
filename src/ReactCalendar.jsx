import { bool, func, object } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
// current color #0000ff
// muted color #808080
// primary color #008000
// secondary color #f6f7f9
// text color #000000
// theme color #ffffff
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
	& .selected-date {
		align-items: center;
		background-color: #f6f7f9;
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
		&[data-active='inactive'] {
			color: #808080;
			cursor: default;
			& .down {
				& svg {
					& path {
						stroke: #808080;
					}
				}
			}
		}
		& .down {
			display: inline-flex;
			margin: 2px 0 0 0;
			position: relative;
			width: 28px;
			& svg {
				& path {
					stroke: #454852;
				}
			}
		}
		& .date {
			padding: 0 0 0 14px;
			text-align: left;
			width: calc(100% - 28px);
		}
	}
`;
const Card = styled.div`
	background-color: #ffffff;
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
		& .react-calendar__navigation {
			display: flex;
			margin: 0;
			& button {
				background-color: #f6f7f9;
				border-radius: 12px;
				border: none;
				color: #000000;
				cursor: pointer;
				font-size: 15px;
				font-weight: 400;
				height: 40px;
				min-width: 40px;
				outline: none;
				padding: 0;
				& svg {
					stroke: #000000;
				}
				&:hover,
				&:focus {
					background-color: #0000ff;
					color: #ffffff;
					cursor: pointer;
					& svg {
						stroke: #ffffff;
					}
				}
				&[disabled] {
					color: #808080;
					cursor: not-allowed;
					&:hover,
					&:focus {
						background-color: #f6f7f9;
						color: #808080;
						& svg {
							stroke: #808080;
						}
					}
					& svg {
						stroke: #808080;
					}
				}
			}
			& .react-calendar__navigation__next-button {
				margin: 0 0 0 3px;
				& svg {
					margin: 2px 0 0 2px;
				}
			}
			& .react-calendar__navigation__prev-button {
				margin: 0 3px 0 0;
				& svg {
					margin: 2px 2px 0 0;
				}
			}
		}
		& .react-calendar__viewContainer {
			& button {
				align-items: center;
				background-color: transparent;
				border: none;
				cursor: pointer;
				display: flex;
				flex-basis: initial !important;
				font-size: 14px;
				font-weight: 500;
				justify-content: center;
				&[disabled] {
					cursor: not-allowed;
					background-color: transparent !important;
					color: #808080 !important;
				}
			}
			& .react-calendar__month-view__weekdays__weekday {
				align-items: center;
				color: #808080;
				display: flex;
				flex-basis: initial !important;
				font-size: 14px;
				font-weight: 500;
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
				border-radius: 19px;
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
				color: #808080;
			}
			& .react-calendar__month-view__days__day--weekend {
				color: #ff0000;
			}
			& .react-calendar__year-view__months__month,
			& .react-calendar__decade-view__years__year,
			& .react-calendar__century-view__decades__decade {
				border-radius: 6px;
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
				background: #008000;
				color: #ffffff;
				&:hover {
					background: #0000ff;
				}
			}
			& .react-calendar__tile--hasActive,
			& .react-calendar__tile--active {
				background: #0000ff;
				color: #ffffff;
				&:hover {
					background: #0000ff;
					color: #ffffff;
				}
			}
		}
	}
`;
const Down = () => (
	<span className="down">
		<svg width="11" height="7" viewBox="0 0 10 6" fill="none">
			<path
				d="M1 1L5 5L9 1"
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
const defaultOptions = {
	// activeStartDate: new Date(),
	// allowPartialRange: false,
	calendarType: 'ISO 8601',
	className: 'react-calendar',
	// defaultActiveStartDate: new Date(), // today
	// defaultValue: new Date(), // new Date() or [new Date(), new Date()]
	// defaultView: 'month', // ['month', 'year', 'decade', 'century']
	// formatDay: (locale, date) => formatDate(date, 'd'), // defaultFormatter
	// formatLongDate: (locale, date) => formatDate(date, 'dd MMM YYYY'), // defaultFormatter
	// formatMonth: (locale, date) => formatDate(date, 'MMM'), // defaultFormatter
	// formatMonthYear: (locale, date) => formatDate(date, 'MMMM YYYY'), // defaultFormatter
	// formatShortWeekday: (locale, date) => formatDate(date, 'dd'), // defaultFormmater
	// formatYear: (locale, date) => formatDate(date, 'YYYY'), // defaultFormmater
	// inputRef: react ref
	locale: 'en-EN',
	maxDate: new Date('2099-01-01'),
	// maxDetail: 'month', // ['month', 'year', 'decade', 'century']
	minDate: new Date('1970-01-01'),
	// minDetail: 'century', // ['month', 'year', 'decade', 'century']
	// navigationAriaLabel: 'Go up',
	// navigationAriaLive: undefined, 'polite'
	// navigationLabel: ({ date, label, locale, view }) => view,
	// nextAriaLabel: 'Next',
	nextLabel: <NextLabel />,
	// next2AriaLabel: 'Jump forwards',
	// onActiveStartDateChange: ({ action, activeStartDate, value, view }) => console.log(action, activeStartDate, value, view),
	// onViewChange: ({ action, activeStartDate, value, view }) => console.log(action, activeStartDate, value, view),
	// onClickDay: (value, event) => console.log(value, event),
	// onClickDecade: (value, event) => console.log(value, event),
	// onClickMonth: (value, event) => console.log(value, event),
	// onClickWeekNumber: (weekNumber, date, event) => alert('Clicked week: ', weekNumber, 'that starts on: ', date)
	next2Label: null,
	prev2Label: null,
	prevLabel: <PreviousLabel />,
};
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
				data-active={isDisabled ? 'inactive' : 'active'}
				className="selected-date"
			>
				<span className="date">{`${value?.getDate()} ${
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
					{...defaultOptions}
					formatMonth={(locale, date) => months[date?.getMonth()]}
					formatShortWeekday={(locale, date) => days[date?.getDay()]}
					navigationLabel={({ view, label, date }) =>
						view === 'month'
							? `${months[date?.getMonth()]} ${date?.getFullYear()}`
							: label
					}
					onChange={date => {
						onChange(date);
						setActive(!active);
					}}
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
