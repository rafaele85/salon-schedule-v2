import ScheduleSelector from 'react-schedule-selector';

export const Schedule = (props) => {

    return (
        <ScheduleSelector
            onChange={props.onChange}
            selection={props.schedule}
            numDays={7}
            minTime={0}
            maxTime={24}
            hourlyChunks={1}
            dateFormat={"dd"}
            timeFormat={"HH:mm"}
            type={"square"}
        />
    );
}

