### 環境準備

> git init
> git remote add origin https://github.com/kyamasan/reacthooks.git
> npm info create-react-app

最新バージョンを確認
npm install -g create-react-app@3.0.1
と思ったら、公式ではグローバルは非推奨らしい。
https://github.com/facebook/create-react-app#quick-overview

> npm uninstall -g create-react-app
> npm install create-react-app@3.0.1
> create-react-app react-hooks-101

### react hooks が使えるかどうか

package.json
"react": "^16.13.1",　 → react hooks は 16.8 で入った機能なので使える。

### 復習

state
react のコンポーネントではコンポーネント内部で状態を持つことができる。この状態を state と呼ぶことができる。

props がコンポーネントの外から値を渡されたのに対して、state はクラスコンポーネント内部でのみ使用される。

props は変更不可(imutable)
state は変更可能(mutable)

state に状態を持たせるには
コンポーネントの初期化時に使用される constructor メソッドを使用する。constructor は props を受け取ることができる。

reducer
redux の基本機能の一つ
action 発生時に、そのアクションの type に応じてどう状態(state)を変化させるのか。

reducers フォルダの index.js は全ての reducer を一つに結合する役割。

### react hooks

クラスコンポーネントの力を借りずに、ファンクションコンポーネントで状態管理できるようにする。
これまでは、状態を持つ必要がなければファンクショナルコンポーネント、状態を持つ必要があればクラスコンポーネントにリファクタリングしてきた。useState を使えばリファクタリングが不要になる。

```js
function App() {
  return <div></div>;
}
```

関数ファンクションをアローファンクションで書きたい場合は

```js
const App = () => {
  return <div></div>;
};
```

### useState

usestate がフックと呼ばれる部分。
フックとは、関数コンポーネントに state やライフサイクルといった React の機能を “接続する (hook into)” ための関数。
フックは React をクラスなしに使うための機能で、クラス内では機能しません。

useState の唯一の引数は state の初期値を示す。
this.state と違い、state はオブジェクトである必要はない。オブジェクトにすることもできる。

```js
import React, { useState } from 'react';

const App = () => {
  const output = useState(0);
  console.log({ output });
  return <div>This is a template.</div>;
};
```

output の中身は 0 と関数の二つが格納された配列。その為、javascript の分割代入を用いて受け取り方も最適化する。const [状態, 状態を操作する為の関数]

```js
import React, { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  console.log({ count });
  console.log({ setCount });
  return <div>This is a template.</div>;
};
```

補足：increment(アロー関数)で this.setState()と this を付けない理由。
https://qiita.com/mejileben/items/69e5facdb60781927929

```js
const App = () => {
  const [count, setCount] = useState(10);
  const increment = () => {
    setCount(count + 1);
  };
  const increment2 = () => setCount((c) => c + 1);
  return (
    <>
      <div>count: {count}</div>
      <button onClick={increment}>+1</button>
      <button onClick={increment2}>+1</button>
    </>
  );
};
```

setCount の引数には関数を渡すこともでき、その関数は現在の count を受け取ることができる。その為、setCount((c) => c + 1)といった書き方も可能。

関数コンポーネントの中でローカルな state を使う為に呼び出している。
state は以降行われる再レンダーの間も React によって保持される。
useState は現在の state の値と、それを更新するための関数とをペアにして返す。この関数は、イベントハンドラやその他の場所から呼び出すことができる。

クラスコンポーネントにおける this.setState とは、新しい state が古いものとマージされないという違いがある。

### 複数の状態をオブジェクトとして管理する

```js
const [name, setName] = useState(props.name);
const [price, setPrice] = useState(props.price);
↓
const [state, setState] = useState(props);
```

名前と価格を別個に管理するのではなく、props をそのまま useState に渡すことができる。
setState()で特定の要素のみ変更したい場合には、

> onChange={(e) => setState({ ...state, name: e.target.value })}

のように書く。

```js
const App = (props) => {
  const [state, setState] = useState(props);
  return (
    <>
      <p>
        {state.name}は{state.price}
        <input
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
      </p>
    </>
  );
};

App.defaultProps = {
  name: '',
  price: 1000,
};
```

### useEffect

ライフサイクルメソッドを関数コンポーネントに持たせる方法の事。
実行される順序としては render()→UseEffect()の順で実行される。
※この時、index.js で UseStrict を指定していると、render()が 2 回実行される。

```js
const App = (props) => {
  useEffect(() => {
    console.log('This is like componentDidMount or componentDidUpdate');
  });
  useEffect(() => {
    console.log('This is like componentDidMount');
  }, []);
  useEffect(() => {
    console.log('this callback is for name only');
  }, [state.name]);
  const render = () => {
    console.log('render');
  };
  return (
    <>
      <p>{render()}</p>
    </>
  );
};
```

componentDidMount()と似ているが、useEffect()は render()が実行される度に実行される。
もし初回のみ実行したい場合には、useEffect()に空の配列を渡すだけでよい。特定の要素が変更された場合のみ呼び出したい場合には、配列に要素を指定すればよい。

### 状態遷移表

reducer()を用いて状態遷移をコードに落とし込む。
この reducer は純粋関数(副作用のない、同じ引数を受け取れば常に同じ結果を得られる関数の事。)
状態遷移表の振る舞いを実現する為には、純粋関数であることが必要。

### BootStrap

https://getbootstrap.com/docs/4.5/getting-started/download/#yarn

> npm info bootstrap
> yarn add bootstrap@4.3.1

```json
"bootstrap": "4.3.1",
"react": "^16.13.1",
```

package.json に"bootstrap": "4.3.1"が新たに追加されていることを確認。ハット(^)付きでないとバージョン固定にならないので注意。

レイアウト
https://getbootstrap.com/docs/4.5/layout/overview/

https://getbootstrap.com/docs/4.5/getting-started/webpack/#importing-javascript

> import 'bootstrap';

jQuery が無い為、上記の書き方は NG。スタイルを適用するだけなので、以下の import のみ行う。

> import 'bootstrap/dist/css/bootstrap.min.css';

https://getbootstrap.com/docs/4.5/content/tables/#hoverable-rows

### reducer

state と action の二つの引数を受け取る。action には type という属性があり、type によって処理の分岐を行う。
src/reducer の中に、以下のようなコードを書く。

```js
const events = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_EVENT':
      const event = { title: action.title, body: action.body };
      const length = state.length;
      const id = length == 0 ? 1 : state[length - 1].id + 1;

      return [...state, { id: id, ...event }];
    case 'DELETE_EVENT':
      return ...;
    case 'DELETE_ALL_EVENTS':
      return [];
    default:
      return state;
  }
};

export default events;
```

> import React, { useReducer } from 'react';
> import reducer from ../reducers

react の関数である useReducer と、作成した src/reducer 内の index.js をインポートする。(この時、index.js は省略可能)

公式ドキュメント(
https://ja.reactjs.org/docs/hooks-reference.html#usereducer)

> const [state, dispatch] = useReducer(reducer, initialArg, init);

useReducer の第一引数には reducer、第二引数にはデフォルト状態の指定、第三引数は初期化時のコールバックを指定する。

### onClick 時のリロードを防ぐ方法

e.preventDefault()を指定することで、ボタンにデフォルトで付与されている submit 処理を行わないようにする。
SPA では非常に重要な機能。

```js
const addEvent = (e) => {
  e.preventDefault();
};

return (
  <button className="btn btn-primary" onClick={addEvent}>
    イベントを作成する
  </button>
);
```

### フォームに入力された値を state で管理する。

```js
import React, { useReducer, useState } from 'react';
```

### onClick 時に dispatch を渡す

dispatch(action)のように、action を引数に渡す。
action は必ず type をプロパティに持たなければならない。
value={title}を付けることで setTitle('')を行った後にフォームが初期化される。

```js
const [state, dispatch] = useReducer(reducer, []);
const [title, setTitle] = useState('');
const [body, setBody] = useState('');

const addEvent = (e) => {
  e.preventDefault();

  dispatch({
    type: 'CREATE_EVENT',
    title,
    body,
  });
  setTitle('');
  setBody('');
};

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
```

### 削除機能の実装

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

reducer に渡したい値は以下の 2 つ
①type
②id

id の取得は map()の内部で行うのが望ましい為、const handleClickDeleteButton = ...を map 内に記述する。

```js
<tbody>
  {state.map((event, index) => {
    const handleClickDeleteButton = () => {
      dispatch({
        type: 'DELETE_EVENT',
        id: event.id,
      });
    };
    return (
      <tr key={index}>
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
    );
  })}
</tbody>
```

渡された値を使用して、reducer の内部で filter()を用いてデータの削除処理を行う。

```js
case 'DELETE_EVENT':
  //actionから指定されたidの情報を取り除く→filter()を用いる

  return state.filter((event) => event.id !== action.id);
```

前者は、引数で受け取る際に、dispatch と event に格納するパターン

後者は、一旦、props をうけとってから、dispatch と event に展開するパターン

```js
const Event = ({ event, dispatch }) => {
  const handleClickDeleteButton = () => {
    dispatch({
      type: 'DELETE_EVENT',
      id: event.id,
    });
  };

const Event = (props) => {
  const { event, dispatch } = props
  const handleClickDeleteButton = () => {
    dispatch({
      type: 'DELETE_EVENT',
      id: event.id,
    });
  };
```

### disabled 属性の付与

イベント作成ボタンは、タイトル、ボディーのいずれかが空であれば非活性(disabled)状態にしたい。

```js
const unCreatable = title === '' || body === '';

render() {
  <button
    className="btn btn-primary"
    onClick={addEvent}
    disabled={unCreatable}
  >
    イベントを作成する
  </button>
}
```

### window.confirm

https://developer.mozilla.org/ja/docs/Web/API/Window/confirm

```js
const deleteALLEvents = (e) => {
  e.preventDefault();
  const result = window.confirm('全てのイベントを削除してもよろしいですか？');
  if (result) dispatch({ type: 'DELETE_ALL_EVENTS' });
};
```

シングルクォートとバッククォートの違い

```js
const result = window.confirm(
  'イベント(id=' + event.id + ')を削除してもよろしいですか？'
);

const result = window.confirm(
  `イベント(id=${event.id})を削除してもよろしいですか？`
);
```

### Action のタイプを定数化する

src/actions/index.js の中に、必要な ActionType を定数化して書く。
これで typo によるトラブルを未然に防ぐことができる。

```js
export const CREATE_EVENT = 'CREATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const DELETE_ALL_EVENTS = 'DELETE_ALL_EVENTS';
```
