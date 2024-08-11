import FormSubmit from '../../../components/form-submit.tsx';
import {ReviewsTypes} from '../../../types/types.tsx';

type ReviewsProps = {
  reviews: ReviewsTypes[];
}
function Reviews({reviews}: ReviewsProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => {
          const reviewDate: Date = new Date(review.date);
          const humanDate: string = reviewDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
          });
          const dateTime: string = review.date.toString().slice(0, 10);
          return (
            <li className="reviews__item" key={review.id}>
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img
                    className="reviews__avatar user__avatar"
                    src={review.user.avatarUrl}
                    width={54}
                    height={54}
                    alt="Reviews avatar"
                  />
                </div>
                <span className="reviews__user-name">{review.user.name}</span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{width: `${review.rating * 20}%`}}/>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">
                  {review.comment}
                </p>
                <time className="reviews__time" dateTime={dateTime}>
                  {humanDate}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
      <FormSubmit/>
    </section>
  );
}

export default Reviews;
