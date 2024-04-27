<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// タイマーの設定
const minutes = ref(6)
const seconds = ref(0)

let intervalId = null

const startTimer = () => {
  intervalId = setInterval(() => {
    if (minutes.value === 0 && seconds.value === 0) {
      clearInterval(intervalId)
      return
    }
    if (seconds.value === 0) {
      minutes.value--
      seconds.value = 59
    } else {
      seconds.value--
    }
  }, 1000)
}

//時間を分と秒で表示
const formattedTime = computed(() => {
  const formattedMinutes = minutes.value.toString().padStart(2, '0')
  const formattedSeconds = seconds.value.toString().padStart(2, '0')
  return `${formattedMinutes}:${formattedSeconds}`
})
//コンポーネントがマウントされた後にstartTimerが実行
onMounted(() => {
  startTimer()
})

// ref 関数を使用してリアクティブな変数を作成
const questionIndex = ref(0)

// クイズ情報を格納する
const questions = [
  {
    question: '薬品補充時してはいけないことは？',
    answers: ['防護眼鏡をかける', 'エプロンをする', 'ゴム手袋をかける', '注ぎ口の掃除をする。'],
    answer: 3 // 正解は注ぎ口の～
  },
  {
    question: '映像パターン2のSNS動画拡散はなぜ起こった？',
    answers: [
      'スマートフォンの持ち込みを行った。',
      '空調が壊れていたから。',
      'お客様が誰もいなかった。',
      '仕事が早く終わったから。'
    ],
    answer: 0 // 正解はスマートフォン
  },
  {
    question: 'バイトテロとは？',
    answers: [
      '商品棚に土足で入ること。',
      'ロッカーを撮影すること',
      '商品を大量廃棄すること',
      '不適切行為をSNSにあげること'
    ],
    answer: 3 // 正解はSNS
  },
  {
    question: 'SNSで炎上事件が起こった際、どの期間記事や情報が残る？',
    answers: ['１年', '一生', '10年', '記事が消えるまで'],
    answer: 1 // 正解は一生
  },
  {
    question: '動画内パターン1の企業から学生への損害賠償請求額は？',
    answers: ['150万', '50万', '2850万', '注意と懲戒解雇だけだった'],
    answer: 2 // 正解は2850万
  },
  {
    question: '動画内パターン1の損害賠償の内容で含まれなかったものは？',
    answers: [
      '店長の降格',
      'ブランドイメージの低下',
      '機材の洗浄、交換費用',
      '営業停止日数の営業利益'
    ],
    answer: 0 // 正解は店長の降格
  },
  {
    question: '動画内パターン3の防止策で適切なものは？',
    answers: [
      '社員がその場にいればよかった',
      '監視カメラの設置',
      '定期的な教育',
      'やる人はやるから防止できない'
    ],
    answer: 2 // 定期的な教育
  },
  {
    question: '動画内パターン4での個人店のその後は？',
    answers: [
      '店主に応援メッセージが届き売り上げがアップ',
      'SNSで店に避難中傷が相次ぎ閉店',
      'とりあえず店を一時閉店し頃合いを見て再開',
      '睡眠時間を削り営業しながら示談に向け交渉'
    ],
    answer: 1 // SNSで店に避難中傷が相次ぎ閉店
  },
  {
    question: '洗浄機に足を入れようとしている人を撮影している人は発覚後どうなる？',
    answers: [
      '共犯だが自己都合退職を勧められる。',
      'なぜ止めなかったと言われる',
      'バイトをやめさせる口実ができたと褒められる',
      '共犯として懲戒解雇、賠償責任を問われる'
    ],
    answer: 3 // 共犯として懲戒解雇
  },
  {
    question: '動画内で明日からネットリテラシーを持ち仕事をするのに不適切なものは？',
    answers: [
      '定期的に今日のようなテストを受ける',
      '示談金の用意をする。',
      '仲間とコミュニケーションをとる',
      '職場のことはSNSに投稿しない。'
    ],
    answer: 1 // 示談金の用意をする
  }
]
// questionButtonをリアクティブ変数にする、初期値false
const questionButton = ref(false)
// 回答を追跡し配列を初期化。Array.from()メソッドで新しい配列を作成。nullは何も選択されていない状態にする。questions.lengthは配列の要素数の取得
const selectedAnswers = ref(Array.from({ length: questions.length }, () => null))
// 回答の正誤を表示するために設定。初期値のfalseは最初はどの質問にも正誤が表示されないようにする。
const showResult = ref(Array.from({ length: questions.length }, () => false))

const handleClick = (questionIndex, answerIndex) => {
  // if文を使い回答が行われている場合は処理を中止
  if (selectedAnswers.value[questionIndex] !== null) {
    return
  }
  // 質問に回答を設定する
  selectedAnswers.value[questionIndex] = answerIndex
  // 回答が表示されるようにする
  showResult.value[questionIndex] = true
}
// 選んだ選択肢が正解しているかを判断・追跡
const isCorrect = (questionIndex) => {
  return selectedAnswers.value[questionIndex] === questions[questionIndex].answer
}

// 正解数を算出する
const calculateScore = () => {
  // 正解数の初期化
  let score = 0
  // for ループの条件式 i < questions.length(//questions.lengthは変数の要素の数クイズの質問の数) によって、ループが問題の数だけ繰り返される
  for (let i = 0; i < questions.length; i++) {
    // isCorrect(i) を呼び出して、質問 iが正解か判断
    if (isCorrect(i)) {
      score++ // 正解ならscoreを1増やす
    }
  }
  return score
}

const currentQuestion = computed(() => questions[questionIndex.value])

//正解数を表示する
const AnswersCount = computed(() => calculateScore())
//全問回答したかを確認して条件分岐の用意
const allAnswered = computed(() => {
  return selectedAnswers.value.every((answer) => answer !== null)
})
</script>

<template>
  <div class="question-container">
    <div class="time-border">
      <div class="time-text">残り時間</div>
      <div class="test-time">{{ formattedTime }}</div>
    </div>
    <div class="total-score">
      <div>正解数</div>
      <div>{{ calculateScore() }}/ {{ questions.length }}</div>
    </div>
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
          <div class="quiz-decision">
            {{
              isCorrect(index)
                ? '正解です'
                : '不正解、正解は' + questions[index].answers[questions[index].answer] + 'です'
            }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="allAnswered">
      <p>{{ selectedAnswers }}</p>
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
.question-content {
  border: 1px solid #222;
  background-color: rgba(#fff, 0.4);
  box-shadow: 2px 2px 4px rgba();
  margin-bottom: 10px;
  margin-top: 15px;
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
  margin-top: 15px;
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
  padding: 0 200px 50px;
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

.quiz-decision {
  font-size: 20px;
  text-align: center;
  margin-bottom: 40px;
}
.time-text {
  position: fixed;
  top: 70px;
  right: 55px;
  z-index: 1000;
  font-family: Digital-7, sans-serif;
  font-size: 20px;
}
.test-time {
  position: fixed;
  top: 95px;
  right: 62px;
  z-index: 1000;
  font-family: Digital-7, sans-serif;
  font-size: 25px;
}
.total-score {
  position: fixed;
  top: 130px;
  right: 75px;
  z-index: 1000;
  font-family: Digital-7, sans-serif;
  font-size: 20px;
}
</style>
