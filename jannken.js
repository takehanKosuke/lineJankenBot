function createReplyMessage(input) {
    // 3. 条件分岐（じゃんけん）
    const hands = ["グー", "チョキ", "パー"];
    // 返信メッセージを入れる変数
    let text;
  
    youHand = hands.indexOf(input)
    // 配列.indexOf(引数) =>
    //   引数が配列の何番目（0始まり）にあるかを返す
    //   引数が配列にない場合、-1を返す
    if (youHand === -1) {
      // ユーザーが入力した内容が「グー、チョキ、パー」以外だった場合
      text = "グー・チョキ・パーのどれかを入力してね";
    } else {
      // 手からランダムに一つ選択
      i = Math.floor(hands.length * Math.random())
      text = hands[i];
      if (i - youHand === 1) {
        console.log("あなたの勝ちです")
      }else if(i - youHand === 0){
        console.log("あいこです")
      }else{
        console.log("あなたの負けです")
      }
    }
  
    return {
      type: "text",
      // 「text: text」のようにキー名と変数名が同じ場合、以下のように省略可能
      // Object Shorthandという文法です
      text
    };
  }

  createReplyMessage('グー')    