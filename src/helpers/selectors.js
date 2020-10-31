
export function getAppointmentsForDay(state, dayName) {

  const filteredDay = state.days.filter(day => day.name === dayName);
  // console.log('filteredDay :', filteredDay);

  if (filteredDay.length === 0) {
    return [];
  }

  const appointmentArray = filteredDay[0].appointments


  const foundAppointments = appointmentArray.map(id => {
    return state.appointments[id]
  })

  return foundAppointments;

}

//Paige's way of doing it:

// export function getAppointmentsForDay(state, day) {
//   const filteredDays = state.days.find((dayObj) => dayObj.name === day);
//   const apptArray = [];
//   if (state.appointments && filteredDays) {
//     filteredDays.appointments.forEach((appId) =>
//       apptArray.push(state.appointments[appId])
//     );
//   }
//   return apptArray;
// }

export function getInterview(state, interview) {
  // console.log('interview :', interview);
  if (!interview) return null;

  const interviewObj = {
    student: interview.student

  };

  interviewObj.interviewer = state.interviewers[interview.interviewer];
  // console.log('interviewObj :', interviewObj);
  return interviewObj;
}



export function getInterviewersForDay(state, dayName) {
  const filteredDay = state.days.filter(day => day.name === dayName);
  console.log('filteredDay :', filteredDay);

  if (filteredDay.length === 0 || state.days.length === 0) {
    return [];
  }

  const interviewersArray = filteredDay[0].interviewers


  const foundInterviewers= interviewersArray.map(id => {
    return state.interviewers[id]
  })

  console.log('foundInterviewers :', foundInterviewers);
  return foundInterviewers;

}