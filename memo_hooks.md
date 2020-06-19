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