import React from "react";
import { Formik, Field } from "formik";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import * as auth from "../../store/ducks/auth.duck";
import { register } from "../../crud/auth.crud";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import redaxios from "redaxios";

function Registration(props) {
  const { intl } = props;
  const countries = countryList().getData();

  // registerAPI = (value) => {
  //   redaxios.post(
  //     "http://localhost:8080/EuclideV2/saveMailConfig",({
  //       //arguments
  //     }),
  //     {
  //       headers: {
  //         "content-type": "application/x-www-form-urlencoded",
  //         "X-Requested-With": "XMLHttpRequest",
  //       },
  //       withCredentials: true,
  //     }
  //   )
  //   .then((res) => console.log("reponse",res))
  //   .catch((error) => console.log("error", error));
  //   console.log("addUserAPI");
  // };

  return (
    <div className="kt-login__body">
      <div className="kt-login__form">
        <div className="kt-login__title">
          <h3>
            <FormattedMessage id="AUTH.REGISTER.TITLE" />
          </h3>
        </div>

        <Formik 
          initialValues={{
            Email: "",
            Firstname: "",
            Lastname:"",
            Address: "",
            Username: "",
            Password: "",
            Country:"",
            AcceptTerms: true,
            ConfirmPassword: ""
          }}
          validate={values => {
            const errors = {};

            if (!values.email) {
              errors.email = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = intl.formatMessage({
                id: "AUTH.VALIDATION.INVALID_FIELD"
              });
            }

            if (!values.firstname) {
              errors.firstname = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.lastname) {
              errors.lastname = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.username) {
              errors.username = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.address) {
              errors.address = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.password) {
              errors.password = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.confirmPassword) {
              errors.confirmPassword = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            } else if (values.password !== values.confirmPassword) {
              errors.confirmPassword =
                "Passwords didn't match.";
            }

            if (!values.acceptTerms) {
              errors.acceptTerms = "Please Accept Terms";
            }

            return errors;
          }}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            register(
              values.email,
              values.firstname,
              values.lastname,
              values.Address,
              values.Country,
              values.username,
              values.password
            )
            //registerAPI();
              .then(({ data: { accessToken } }) => {
                props.register(accessToken);
              })
              .catch(() => {
                setSubmitting(false);
                setStatus(
                  intl.formatMessage({
                    id: "AUTH.VALIDATION.INVALID_LOGIN"
                  })
                );
              });
          }}
        >
          {({
            values,
            status,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              {status && (
                <div role="alert" className="alert alert-danger">
                  <div className="alert-text">{status}</div>
                </div>
              )}

              <div className="form-group mb-0">
                <TextField
                  margin="normal"
                  label="Firstname"
                  className="kt-width-full"
                  name="firstname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstname}
                  helperText={touched.firstname && errors.firstname}
                  error={Boolean(touched.firstname && errors.firstname)}
                />
              </div>

              <div className="form-group mb-0">
                <TextField
                  margin="normal"
                  label="Lastname"
                  className="kt-width-full"
                  name="lastname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastname}
                  helperText={touched.lastname && errors.lastname}
                  error={Boolean(touched.lastname && errors.lastname)}
                />
              </div>

              <div className="form-group mb-0">
                <TextField
                  label="Email"
                  margin="normal"
                  className="kt-width-full"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  helperText={touched.email && errors.email}
                  error={Boolean(touched.email && errors.email)}
                />
              </div>


              <div className="form-group mb-0">
                <TextField
                  label="Address"
                  margin="normal"
                  className="kt-width-full"
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  helperText={touched.address && errors.address}
                  error={Boolean(touched.address && errors.address)}
                />
              </div>
              <div>
                <Field   
                 label="Country"
                  margin="normal"
                  className="kt-width-full"
                  name="country"
                  onBlur={handleBlur}
                  onChange={e => console.log(e)}
                  value={values.country}
                  helperText={touched.country && errors.country}
                  error={Boolean(touched.country && errors.country)}
                  placeholder="Select your country" options={countries} component={Select}/>
              </div>
              <div className="form-group mb-0">
                <TextField
                  margin="normal"
                  label="Username"
                  className="kt-width-full"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  helperText={touched.username && errors.username}
                  error={Boolean(touched.username && errors.username)}
                />
              </div>

              <div className="form-group mb-0">
                <TextField
                  type="password"
                  margin="normal"
                  label="Password"
                  className="kt-width-full"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  helperText={touched.password && errors.password}
                  error={Boolean(touched.password && errors.password)}
                />
              </div>

              <div className="form-group">
                <TextField
                  type="password"
                  margin="normal"
                  label="Confirm Password"
                  className="kt-width-full"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                />
              </div>

              <div className="form-group mb-0">
                <FormControlLabel
                  label={
                    <>
                      I agree the{" "}
                      <Link
                        to="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms & Conditions
                      </Link>
                    </>
                  }
                  control={
                    <Checkbox
                      color="primary"
                      name="acceptTerms"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      checked={values.acceptTerms}
                    />
                  }
                />
              </div>

              <div className="kt-login__actions">
                <Link
                  to="/auth/forgot-password"
                  className="kt-link kt-login__link-forgot"
                >
                  <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
                </Link>

                <Link to="/auth">
                  <button type="button" className="btn btn-secondary btn-elevate kt-login__btn-secondary">
                    Back
                  </button>
                </Link>

                <button
                  disabled={isSubmitting || !values.acceptTerms}
                  className="btn btn-primary btn-elevate kt-login__btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default injectIntl(
  connect(
    null,
    auth.actions
  )(Registration)
);
