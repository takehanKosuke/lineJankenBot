const path = require("path");
const express = require("express");
const line = require("@line/bot-sdk");

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};
const lineClient = new line.Client(lineConfig);

function createReplyMessage(input) {
  let title
  let text
  let actions
  $columns = array(
    array(title   => 'タイトル最大４０文字',
          text    => 'タイトルか画像がある場合は最大60文字、どちらもない場合は最大120文字',
          actions => array(array(type => message, label => ラベルです, text => メッセージ)) 
    ),
    array(title   => 'タイトル最大４０文字',
          text    => 'タイトルか画像がある場合は最大60文字、どちらもない場合は最大120文字',
          actions => array(array(type => message, label => ラベルです, text => メッセージ)) 
    )            
);
  }

const server = express();

server.use("/images", express.static(path.join(__dirname, "images")));

server.post("/webhook", line.middleware(lineConfig), (req, res) => {
  // LINEのサーバーに200を返す
  res.sendStatus(200);

  for (const event of req.body.events) {
    if (event.type === "message" && event.message.type === "text") {
      const message = createReplyMessage(event.message.text);
      lineClient.replyMessage(event.replyToken, message);
    }
  }
});

server.listen(process.env.PORT || 8080);
