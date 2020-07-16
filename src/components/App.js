import React, { useReducer, useState } from 'react';
import reducer from '../reducers';
import Event from './Event.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CREATE_EVENT, DELETE_ALL_EVENTS } from '../actions';

const App = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addEvent = (e) => {
    e.preventDefault();

    dispatch({
      type: CREATE_EVENT,
      title,
      body,
    });
    setTitle('');
    setBody('');
  };
  const deleteALLEvents = (e) => {
    e.preventDefault();
    const result = window.confirm('全てのイベントを削除してもよろしいですか？');
    if (result) dispatch({ type: DELETE_ALL_EVENTS });
  };
  const unCreatable = title === '' || body === '';

  return (
    <div className="container-fluid">
      <h4>イベント作成フォーム</h4>
      <form>
        <div className="form-group">
          <label htmlFor="formEventTitle">タイトル</label>
          <input
            className="form-control"
            id="formEventTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="formEventBody">ボディー</label>
          <textarea
            className="form-control"
            id="formEventBody"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={addEvent}
          disabled={unCreatable}
        >
          イベントを作成する
        </button>
        <button
          className="btn btn-danger"
          onClick={deleteALLEvents}
          disabled={state.length === 0}
        >
          全てのイベントを削除する
        </button>
      </form>

      <h4>イベント一覧</h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.map((event, index) => {
            return <Event event={event} key={index} dispatch={dispatch} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

App.defaultProps = {
  name: '',
  price: 1000,
};

export default App;
