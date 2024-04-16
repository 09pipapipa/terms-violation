<script setup lang="ts">
import { ref, computed } from 'vue'

const questionButton = ref(false)

const handleClick = () => {
  questionButton.value = !questionButton.value
}

const questionIndex = ref(0)

const questions = [
  {
    question: '薬品補充時してはいけないことは？',
    answers: ['防護眼鏡をかける', 'エプロンをする', 'ゴム手袋をかける', '注ぎ口の掃除をする。'],
    answer: 1
  },
  {
    question: '映像パターン2のSNS動画拡散はなぜ起こった？',
    answers: [
      'スマートフォンの持ち込みを行った。',
      '空調が壊れていたから。',
      'お客様が誰もいなかった。',
      '仕事が早く終わったから。'
    ],
    answer: 0
  }
]

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
            @click="handleClick"
          >
            <input :name="`radio${index}`" type="radio" :value="answerIndex" />
            <span :class="`question-text${answerIndex + 1}`">{{ answer }}</span>
          </label>
        </div>
      </div>
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
