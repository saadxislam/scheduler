import React from "react";
import 'components/DayListItem.scss';
import classnames from "classnames";

export default function DayListItem(props) {
  let dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots ===0
  }
)

const formalSpots = () =>{
 return props.spots === 0 
  ? "no spots remaining" 
  : props.spots === 1 
    ? "1 spot remaining" 
    :`${props.spots} spots remaining`;
}

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass} data-testid="day" >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formalSpots()}</h3>
    </li>
  );
}