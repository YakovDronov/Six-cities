import {Fragment, SyntheticEvent, useState} from 'react';
import {toast} from 'react-toastify';

export type FormDataProps = {
  rating: number | null;
  comment: string;
}

type FormSubmitProps = {
  onHandleSubmitForm: (data: FormDataProps) => Promise<void>;
}

const NUMBER_STARTS = [5, 4, 3, 2, 1];
const MAX_TEXTAREA_VALUES = 300;
const MIN_TEXTAREA_VALUES = 50;
const DEFAULT_FORM_DATE: FormDataProps = {
  rating: null,
  comment: '',
};

function FormSubmit({onHandleSubmitForm}: FormSubmitProps): JSX.Element {
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [formDate, setFormDate] = useState<FormDataProps>(DEFAULT_FORM_DATE);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleFieldChange = ({name, value}: { name: keyof FormDataProps; value: string }): void => {
    const newValue = name === 'rating' ? parseInt(value, 10) : value;
    const newDate = {...formDate, [name]: newValue};
    setFormDate(newDate);

    const isCommentValid = newDate.comment.length >= MIN_TEXTAREA_VALUES && newDate.comment.length <= MAX_TEXTAREA_VALUES;

    if (newDate.rating !== null && isCommentValid) {
      setIsDisabledButton(false);
    } else {
      setIsDisabledButton(true);
    }
  };

  const onSubmitChange = async (evt: SyntheticEvent<HTMLFormElement, SubmitEvent>): Promise<void> => {
    evt.preventDefault();
    setIsSubmit(true);
    setIsDisabledButton(true);
    try {
      await onHandleSubmitForm(formDate);
      setFormDate(DEFAULT_FORM_DATE);
    } catch (err) {
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmit(false);
      setIsDisabledButton(false);
    }
  };

  const onHandleSubmitChange = (evt: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    onSubmitChange(evt);
  };

  return (
    <form className={`reviews__form form ${isSubmit ? 'reviews__form-submit' : ''}`} action="#" method="post" onSubmit={onHandleSubmitChange}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {NUMBER_STARTS.map((num) => (
          <Fragment key={num}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              id={`${num}-stars`}
              type="radio"
              checked={formDate.rating ? num === formDate.rating : false}
              onChange={(evt) => handleFieldChange({name: 'rating', value: evt.target.value})}
              value={num}
              disabled={isSubmit}
            />
            <label
              htmlFor={`${num}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star"/>
              </svg>
            </label>
          </Fragment>
        )
        )}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={(evt) => handleFieldChange({name: 'comment', value: evt.target.value})}
        value={formDate.comment}
        disabled={isSubmit}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span>
          and describe your stay with
          at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabledButton}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default FormSubmit;
