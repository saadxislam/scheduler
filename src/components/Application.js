import React, { useEffect, useState } from "react";
import axios from 'axios';

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";

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
//       student: "Miller-Jones",
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
//       student: "John Doe",
//       interviewer: {
//         id: 2,
//         name: "Jane Doe",
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
//       student: "Hello Kitty",
//       interviewer: {
//         id: 3,
//         name: "Goofy",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       },
//     },
//   },
//   {
//     id: 6,
//     time: "5pm",
//   },
// ];




export default function Application(props) {
  // const [day, setDay] = useState([]);
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  // const dailyAppointments = [];
  const appointments =  getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      console.log(all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
  },[]);

  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

   return axios.put(`api/appointments/${id}`, appointment)
      .then(() => {
        setState({...state, appointments});
      })


}

function cancelInterview(id) {
  return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const nullAppointment = {
        ...state.appointments[id],
        interview: null
    }
})
}
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));



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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map(appointment => {
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment 
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers= {interviewers}
              bookInterview= {bookInterview}
              cancelInterview={cancelInterview}
            />
          );
        })}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}