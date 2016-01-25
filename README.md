# react-babel-gulp-browserify-tutorial の branch : es6-redux について

react-babel-gulp-browserify-tutorial の master ブランチの tutorial 成果物を 最近はやりのFluxのライブラリである(Redux)を利用して書き直したものになります。  
またECMA2015(ECMA6) を利用して記述しています。  
ECMA6 はこれからの JavaScript で書くのが当たり前になってくると強く感じます。

React の入門に合わせて Redux にも入門してみましょう。

書き直し作業は以下を参考にして対応しました。本当に感謝です。

* [Redux の本家ページ](http://rackt.org/redux/index.html)
* [Redux入門 Reduxとは（公式ドキュメント和訳）](http://qiita.com/kiita312/items/b001839150ab04a6a427)
* [ReduxとES6でReact.jsのチュートリアルの写経](http://blog.bokuweb.me/entry/redux-tutorial)

また合わせて Mocha + power-assert を利用して、UnitTestも追加しました。 React + Redux はテストしやすいのでこの点でも評価高いと感じました。

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
以下のコマンドで clone するか [こちら](https://github.com/ma-tu/react-babel-gulp-browserify-tutorial/archive/es6-redux.zip)を Download ZIP して任意のフォルダに配置します。
```
git clone https://github.com/ma-tu/react-babel-gulp-browserify-tutorial.git
cd react-babel-gulp-browserify-tutorial
git checkout es6-redux
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
