// Gets the appointments for a given day
export function getAppointmentsForDay(state, dayName) {
  const filteredDay = state.days.filter((day) => day.name === dayName);

  if (filteredDay.length === 0) {
    return [];
  }

  const appointmentArray = filteredDay[0].appointments;

  const foundAppointments = appointmentArray.map((id) => {
    return state.appointments[id];
  });

  return foundAppointments;
}

// Gets an interview
export function getInterview(state, interview) {
  if (!interview) return null;

  const interviewObj = {
    student: interview.student,
  };

  interviewObj.interviewer = state.interviewers[interview.interviewer];
  return interviewObj;
}

// Gets the interviewers for a given day
export function getInterviewersForDay(state, dayName) {
  const filteredDay = state.days.filter((day) => day.name === dayName);

  if (filteredDay.length === 0 || state.days.length === 0) {
    return [];
  }

  const interviewersArray = filteredDay[0].interviewers;

  const foundInterviewers = interviewersArray.map((id) => {
    return state.interviewers[id];
  });

  return foundInterviewers;
}
