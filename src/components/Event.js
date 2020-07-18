import React, { useContext } from 'react';
import AppContext from '../contexts/AppContext';

const Event = (props) => {
  const { event, dispatch } = props;
  const handleClickDeleteButton = () => {
    const result = window.confirm(
      `イベント(id=${event.id})を削除してもよろしいですか？`
    );
    if (result)
      dispatch({
        type: 'DELETE_EVENT',
        id: event.id,
      });
  };

  const value = useContext(AppContext);
  return (
    <>
      <div>{value}</div>
      <tr>
        <td>{event.id}</td>
        <td>{event.title}</td>
        <td>{event.body}</td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleClickDeleteButton}
          >
            削除
          </button>
        </td>
      </tr>
    </>
  );
};

export default Event;
