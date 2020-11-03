import React from 'react';
import DayListItem from 'components/DayListItem'



export default function DayList(props) {
  const days = props.days.map(({ id, name, spots }) => {
    return (
      <DayListItem
        key={id}
        name={name}
        spots={spots}
        selected={name === props.day}
        setDay={props.setDay}
      />
    );
  });
  return <ul>{days}</ul>;
}





        
