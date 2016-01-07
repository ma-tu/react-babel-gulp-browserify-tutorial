# react-babel-gulp-browserify-tutorial の branch : es6 について

react-babel-gulp-browserify-tutorial の master ブランチの tutorial 成果物を ECMA2015(ECMA6) で書き直したものになります。

react-babel-gulp-browserify-tutorial は babel(babelify) を利用しているので、せっかくなので ECMA2015(ECMA6) で利用可能なクラスやアロー関数を利用して書いてみたらどうなるのかを試してみたものになります。

書き直し作業は以下を写経するような形で対応していました。本当に感謝です。  
* [React TutorialをES6で書きなおしてみた](http://sadah.hatenablog.com/entry/2015/08/03/085828)
* [ES6版React.jsチュートリアル](http://qiita.com/nownabe/items/2d8b92d95186c3941de0)

## ES6 への変換箇所

変換の説明は上記の参考サイトが詳しいので、そちらを参照いただく方がよいかと思いますが、私の理解した範囲で簡単にポイントを列挙します。

変更箇所の一覧は以下で確認可能です。  
(README.md の変更は無視してください。)

[GitHubのbranch間のdiff](https://github.com/ma-tu/react-babel-gulp-browserify-tutorial/compare/master...es6)

### import の利用

require していた部分は
```js
var React = require('react');
```

以下のように import に置き換える。
```js
import React  from 'react';
```

ES6書き直し と直接的には関係ないが marked , jquery も package.json の dependencies に追加して
上記の import で利用するようにした。これにより index.html での 余計な script読込部分が削除可能です。

### React.createClass を React.Comporent のクラス継承で表現

以下のような React.CreateClass を
```js
var CommentBox = React.createClass({
  //
});
```
以下のように置き換えます。
```js
class CommentForm extends React.Component {
  //
};
```

また class対応により、function も以下のように置き換えます。

これを
```js
render: function() {
  //
},
```
以下のように置き換えます。  
カンマが不要になり、関数の定義がすっきりします。
```js
render() {
  //
}
```

### constructor の利用

クラス対応と合わせて getInitialState が利用できなくなっているので対応必要です。  
以下のような state の初期化を
```js
getInitialState() {
  return {data: []};
}
```
以下のようにコンストラクタで置き換えます。
```js
constructor(props) {
  super(props);
  this.state = {data: []};
}
```

### this の解決

this が解決できなくなっているので（何故解決できなくなったのかはまだ理解していないです。）.bind(this) を付けて対応するのでもよいが、せっかくだから アロー関数を利用して対応します。

function(arg){...}.bind(this) は (arg) => {} で置き換えます。

こういう関数呼び出しの部分を
```js
this.handleAuthorChange
```
以下な感じで置き換えます。
```js
(e) => this.handleAuthorChange(e)
```

合わせて以下のような部分も
```js
success: function(data) {
  this.setState({data: data});
}.bind(this),
```
 => を利用して以下な感じに修正
 ```js
success: (data) => this.setState({data: data}),
```

### let の利用

せっかくだから var を let に置き換えます。

### ファイル分割

ES6書き直しと直接的に関係ないが、Reactのコンポーネントファイルを分割して見通しを良くします。

各クラスファイルを以下な感じに修正する。import は各クラスで必要な部分を宣言します。  
クラス名の先頭に export default をつけておかないと外部から利用できないので注意。  

```js
import React from 'react'
import $      from 'jquery';
import CommentList from './commentList.jsx';
import CommentForm from './commentForm.jsx';

export default class CommentBox extends React.Component{
  ・・・
}
```

---

## 利用方法
※ node / npm はインストール済みであることを前提とします。

### 1. gulp の インストール
※ gulp がインストール済みの場合は 2. ファイルの配置に進んでください。  

gulp がインストールされていない場合は以下コマンドでグローバルインストールすることを推奨します。
gulp は非常に便利な開発ツールでグローバルインストールすることによりコマンドプロンプトから簡単に利用できるようになります。

```
npm install -g gulp
```

※アンインストールしたくなったら以下で可能です。
```
npm uninstall -g gulp
```

### 2. ファイルの配置
以下のコマンドで clone するか [こちら](https://github.com/ma-tu/react-babel-gulp-browserify-tutorial/archive/master.zip)を Download ZIP して任意のフォルダに配置します。
```
git clone https://github.com/ma-tu/react-babel-gulp-browserify-tutorial.git
```

### 3. 必要なライブラリの取得
上記で配置したフォルダに移動して以下コマンドを実行します。
実行に必要なライブラリが現在のフォルダ以下の node_modules 以下にダウンロードされます。

```
npm install
```
### 4. 実行
以下コマンドを実行すると、簡易サーバーを起動します。Tutorial で利用する server.js と共に Tutorial のソースをコンパイルして起動します。

```
gulp
```

適当なブラウザで [http://localhost:3000/] にアクセスします。

終了は CTRL + C です。

---

# gulpfile の説明

## browserify と babel(babelify)

React.js では JSX 構文を利用しています。(DeNA様のJSXとは無関係です)  
react.js 上の以下のような HTML風(XML風？) の記述が JSX 構文となります。これを実際のブラウザで利用するためには通常のJavaScriptに変換する必要があるのですが、この変換(コンパイル)や、ファイルの統合などを行っているのが browserify と babelity になります。
```js
<div className="commentBox">
  Hello, world! I am a CommentBox.
</div>
```

gulpfile.js の以下記述でそれを行っています。config.entryFile('./src/jsx/example.jsx') のファイルを config.destDir('./public/scripts/') のディレクトリに config.destFile('example.js')　名で出力します。  

**./src/jsx/example.jsx ---(コンパイルと結合)--> ./public/script/example.js**

```
//Browserify
gulp.task('browserify', function() {
  browserify(config.entryFile, {debug: true})
    .transform(babelify)
    .bundle()
    .on("error", function (err) {console.log("ERROR: " + err.message);})
    .pipe(source(config.destFile))
    .pipe(gulp.dest(config.destDir))
});
```

## watch

以下の記述で config.watchFiles('./src/jsx/*.jsx') のファイルに変更があった場合に 上記の browserify の実行を行うように制御されます。これにより ./src/jsx/example.jsx を編集すると自動的に ./public/script/example.js に変換および統合結果が出力されます。

```
//Watch Task
gulp.task('watch', function() {
  gulp.watch(config.watchFiles, ['browserify'])
});
```

## server

以下は gulp 上で Tutorial を実行するための簡易サーバーを起動しています。公式Tutorialで用意されている server.js を呼び出しています。また html/js/json ファイルの変更を監視して必要に応じて自動的にサーバーが再起動されます。

./src 以下のファイルの変更はここでは監視していないのですが、上記の watch で監視され、browserify された結果 ./public 以下のファイルが変更されることになるので そのコンパイル済みの JavaScript ファイルを監視して必要に応じてサーバーを再起動します。

gulp-nodemon を利用しています。

```
gulp.task('server', function () {
  nodemon({ script: './server.js'
          , ext: 'html js json'
          , ignore: ['./node_modules', './src']})
    .on('restart', function () {
      console.log('restarted!')
    })
})
```

# License
MIT としています。
