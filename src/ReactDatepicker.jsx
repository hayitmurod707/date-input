import { ru, uz } from 'date-fns/locale';
import { bool, func, object } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
const StyledDatepicker = styled.div`
	background-color: #ffffff;
	border-radius: 12px;
	box-shadow: 0 0 20px rgba(13, 46, 105, 0.05);
	display: inline-block;
	left: calc(50% - 152px);
	padding: 12px;
	position: absolute;
	top: 46px;
	transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
	z-index: 2;
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
	& .react-datepicker {
		background: transparent;
		border: 0;
		font-family: 'Gilroy', sans-serif;
		font-size: 16px;
	}
	& .react-datepicker__navigation {
		opacity: 0.5;
		top: 0.075rem;
	}
	& .react-datepicker__header {
		background: transparent;
		border: 0;
		padding: 0;
	}
	& .react-datepicker__month {
		margin: 0;
		& .react-datepicker__week {
			/* padding: 2px 5px; */
		}
	}
	& .react-datepicker__current-month {
		align-items: center;
		display: flex;
		font-size: 17px;
		height: 2.5rem;
		justify-content: center;
		text-transform: capitalize;
	}
	& .react-datepicker__day {
		align-items: center;
		border-radius: 50%;
		cursor: pointer;
		display: inline-flex;
		height: 35px;
		justify-content: center;
		outline: none;
		transition: 0.1s;
		width: 35px;
	}
	& .react-datepicker__day-names {
		/* background: var(--light-grey);
		border-radius: 8px;
		padding: 0; */
	}
	& .react-datepicker__day-name {
		align-items: center;
		cursor: default;
		display: inline-flex;
		height: 35px;
		justify-content: center;
		text-transform: capitalize;
		width: 35px;
	}
	& .react-datepicker,
	& .react-datepicker__header,
	& .react-datepicker__day--outside-month,
	& .react-datepicker__current-month,
	& .react-datepicker__day,
	& .react-datepicker__day-name {
		color: var(--bold);
		font-weight: 600;
	}
	& .react-datepicker__day--selected,
	& .react-datepicker__day--keyboard-selected,
	& .react-datepicker__day:hover {
		background: var(--blue);
		color: var(--white);
	}
`;
const StyledHeader = styled.div`
	display: flex;
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
`;
const Header = ({
	changeMonth,
	changeYear,
	date,
	decreaseMonth,
	decreaseYear,
	increaseMonth,
	increaseYear,
	nextMonthButtonDisabled,
	nextYearButtonDisabled,
	prevMonthButtonDisabled,
	prevYearButtonDisabled,
	monthDate,
	view,
	setView,
}) => {
	console.log(view);
	return (
		<StyledHeader>
			<button className="prev">
				<svg width="14" height="14" viewBox="0 0 18 18" fill="none">
					<path
						d="M11.625 14.25L6.375 9L11.625 3.75"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
					/>
				</svg>
			</button>
			<button className="label"></button>
			<button className="next">
				<svg width="15" height="15" viewBox="0 0 18 18" fill="none">
					<path
						d="M6.375 3.75L11.625 9L6.375 14.25"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
					/>
				</svg>
			</button>
		</StyledHeader>
	);
};
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
const defaultOptions = {
	inline: true,
	maxDate: new Date('2099-01-01'),
	minDate: new Date('1970-01-01'),
	// calendarClassName: 'custom-datepicker', // 'custom-datepicker'
	// calendarStartDay: 1, // 1, 2, 3, 4, 5, 6, 7
	// className: 'custom-datepicker', // 'custom-datepicker'
	// closeOnScroll: false, // true or false
	// customTimeInput: ({ date, value, onChange }) => <input value={value} onChange={e => onChange(e.target.value)}/>,
	// dateFormat: 'yyyy/MM/dd',
	// dayClassName: date => `${date.getDate()-day}`,
	// dropdownMode: 'select',
	// excludeDateIntervals: [new Date()], // array
	// excludeDates: [new Date()], // array
	// excludeTimes: [new Date()], // array
	// filterDate: date => date.getDay(), // function
	// filterTime: time => new Date(time).getTime(),
	// fixedHeight: false, // true or false
	// highlightDates: [subDays(new Date(), 7), addDays(new Date(), 7)], // array
	// includeDateIntervals: [{ start: subDays(new Date(), 5), end: addDays(new Date(), 5)], // array
	// includeDates: [new Date()], // array
	// includeTimes: [], // array
	// injectTimes: [], // array
	// isClearable: false, // true or false
	// locale: 'en-GB', // string
	// monthsShown: 1, // 2 number
	// onBlur: e => console.log(e), // function
	// onCalendarClose: () => console.log('close event'), // function
	// onCalendarOpen: () => console.log('open event'), // function
	// onChangeRaw: value => console.log(value), // function
	// openToDate: new Date(), // date
	// peekNextMonth: false, // true or false
	// placeholderText: '', 'placeholder',
	// popperPlacement: 'top-end', // string
	// portalId: 'portal-id', // string
	// readOnly: false, // true or false
	// renderDayContents: (day, date) => date.getDate(),
	// scrollableYearDropdown: false, // true or false
	// shouldCloseOnSelect: true, // true or false
	// showFourColumnMonthYearPicker: false, // true or false
	// showFullMonthYearPicker: false, // true or false
	// showMonthDropdown: false, // true or false
	// showMonthYearDropdown: false, // true or false
	// showMonthYearPicker: false, // true or false
	// showPopperArrow: false, // true or false
	// showPreviousMonths: false, // true or false
	// showQuarterYearPicker: false, // true or false
	// showTimeInput: false, // true or false
	// showTimeSelect: false, // true or false
	// showTimeSelectOnly: false, // true or false
	// showTwoColumnMonthYearPicker: false, // true or false
	// showWeekNumbers: false, // true or false
	// showYearDropdown: false, // true or false
	// showYearPicker: false, // true or false
	// strictParsing: false, // true or false
	// tabIndex: 1, // number
	// timeClassName: time => `${time.getHours()-time}`,
	// timeFormat: 'p', // string 'p' or 'a'
	// timeInputLabel: 'Time', // string
	// timeIntervals: 30, // number
	// todayButton: null, // any
	// useShortMonthInDropdown: false, // true or false
	// withPortal: false, // true or false
	// yearItemNumber: false, // true or false
	// customInput: forwardRef(({ value, onClick }, ref) => (
	//    <button className="example-custom-input" onClick={onClick} ref={ref}>
	//      {value}
	//    </button>
	// )),
	// renderCustomHeader={({
	//   changeMonth,
	//   changeYear,
	//   date,
	//   decreaseMonth,
	//   increaseMonth,
	//   nextMonthButtonDisabled,
	//   prevMonthButtonDisabled,
	// }) => date,
};
const ReactDatepicker = ({ value, isDisabled, onChange, onFocus }) => {
	const ref = useRef(null);
	const [view, setView] = useState('month');
	const type =
		view === 'day'
			? {}
			: view === 'month'
			? { showMonthYearPicker: true, showFullMonthYearPicker: true }
			: { showYearPicker: true };
	const [active, setActive] = useDetect(ref, false);
	// const { i18n } = useTranslation();
	// const { language } = i18n;
	const language = 'uz';
	useEffect(() => {
		const lang = language === 'ru' ? ru : uz;
		registerLocale(language, lang);
	}, [language]);
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
				<span className="date">{`${value.getDate()} ${
					locale?.months[language][value?.getMonth()]
				} ${value.getFullYear()}`}</span>
				<Down />
			</div>
			<StyledDatepicker
				data-active={active ? 'active' : 'inactive'}
				onClick={e => e.stopPropagation()}
				ref={ref}
			>
				<DatePicker
					{...defaultOptions}
					{...type}
					renderCustomHeader={props => Header({ ...props, view, setView })}
					disabled={isDisabled}
					locale={language === 'uz' ? uz : ru}
					onChange={date => {
						onChange(date);
					}}
					selected={value}
				/>
			</StyledDatepicker>
		</StyledElement>
	);
};
ReactDatepicker.defaultProps = {
	value: new Date(),
	isDisabled: false,
};
ReactDatepicker.propTypes = {
	isDisabled: bool,
	onChange: func.isRequired,
	onFocus: func,
	value: object.isRequired,
};
export default ReactDatepicker;
