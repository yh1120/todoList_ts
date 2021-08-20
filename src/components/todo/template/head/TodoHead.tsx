import React from "react";
import styled from "styled-components";

const TodoHeadBlock = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 52px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
`;

const DateText = styled.div`
  font-size: 26px;
  color: #119955;
  padding-left: 10px;
`;

const DayText = styled.div`
  font-size: 22px;
  color: #119955;
  padding-top: 5px;
  padding-left: 10px;
`;

const TimeText = styled.div`
  font-size: 26px;
  color: #119955;
  padding-left: 5px;
`;

const TodoHead = () => {
  //@TODO 현재 시간을 표시해야합니다.
  const today = new Date();
  const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthList = ["January", "Fabruary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayString = dayList[today.getDay()];
  const dateString = `${monthList[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
  const todayHour = today.getHours();
  const todayMinute = today.getMinutes();
  const timeString = `${todayHour < 10 ? `0${todayHour}` : todayHour}:${todayMinute < 10 ? `0${todayMinute}` : todayMinute}`;

  return (
    <TodoHeadBlock>
      <DayText>{dayString}</DayText>
      <DateText>{dateString}</DateText>
      <TimeText>{timeString}</TimeText>
    </TodoHeadBlock>
  );
};

export default React.memo(TodoHead);
