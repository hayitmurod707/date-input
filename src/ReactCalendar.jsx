import { bool, func, object } from 'prop-types';
import { useEffect, useRef, useState } from 'react';
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
   & .selected-date {
      align-items: center;
      background-color: transparent;
      border-radius: 10px;
      border: 1px solid rgb(226, 228, 234);
      cursor: pointer;
      display: flex;
      height: 46px;
      outline: none;
      padding: 0;
      width: 100%;
      & .down {
         display: inline-flex;
         margin: 2px 0 0 0;
         position: relative;
         width: 28px;
         color: #454852;
      }
      & .date {
         color: #000000;
         font-size: 15px;
         font-weight: 500;
         padding: 0 0 0 14px;
         text-align: left;
         width: calc(100% - 28px);
      }
      &[data-focused='focused'] {
         border: 1px solid #5254f1;
         & .date,
         & .down {
            color: #5254f1;
         }
      }
      &[data-active='inactive'] {
         color: rgb(105, 111, 133);
         cursor: default;
      }
   }
`;
const StyledCalendar = styled.div`
   background-color: #ffffff;
   border-radius: 14px;
   box-shadow: 0 0 20px rgba(13, 46, 105, 0.05);
   display: inline-block;
   left: calc(50% - 150px);
   padding: 10px;
   position: absolute;
   top: 46px;
   transform-origin: top;
   transition: opacity 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
   z-index: 2;
   &[data-active='active'] {
      opacity: 1;
      transform: scale(1);
      visibility: visible;
   }
   &[data-active='inactive'] {
      opacity: 0;
      transform: scale(0.6);
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
            color: rgb(105, 111, 133);
            cursor: pointer;
            font-size: 15px;
            font-weight: 500;
            height: 40px;
            min-width: 40px;
            outline: none;
            padding: 0;
            &:hover,
            &:focus {
               background-color: #5254f1;
               color: #ffffff;
               cursor: pointer;
            }
            &[disabled] {
               color: rgb(105, 111, 133);
               cursor: not-allowed;
               &:hover,
               &:focus {
                  background-color: #f6f7f9;
                  color: rgb(105, 111, 133);
               }
            }
         }
         & .react-calendar__navigation__next-button {
            margin: 0 0 0 5px;
            & svg {
               margin: 2px 0 0 2px;
            }
         }
         & .react-calendar__navigation__prev-button {
            margin: 0 5px 0 0;
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
               background-color: transparent !important;
               color: rgb(105, 111, 133) !important;
               cursor: not-allowed;
            }
         }
         & .react-calendar__month-view__weekdays__weekday {
            align-items: center;
            color: rgb(105, 111, 133);
            cursor: default;
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
               background: #5254f1;
            }
         }
         & .react-calendar__month-view__days__day--neighboringMonth {
            color: rgb(105, 111, 133);
         }
         & .react-calendar__month-view__days__day--weekend {
            color: #ff0000;
         }
         & .react-calendar__year-view__months__month,
         & .react-calendar__decade-view__years__year,
         & .react-calendar__century-view__decades__decade {
            border-radius: 8px;
            height: 35px;
            margin: 10px 0;
            padding: 0 !important;
            width: calc(100% / 3);
            &:hover {
               background-color: #5254f1;
               color: #ffffff;
            }
         }
         & .react-calendar__tile--now {
            background: #008000;
            color: #ffffff;
            &:hover {
               background-color: #5254f1;
            }
         }
         & .react-calendar__tile--hasActive,
         & .react-calendar__tile--active {
            background-color: #5254f1;
            color: #ffffff;
            &:hover {
               background-color: #5254f1;
               color: #ffffff;
            }
         }
      }
   }
`;
const PickerIcon = () => (
   <span className='down'>
      <svg width='11' height='7' viewBox='0 0 10 6' fill='none'>
         <path
            d='M1 1L5 5L9 1'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
         />
      </svg>
   </span>
);
const NextIcon = () => (
   <svg width='15' height='15' viewBox='0 0 18 18' fill='none'>
      <path
         d='M6.375 3.75L11.625 9L6.375 14.25'
         stroke='currentColor'
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth='2'
      />
   </svg>
);
const PrevIcon = () => (
   <svg width='14' height='14' viewBox='0 0 18 18' fill='none'>
      <path
         d='M11.625 14.25L6.375 9L11.625 3.75'
         stroke='currentColor'
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth='2'
      />
   </svg>
);
const defaultOptions = {
   // activeStartDate: new Date(),
   // allowPartialRange: false,
   // calendarType: 'ISO 8601',
   // className: '',
   // defaultActiveStartDate: new Date(),
   // defaultValue: new Date(), // new Date() or [new Date(), new Date()]
   // defaultView: 'month', // ['month', 'year', 'decade', 'century']
   // formatDay: (locale, date) => formatDate(date, 'd'), // defaultFormatter
   // formatLongDate: (locale, date) => formatDate(date, 'dd MMM YYYY'), // defaultFormatter
   // formatMonth: (locale, date) => formatDate(date, 'MMM'), // defaultFormatter
   // formatMonthYear: (locale, date) => formatDate(date, 'MMMM YYYY'), // defaultFormatter
   // formatShortWeekday: (locale, date) => formatDate(date, 'dd'), // defaultFormatter
   // formatYear: (locale, date) => formatDate(date, 'YYYY'), // defaultFormatter
   // inputRef: react ref
   // locale: 'en-EN', // user browser settings
   // maxDate: new Date('2099-01-01'),
   // maxDetail: 'month', // ['month', 'year', 'decade', 'century']
   // minDate: new Date('1970-01-01'),
   // minDetail: 'century', // ['month', 'year', 'decade', 'century']
   // navigationAriaLabel: 'Go up',
   // navigationAriaLive: undefined, 'polite'
   // navigationLabel: ({ date, label, locale, view }) => view,
   // next2AriaLabel: 'Jump forwards',
   // next2Label: '»',
   // nextAriaLabel: 'Next',
   // nextLabel: '›',
   // onActiveStartDateChange: ({ action, activeStartDate, value, view }) => console.log(action, activeStartDate, value, view),
   // onClickDay: (value, event) => console.log(value, event),
   // onClickDecade: (value, event) => console.log(value, event),
   // onClickMonth: (value, event) => console.log(value, event),
   // onClickWeekNumber: (weekNumber, date, event) => console.log(weekNumber, date, event),
   // onClickYear: (value, event) => console.log(value, event),
   // onDrillDown: ({ activeStartDate, view }) => console.log(activeStartDate, view),
   // onDrillUp: ({ activeStartDate, view }) => console.log(activeStartDate, view),
   // onViewChange: ({ action, activeStartDate, value, view }) => console.log(action, activeStartDate, value, view),
   // prev2AriaLabel: 'Jump backwards',
   // prev2Label: null, // «
   // prevAriaLabel: 'Previous',
   // prevLabel: <PreviousLabel />, // ‹
   // returnValue: 'start', // ['start', 'end', 'range']
   // selectRange: false, // true or false
   // showDoubleView: false, // true or false
   // showFixedNumberOfWeeks: false, // true or false
   // showNavigation: true, // true or false
   // showNeighboringMonth: true, // true or false
   // showWeekNumbers: false, // true or false
   // tileClassName: '', // string, array, function ({ activeStartDate, date, view }) => view === 'month' && date.getDay() === 3 ? 'wednesday' : null
   // tileContent: '', // string, react component, function
   // tileDisabled: '', // ({activeStartDate, date, view }) => date.getDay() === 0
   // value: new Date(), // new Date(), [new Date(), new Date()],
   // view: 'month', // ['month', 'year', 'decade', 'century']
   maxDate: new Date('2099-01-01'),
   minDate: new Date('1970-01-01'),
   next2Label: null,
   nextLabel: <NextIcon />,
   prev2Label: null,
   prevLabel: <PrevIcon />,
};
const ReactCalendar = ({ value, onChange, onFocus, isDisabled }) => {
   const ref = useRef(null);
   const [active, setActive] = useDetect(ref, false);
   const language = 'ru';
   const days = locale?.days[language];
   const months = locale?.months[language];
   return (
      <StyledElement>
         <div
            className='selected-date'
            data-active={isDisabled ? 'inactive' : 'active'}
            data-focused={active ? 'focused' : ''}
            onFocus={onFocus}
            onClick={e => {
               e.stopPropagation();
               if (!isDisabled) {
                  setActive(!active);
               }
            }}
         >
            <span className='date'>{`${value?.getDate()} ${
               months[value?.getMonth()]
            } ${value?.getFullYear()}`}</span>
            <PickerIcon />
         </div>
         <StyledCalendar
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
         </StyledCalendar>
      </StyledElement>
   );
};
ReactCalendar.defaultProps = {
   isDisabled: false,
   value: new Date(),
};
ReactCalendar.propTypes = {
   isDisabled: bool,
   onChange: func.isRequired,
   onFocus: func,
   value: object.isRequired,
};
export default ReactCalendar;
