おさらい
state
reactのコンポーネントではコンポーネント内部で状態を持つことができる。この状態をstateと呼ぶことができる。

propsがコンポーネントの外から値を渡されたのに対して、stateはクラスコンポーネント内部でのみ使用される。

propsは変更不可(imutable)
stateは変更可能(mutable)

stateに状態を持たせるには
コンポーネントの初期化時に使用されるconstructorメソッドを使用する。constructorはpropsを受け取ることができる。

reducer

reduxの基本機能の一つ
action発生時に、そのアクションのtypeに応じてどう状態(state)を変化させるのか。

reducersフォルダのindex.jsは全てのreducerを一つに結合する役割。

react hooks
クラスコンポーネントの力を借りずに、ファンクションコンポーネントで状態管理できるようにする。
これまでは、状態を持つ必要がなければファンクショナルコンポーネント、状態を持つ必要があればクラスコンポーネントにリファクタリングしてきた。useStateを使えばリファクタリングが不要になる。



環境準備
git init
git remote add origin https://github.com/kyamasan/reacthooks.git
yarn 
npm info create-react-app
最新バージョンを確認

npm install -g create-react-app@3.0.1
と思ったら、公式ではグローバルは非推奨らしい。https://github.com/facebook/create-react-app#quick-overview
npm uninstall -g create-react-app
npm install create-react-app@3.0.1

create-react-app react-hooks-101


react hooksが使えるかどうか

package.json
"react": "^16.13.1",　→ react hooksは16.8で入った機能なので使える。


function App() {
  return (
    <div>
    </div>
  );
}

アローファンクションで書きたい場合は

const App = () => {
  return (
    <div>
    </div>
  );
}

useState使い方

useStateは関数
import React, { useState } from 'react';

Appの関数の中にuseStateを書く。
const output = useState(0)
console.log({output})

