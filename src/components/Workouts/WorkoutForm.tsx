import { useState } from "react";
import { isEmpty } from "../../utils/validation/isEmpty/isEmpty";
import { TextField } from "../Shared/TextField/TextField";
import { isEmailValid } from "../../utils/validation/isEmailValid/isEmailValid";
import { Slider } from "../Shared/Slider/Slider";
import { UploadFile } from "../Shared/UploadFile/UploadFile";
import { CalendarPicker } from "../Shared/CalendarPicker/CalendarPicker";
import { isHourSelected } from "../../utils/components/Shared/CalendarPicker/isHourSelected/isHourSelected";
import { DocumentAPI } from "../../api/DocumentAPI";
import { WorkoutPayload } from "../../types/Workout";
import { WorkoutsAPI } from "../../api/WorkoutsAPI";
import { Button } from "../Shared/Button/Button";
import { Alert } from "../Shared/Alert/Alert";

export const WorkoutForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<string | null>(null);

  const [lastName, setLastName] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string | null>(null);

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const AGE_MIN_VALUE: number = 8;
  const [age, setAge] = useState<number>(AGE_MIN_VALUE);

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const [date, setDate] = useState<Date | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [wasFormSendSuccessfully, setWasFormSendSuccessfully] =
    useState<boolean>(false);

  const handleChangeFirstName = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { target } = event;
    const { value } = target;

    setFirstName(value);

    if (isEmpty(value)) return setFirstNameError("Enter a first name");
    setFirstNameError(null);
  };

  const handleChangeLastName = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { target } = event;
    const { value } = target;

    setLastName(value);

    if (isEmpty(value)) return setLastNameError("Enter a last name");
    setLastNameError(null);
  };

  const handleChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { target } = event;
    const { value } = target;

    setEmail(value);

    if (isEmpty(value)) return setEmailError("Enter an email");
    if (!isEmailValid(value)) return setEmailError("Enter an valid email");
    setEmailError(null);
  };

  const handleChangeAge = (amount: number): void => {
    setAge(amount);
  };

  const handleChangeFile = (file: File | null): void => {
    setFile(file);

    if (!file) return setFileError("Enter a photo");
    setFileError(null);
  };

  const handleChangeDate = (date: Date): void => {
    setDate(date);
    setDateError(null);
    if (isHourSelected(date)) setTimeError(null);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setWasFormSendSuccessfully(false);

    const errors: string[] = [];

    if (isEmpty(firstName)) {
      setFirstNameError("Enter a first name");
      errors.push("Enter a first name");
    }

    if (isEmpty(lastName)) {
      setLastNameError("Enter a last name");
      errors.push("Enter a last name");
    }

    if (isEmpty(email)) {
      setEmailError("Enter an email");
      errors.push("Enter an email");
    }

    if (!file) {
      setFileError("Enter a photo");
      errors.push("Enter a photo");
    }

    if (!date) {
      setDateError("Enter a date");
      errors.push("Enter a date");
    }

    if (!date || (!!date && !isHourSelected(date))) {
      setTimeError("Choose time");
      errors.push("Choose time");
    }

    if (
      errors.length > 0 ||
      firstNameError ||
      lastNameError ||
      emailError ||
      fileError ||
      dateError ||
      !file || // duplication to cover typescript requirements as it not resolve in condition above
      !date // duplication to cover typescript requirements as it not resolve in condition above
    )
      return;

    try {
      setIsLoading(true);
      setFormError(null);
      const data = await DocumentAPI.upload(file);

      if ("error" in data)
        return setFormError("Some error appear during uploading an image");

      const payload: WorkoutPayload = {
        firstName,
        lastName,
        email,
        age,
        photoUrl: data.url,
        date,
      };

      const data2 = await WorkoutsAPI.create(payload);
      if ("error" in data2)
        return setFormError("Some error appear during creating workout");
      setWasFormSendSuccessfully(true);

      // reseting form
      setFirstName("");
      setLastName("");
      setEmail("");
      setAge(AGE_MIN_VALUE);
      setFile(null);
      setDate(null);
    } catch (e) {
      setFormError("Unexpected error happend. Try Again Later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      noValidate
      className="max-w-[426px] mx-auto"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
        handleSubmit(event)
      }
    >
      <fieldset className="mb-8">
        <legend className="text-2xl mb-4">Personal Info</legend>
        <TextField
          className="mb-3"
          label="First Name"
          name="firstName"
          id="firstName"
          helperText={firstNameError}
          error={!!firstNameError}
          value={firstName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeFirstName(event)
          }
        />
        <TextField
          className="mb-3"
          label="Last Name"
          name="lastName"
          id="lastName"
          helperText={lastNameError}
          error={!!lastNameError}
          value={lastName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeLastName(event)
          }
        />

        <TextField
          className="mb-3"
          label="Email Address"
          type="email"
          name="emailAddress"
          id="emailAddress"
          helperText={emailError}
          error={!!emailError}
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeEmail(event)
          }
        />

        <Slider
          max={100}
          min={AGE_MIN_VALUE}
          className="mb-12"
          label="Age"
          value={age}
          onChange={(amount: number) => handleChangeAge(amount)}
          id="age"
          name="age"
        />

        <UploadFile
          id="photo"
          label="Photo"
          value={file}
          name="photo"
          error={!!fileError}
          helperText={fileError}
          onChange={(file: File | null) => handleChangeFile(file)}
        />
      </fieldset>

      <fieldset>
        <legend className="text-2xl mb-4">Your workout</legend>

        <CalendarPicker
          label="Date"
          value={date}
          className="mb-12"
          dateError={dateError}
          timeError={timeError}
          onChange={(date: Date) => handleChangeDate(date)}
        />
        {formError && <Alert textBold={formError} type="error" />}
        {wasFormSendSuccessfully && (
          <Alert
            type="success"
            textBold="Application has been sent successfully."
            text="Check your address email"
          />
        )}
        <Button
          text="Send Application"
          type="submit"
          fullWidth
          isLoading={isLoading}
        />
      </fieldset>
    </form>
  );
};
