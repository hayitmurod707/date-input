import React, { useState } from 'react';
import styled from 'styled-components';
import ReactCalendar from './ReactCalendar';
const StyledElement = styled.div`
	align-items: center;
	display: flex;
	height: 100vh;
	justify-content: center;
	& .column {
		width: 250px;
	}
`;
const App = () => {
	const [date, setDate] = useState(new Date());
	return (
		<>
			<StyledElement>
				<div className="column">
					<ReactCalendar onChange={setDate} value={date} />
				</div>
			</StyledElement>
		</>
	);
};
export default App;
