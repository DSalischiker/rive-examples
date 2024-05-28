import {useState, useEffect, useRef} from 'react';
import { useFormik } from 'formik';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 20) {
    errors.name = 'Must be 20 characters or less';
  }

  if (!values.company) {
    errors.company = 'Required';
  } else if (values.company.length > 30) {
    errors.company = 'Must be 30 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default function ContactForm() {
  const formContainerBorderRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      name: '',
      company: '',
      email: '',
    },
    validate,
    onSubmit: values => {
      const randomNumber = Math.floor(Math.random() * 2) + 1;
      //if (randomNumber == 1) {
        submissionSuccess(values);
      /* } else {
        submissionError(values);
      } */
      console.log(JSON.stringify(values, null, 2));

      setTimeout(() => {
        formik.resetForm()
      }, 2500);

    },
  });

  const submissionSuccess = (values) => {
    if (rive && successInput) {
      successInput.value = true;
    }
    setTimeout(() => {
      setFormSent(true);
    }, 2500);
  }

  const submissionError = (values) => {
    if (errorInput && rive) {
      errorInput.value = true;
    }
    /* CSS change */
    formContainerBorderRef.current.classList.add("error");
  }

  const resetAll = () => {
    startInput.value = false;
    errorInput.value = false;
    successInput.value = false;
    processInput.value = 0;
    setFieldsCompleted(0);
    setFormFailed(false);
    setFormSent(false);
    setFormValidated(false);
  }

  const [fieldsCompleted, setFieldsCompleted] = useState(0);

  const [formFailed, setFormFailed] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formValidated, setFormValidated] = useState(false);

  /* UseEffect to check how many fields have been completed */
  useEffect(() => {
    const countNonEmptyFields = () => {
      let count = 0;
      for (const key in formik.values) {
        if (Object.prototype.hasOwnProperty.call(formik.values, key)) {
          if (formik.values[key] !== '') {
            count++;
          }
        }
      }
      return count;
    };

    // Call the counting function
    const nonEmptyFieldCount = countNonEmptyFields();
    setFieldsCompleted(nonEmptyFieldCount);
    /* if (errorInput && rive) {
      if (nonEmptyFieldCount < 3 && errorInput.value === true) {
        errorInput.value = false;
        formContainerBorderRef.current.classList.remove("error");
      }
    } */
  }, [formik.values]);

  /* UseEffect to change Rive inputs */
  useEffect(() => {
    if (fieldsCompleted === 1) {
      if (startInput && rive) {
        /* START FLOW */
        startInput.value = true;
      }
    } else if(fieldsCompleted > 1){
      if (fieldsCompleted === 3 && Object.keys(formik.errors).length === 0) {
        if (processInput && rive) {
          /* DONE */
          processInput.value = fieldsCompleted;
        }
      } else if(fieldsCompleted < 3) {
        if (processInput && rive) {
          /* STARTED BUT NOT DONE */
          processInput.value = fieldsCompleted;
        }
      }
    } else if (fieldsCompleted === 0) {
      if (startInput && processInput && rive) {
        /* Back to idle */
        processInput.value = 0;
        startInput.value = false;
      }
    }
  }, [fieldsCompleted, formik.errors])

  const { rive, RiveComponent } = useRive({
    src: '/interactive_form_apricity_5.riv',
    stateMachines: "Form_Animation",
    autoplay: true,
  });

  /* Rive inputs */
  const startInput = useStateMachineInput(rive, "Form_Animation", "Start", false);
  const errorInput = useStateMachineInput(rive, "Form_Animation", "Error", false);
  const successInput = useStateMachineInput(rive, "Form_Animation", "succes", false);
  const processInput = useStateMachineInput(rive, "Form_Animation", "Process", 0);

  return (
    <div className="form-page-container">
        <div className="rive-form-container">
            <RiveComponent className="rive-form-canvas"/>
        </div>
        <div className="divider"></div>
        <form autoComplete="off" onSubmit={formik.handleSubmit} className={!formSent ? 'visible' : 'invisible'}>
            <div className="input-container">
                <input
                type="text"
                placeholder="Name"
                name="name"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? <span className="form-error">{formik.errors.name}</span> : null}
            </div>

            <div className="input-container">
                <input
                type="text"
                placeholder="Company"
                name="company"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.company}
                />
                {formik.touched.company && formik.errors.company ? <span className="form-error">{formik.errors.company}</span> : null}
            </div>

            <div className="input-container">
                <input
                className="req"
                type="email"
                placeholder="Email"
                name="email"
                required

                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? <span className="form-error">{formik.errors.email}</span> : null}
            </div>

            <div className="button-rive-container">
                
                <button type="submit" className={Object.keys(formik.errors).length === 0 && fieldsCompleted === 3 ? 'submit-state' : ''} disabled={Object.keys(formik.errors).length === 0 && fieldsCompleted === 3 ? false : true} >
                {Object.keys(formik.errors).length === 0 && fieldsCompleted === 3 ? 'Send' : 'Complete'}
                </button>
            </div>
        </form>
        <div className={formSent ? 'visible success-message-container' : 'invisible success-message-container'}>
            <span>Contact succesfully sent!</span>
            <button type="button" onClick={resetAll}>Done</button>
        </div>
    </div>
  );
}