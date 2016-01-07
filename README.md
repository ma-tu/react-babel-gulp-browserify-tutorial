# react-babel-gulp-browserify-tutorial について

React.js の Tutorial を gulp (browserify + babel) を利用してすぐに始めることが可能です。  
はやりの React.js を体験してみませんか？

React.js の version は 0.14.5 で 2016年1月時点のライブラリで作成しています。Windows 環境で確認しています。  
以下の Tutorial を利用します。

* [React Tutorial公式](https://facebook.github.io/react/docs/tutorial.html)
* [React v0.14 チュートリアル【日本語翻訳】](http://mae.chab.in/archives/2762)

この [React v0.14 チュートリアル【日本語翻訳】](http://mae.chab.in/archives/2762) は本当に感謝です。

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

終了は CTRL + C です。

### 5. 学習開始

適当なブラウザで http://localhost:3000/ にアクセスします。初期状態では Tutorial を完了した状態で起動します。  
動いていることを確認したら、CTRL + C で一旦終了します。

Tutorial では index.html の scriptタグ を利用して学習を進めるようになっていますが、gulp により /src/jsx/example.jsx を変更すると、自動でサーバーが再起動されるようになっているので、/src/jsx/example.jsx を編集しながら学習を進めてください。  
※編集して保存すると自動でサーバーは更新されますが、ブラウザのリロードは特に制御していないので、ブラウザの更新は行ってください。

Tutorial の Your first component: の CommentBox コンポーネント作成のコードを /src/jsx/example.jsx に張り付けて、 gulp コマンドでサーバーを起動して学習を始めましょう。

git clone にて環境を作成した場合は以下のブランチ変更を利用して学習を始めることも可能です。
```
git checkout start
```

Tutorialを参考にしながら、 /src/jsx/example.jsx を変更して React.js を体験しましょう。

### 6. 学習が終了したら

上記で利用したフォルダを削除するだけで特にゴミは残りません。利用した gulp をどうしても削除しておきたい場合は、1. gulp の インストール を参考にしてください。

後はReact.js の他のサンプルをみたり、はやりの React.js + redux を試してみるのもよいと思います。

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
