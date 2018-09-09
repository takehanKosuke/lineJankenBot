// const path = require("path");
// // フレームワークの繋げるやつ
// const express = require("express");
// // LineのAPI
// const line = require("@line/bot-sdk");

// // Lineのアクセストークン
// const lineConfig = {
//   channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
//   channelSecret: process.env.LINE_CHANNEL_SECRET
// };
// const lineClient = new line.Client(lineConfig);


// function createReplyMessage(input) {
//   // 1. 固定メッセージを返す
//   return {
//     type: "text",
//     text: "暗殺教室面白いよね！！"
//   };
// }

// const server = express();
// // サーバーから画像を返す
// server.use("/images", express.static(path.join(__dirname, "images")));

// // ここでlineにpostする
// server.post("/webhook", line.middleware(lineConfig), (req, res) => {
//   // LINEのサーバーに200を返す
//   res.sendStatus(200);

//   for (const event of req.body.events) {
//     if (event.type === "message" && event.message.type === "text") {
//       const message = createReplyMessage(event.message.text);
//       lineClient.replyMessage(event.replyToken, message);
//     }
//   }
// });

// server.listen(process.env.PORT || 8080);


const path = require("path");
const express = require("express");
const line = require("@line/bot-sdk");

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};
const lineClient = new line.Client(lineConfig);

function createReplyMessage(input) {
  // 3. 画像を返す

  const appUrl = process.env.HEROKU_APP_URL;
  return {
    type: "image",
    previewImageUrl: `${appUrl}images/question.png`,
    originalContentUrl: `${appUrl}images/answer.png`
  };

  // メッセージオブジェクトに関する公式ドキュメント
  // https://developers.line.me/ja/reference/messaging-api/#message-objects
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
