import { useState } from "react";

function App() {
  const [idCounter, setIdCounter] = useState(0);
  const [sentences, setSentence] = useState([]);
  //const [value, setValue] = useState([]);

  /**
   * フォーム送信したらsentence配列にsentenceを追加
   * @param {Event} e 送信イベント
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputTexts = [
      e.target["sentence1"].value,
      e.target["sentence2"].value,
    ];
    const nextid = idCounter + 1;
    setIdCounter(nextid);
    setSentence([
      ...sentences,
      {
        id: nextid,
        sentence: inputTexts,
        checked: false,
      },
    ]);
    //setValue("");
  };

  /**
   * sentenceのチェックボックスがクリックされた時、該当の checked フラグを toggle する
   * @param {number} id
   */
  const onChangeCheckBox = (id) => {
    const changedSentences = sentences.map((sentence) => {
      if (sentence.id === id) {
        return { ...sentence, checked: !sentence.checked };
      }
      return sentence;
    });
    setSentence(changedSentences);
  };

  /**
   * shuffleボタン押下時、sentences配列の順番をランダムに並び替える
   * @param {number} id
   */
  const shuffleSetntence = ()=>{
    for (let i = sentences.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sentences[i], sentences[j]] = [sentences[j], sentences[i]];
    }
  }
  const onClickShuffleButton = (sentences) => {
    const changedSentences = (sentences)=>{
      return shuffleSetntence(sentences);
    };
    setSentence(changedSentences);
    console.log("ちぇんじ" + JSON.stringify(sentences));
  };

  /**
   * refreshボタンが押下された時、sentences配列のチェックが入った要素を非表示にする
   * @param {number} id
   */
  const onClickRefreshButton = () => {
    setSentence(sentences.filter((sentence) => sentence.checked === false));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="sentence1" />
        <input type="text" name="sentence2" />
        <button>登録</button>
      </form>
      <button id="sub" onClick={() => onClickShuffleButton(sentences)}>
        shuffle
      </button>
      <button id="sub" onClick={() => onClickRefreshButton(sentences)}>
        refresh
      </button>
      <br></br>
      <p id="main">
        {sentences.map((displayRow) => (
          <div
            key={displayRow.id}
            //className={displayRow.checked ? "checked" : ""}
          >
            <input
              type="checkbox"
              onChange={() => onChangeCheckBox(displayRow.id)}
            />
            {displayRow.sentence[0] + " " + displayRow.sentence[1]}
            {console.log("aaaa" + sentences)}
          </div>
        ))}
      </p>
    </div>
  );
}

export default App;
