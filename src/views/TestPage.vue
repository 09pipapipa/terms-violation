<script setup lang="ts">
//questionIndex クイズの現在の質問のインデックスを追跡
//questionButton 各質問に対する選択肢の回答が選択されたかどうかを追跡
//selectedAnswers ユーザーが選択した各質問の回答を追跡するための配列
//showResult 各質問の回答が表示されるかどうかを追跡
import { ref, computed } from 'vue'

//ref 関数を使用してリアクティブな変数を作成
const questionIndex = ref(0)

//クイズ情報を格納する
const questions = [
  {
    question: '薬品補充時してはいけないことは？',
    answers: ['防護眼鏡をかける', 'エプロンをする', 'ゴム手袋をかける', '注ぎ口の掃除をする。'],
    answer: 3 //正解は注ぎ口の～
  },
  {
    question: '映像パターン2のSNS動画拡散はなぜ起こった？',
    answers: [
      'スマートフォンの持ち込みを行った。',
      '空調が壊れていたから。',
      'お客様が誰もいなかった。',
      '仕事が早く終わったから。'
    ],
    answer: 0 //正解はスマートフォン
  }
]
//questionButtonをリアクティブ変数にする、初期値false
const questionButton = ref(false)
//回答を追跡し配列を初期化。Array.from()メソッドで新しい配列を作成。nullは何も選択されていない状態にする。questions.lengthは配列の要素数の取得
const selectedAnswers = ref(Array.from({ length: questions.length }, () => null))
//回答の正誤を表示するために設定。初期値のfalseは最初はどの質問にも正誤が表示されないようにする。
const showResult = ref(Array.from({ length: questions.length }, () => false))

const handleClick = (questionIndex, answerIndex) => {
  //if文を使い回答が行われている場合は処理を中止
  if (selectedAnswers.value[questionIndex] !== null) {
    return
  }
  // 質問に回答を設定する
  selectedAnswers.value[questionIndex] = answerIndex
  // 回答が表示されるようにする
  showResult.value[questionIndex] = true
}
//選んだ選択肢が正解しているかを判断・追跡
const isCorrect = (questionIndex) => {
  return selectedAnswers.value[questionIndex] === questions[questionIndex].answer
}

//正解数を算出する
const calculateScore = () => {
  //正解数の初期化
  let score = 0
  //for ループの条件式 i < questions.length(//questions.lengthは変数の要素の数クイズの質問の数) によって、ループが問題の数だけ繰り返される
  for (let i = 0; i < questions.length; i++) {
    //isCorrect(i) を呼び出して、質問 iが正解か判断
    if (isCorrect(i)) {
      score++ //正解ならscoreを1増やす
    }
  }
  return score
}

const currentQuestion = computed(() => questions[questionIndex.value])
</script>

<template>
  <div class="question-container">
    <div class="question-list">
      <div v-for="(question, index) in questions" :key="index" class="question-content">
        <div class="quiz-number">問{{ index + 1 }}</div>
        <h2 class="quiz-question">{{ question.question }}</h2>
        <div class="question-answer">
          <label
            v-for="(answer, answerIndex) in question.answers"
            :key="answerIndex"
            :class="[
              'question-button',
              `button${answerIndex + 1}`,
              { 'demo active': questionButton, demo: !questionButton }
            ]"
            @click="handleClick(index, answerIndex)"
          >
            <input :name="`radio${index}`" type="radio" :value="answerIndex" />
            <span :class="`question-text${answerIndex + 1}`">{{ answer }}</span>
          </label>
        </div>
        <div v-if="showResult[index]" class="result-message">
          <p>
            {{
              isCorrect(index)
                ? '正解です'
                : '不正解、正解は' + questions[index].answers[questions[index].answer] + 'です'
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="total-score">
      <p>正解数:{{ calculateScore() }}/ {{ questions.length }}</p>
    </div>
  </div>
</template>

<style scoped>
.question-container {
  position: relative;
  width: calc(100% - 60px);
  margin: 0 auto;
  max-width: 1000px;
}
.question-list {
}
.question-content {
  border: 1px solid #222;
  background-color: rgba(#fff, 0.4);
  box-shadow: 2px 2px 4px rgba();
  margin-bottom: 10px;
}
.quiz-number {
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  border-bottom: 1px solid #222;
  padding: 20px;
}
.quiz-question {
  font-size: 32px;
  font-weight: bold;
  line-height: 1.8;
  margin-bottom: 40px;
  position: relative;
  text-align: center;
  padding: 30px 200px 0px;
}
.question-answer {
  display: grid;
  position: relative;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 0 200px 100px;
}
.question-answer {
  list-style: none;
}
.question-answer label {
  border: 1px solid #000;
  line-height: 1.16;
  font-size: 18px;
  padding: 4px 40px 4px 40px;
  height: 60px;
  display: flex;
  align-items: center;
}
.question-button input[type='radio']:checked + span {
  color: gray;
}
.question-button input[type='radio'] {
  display: none;
}
</style>
