import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import Error from "components/Appointment/Error.js";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = "CONFIRMING";
  const EDITING = 'EDITING';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';  



  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => {transition(SHOW)})
      .catch(error => transition(ERROR_SAVE, true))
  }
  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Delete an appointment

  function cancel() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => transition(ERROR_DELETE, true))
  }

  function edit(){
    transition(EDITING);
  }




  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty 
      onAdd={() => {return transition(CREATE)}} />
      }

      {mode === CREATE && <Form 
      interviewers={props.interviewers} 
      onCancel={() => {return back(EMPTY)}} 
      onSave={save}/>
      }

      {mode === EDITING && (
      <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit = {()=> transition(EDITING)}
        />
      )}

      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm
          onCancel={back}
          onConfirm={cancel}
          message="Are you sure you would like to delete?!" />
      }
          {mode === ERROR_SAVE && (
        <Error
          message="There was an error saving your appointment"
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="There was an error deleting your appointment"
          onClose={back}
        />
      )}


    </article>
  );
}