# 制作手順
### 1. socket.io環境の構築
```
npm init
node -v
v14.17.6
npm install express
npm install socket.io
```

### 2. インターフェイスを作成する
・index.htmlファイルを作成する。


### 3. 8thwall画面を作成する
・multi.htmlファイルを作成する。
・8thwallの画面に遷移させる

### 4. githubとherokuを連携する
```
heroku login (初回のみ)
git init(初回のみ)
git add .
git commit -m ""
heroku create(初回のみ)
git push heroku master
heroku apps:rename newname(heroku appの名前を変更したい場合)
heroku open
```

### 5. package.jsonにnpm startを追記
herokuの特性として最初にnpm startを実行する癖がある。
なので、npm startを追記する。


### 6. server.jsを作成する
rootにアクセスすると、index.htmlを返す。
/xxxxにアクセスすると、multi.htmlを返す。

### 7. multi.htmlを8thwallなコードに変更
まずは、シンプルに"a-box"を出してみる

### 8. socket.ioの実装

### 9. jsとcssファイルの外だし
```
app.use(express.static('public'));
//publicからのpathで各ファイルを読み込む
```

### 10. stats.jsでパフォーマンスをリアルタイムに計測する
https://github.com/mrdoob/stats.js





...つづく