import { Fragment, useState } from 'react';
import styled from 'styled-components';
import ReactCalendar from './ReactCalendar';
// import ReactDatepicker from './ReactDatepicker';
const StyledElement = styled.div`
   align-items: center;
   display: flex;
   height: 300px;
   justify-content: center;
   & .column {
      width: 250px;
   }
`;
const App = () => {
   const [date, setDate] = useState(new Date());
   return (
      <Fragment>
         <h1 style={{ textAlign: 'center' }}>Date input</h1>
         <h4 style={{ textAlign: 'center' }}>
            <a href='fr'>Github</a>
         </h4>
         <StyledElement>
            <div className='column'>
               <h3 style={{ textAlign: 'center' }}>React calendar</h3>
               <ReactCalendar onChange={setDate} value={date} />
            </div>
         </StyledElement>
         {/* <StyledElement>
            <div className='column'>
               <ReactDatepicker onChange={setDate} value={date} />
            </div>
         </StyledElement> */}
      </Fragment>
   );
};
export default App;
