import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  const updateSpots = (day, days, appointments) => {
    const dayObj = days.find((d) => d.name === day);
    // console.log('dayObj :', dayObj);
    const appointmentIDs = dayObj.appointments;

    let spots = 0;
    for (const id of appointmentIDs) {
      let appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    dayObj.spots = spots;
  };
  
  const bookInterview = (id, interview) => {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`api/appointments/${id}`, appointment).then(() => {
      updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments , days: state.days });
    });
  };



  const cancelInterview = (id) => {
    const appointments = state.appointments;
    const appointment = appointments[id];
    return axios.delete(`/api/appointments/${id}`).then(() => {
      appointment.interview = null;
      updateSpots(state.day, state.days, state.appointments);
      setState({ ...state, appointments, days: state.days });
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
