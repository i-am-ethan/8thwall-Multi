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

### 10. stats.js for aframeでパフォーマンスをリアルタイムに計測する
https://github.com/mrdoob/stats.js
```
npm install stats.js
```
a-sceneにstatsを追加する

### 11. idを取得してdebug-consoleに出力する

### 12. 部屋を作る処理の実装
urlで分ける
```
const makeRoomButton = document.getElementById('make-room')
makeRoomButton.addEventListener('click', ()=>{
    let url = "https://" + location.hostname + "/multi?room=" + Math.floor(Math.random() * 10000, 0)//4桁の数字
    console.log(url)
    window.location.href = url;
})
```

### 13. 部屋番号を入力したらhostと同じurlに接続する
```
const inputRoomID = document.getElementById('input-room-id') // input要素取得
const joinRoomButton = document.getElementById('join-room') // input type button

joinRoomButton.addEventListener("click", ()=>{
    let url = "https://" + location.hostname + "/multi?room=" + inputRoomID.value
    window.location.href = url;
})
```

### 14. 同じ部屋に参加して同期したことを知らせる(端末2台必須)
server.jsのsocket.on('connection)の中に記述していく


### 15. boxの位置情報同期する


...つづく