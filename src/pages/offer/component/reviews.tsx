import FormSubmit, {FormDataProps} from '../../../components/form-submit.tsx';
import {ReviewsTypes} from '../../../types/types.tsx';
import {useAppSelector} from '../../../store/actions.ts';
import {APIRoute, AppRoute, AuthorizationStatus} from '../../../const.ts';
import {useEffect, useState} from 'react';
import {api} from '../../../store';
import {useNavigate, useParams} from 'react-router-dom';

function Reviews(): JSX.Element {
  const navigate = useNavigate();
  const {id: offerId} = useParams();
  const [comments, setComments] = useState<ReviewsTypes[] | undefined>();
  const authorizationStatus = useAppSelector((state) => state.authorizationReducer.authorizationStatus);

  const getComments = async () => {
    try {
      const {data: commentsData} = await api.get<ReviewsTypes[]>(`${APIRoute.Comments}/${offerId}`);
      setComments(commentsData);
    } catch {
      navigate(AppRoute.Error);
    }
  };

  const onHandleSubmitForm = async (data: FormDataProps) => {
    await api.post<FormDataProps>(`${APIRoute.Comments}/${offerId}`, data);
    getComments();
  };

  useEffect(() => {
    if (offerId) {
      (async () => {
        try {
          await getComments();
        } catch {
          navigate(AppRoute.Error);
        }
      })();
    }
  }, [navigate, offerId]);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments?.length}</span>
      </h2>
      {comments && comments.length > 0 && (
        <ul className="reviews__list">
          {comments.slice(0, 10).map((comment) => {
            const reviewDate: Date = new Date(comment.date);
            const humanDate: string = reviewDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long'
            });
            const dateTime: string = comment.date.toString().slice(0, 10);
            return (
              <li className="reviews__item" key={comment.id}>
                <div className="reviews__user user">
                  <div className="reviews__avatar-wrapper user__avatar-wrapper">
                    <img
                      className="reviews__avatar user__avatar"
                      src={comment.user.avatarUrl}
                      width={54}
                      height={54}
                      alt="Reviews avatar"
                    />
                  </div>
                  <span className="reviews__user-name">{comment.user.name}</span>
                </div>
                <div className="reviews__info">
                  <div className="reviews__rating rating">
                    <div className="reviews__stars rating__stars">
                      <span style={{width: `${comment.rating * 20}%`}}/>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <p className="reviews__text">
                    {comment.comment}
                  </p>
                  <time className="reviews__time" dateTime={dateTime}>
                    {humanDate}
                  </time>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {authorizationStatus === AuthorizationStatus.Auth &&
        <FormSubmit onHandleSubmitForm={onHandleSubmitForm}/>}
    </section>
  );
}

export default Reviews;
