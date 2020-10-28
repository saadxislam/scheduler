// import React, { useState }  from "react";
// import DayList from "components/DayList";
// import "components/Application.scss";

// // import Header from 'components/Header'
// // import Show from 'components/Show'
// // import Empty from 'components/Empty'
// import Appointment from 'components/Appointment';

// // import "components/Appointment.scss";


// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       },
//     },
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Kourtney Huget",
//       interviewer: {
//         id: 2,
//         name: "Ralph Lauren",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       },
//     },
//   },
//   {
//     id: 4,
//     time: "3pm",
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Paige Lindahl",
//       interviewer: {
//         id: 3,
//         name: "Tommy Hilfigher",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       },
//     },
//   },
//   {
//     id: 6,
//     time: "5pm",
//   },
// ];


// export default function Application(props) {
//   const [day, setDay] = useState("Monday");
//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img
//   className="sidebar--centered"
//   src="images/logo.png"
//   alt="Interview Scheduler"
// />
// <hr className="sidebar__separator sidebar--centered" />
// <nav className="sidebar__menu"> 
//   <DayList days={days} day={day} setDay={setDay} />
// </nav>
// <img
//   className="sidebar__lhl sidebar--centered"
//   src="images/lhl.png"
//   alt="Lighthouse Labs"
// />
//       </section>
//       <section className="schedule">
//         {appointments.map((appointment) => {
//           return <Appointment time={props.time} {...appointment} />;
//         })}
//         <Appointment key="last" time="5pm" />
//       </section>
//     </main>
//   );
// }


import React, { useState } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "John Doe",
      interviewer: {
        id: 2,
        name: "Jane Doe",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Hello Kitty",
      interviewer: {
        id: 3,
        name: "Goofy",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 6,
    time: "5pm",
  },
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map((appointment) => {
          return <Appointment time={props.time} {...appointment} />;
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}