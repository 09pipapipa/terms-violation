<script setup lang="ts">
import { ref } from 'vue'

const questionButton = ref(false)

const handleClick = () => {
  questionButton.value = !questionButton.value
}
</script>

<template>
  <div class="question-container">
    <div class="question-list">
      <div class="question-content">
        <div class="quiz-number">問１</div>
        <h2 class="quiz-question">薬品補充時してはいけないことは？</h2>
        <ul class="question-answer">
          <li>
            <label
              class="question-button button01"
              :class="{ 'demo active': questionButton, demo: !questionButton }"
              @click="handleClick"
            >
              <input name="radio" type="radio" value="" />
              <span class="question-text01">防護眼鏡をかける</span>
            </label>
          </li>
          <li>
            <label
              class="question-button button02"
              :class="{ 'demo active': questionButton, demo: !questionButton }"
              @click="handleClick"
            >
              <input name="radio" type="radio" value="" />
              <span class="question-text02">エプロンをする</span>
            </label>
          </li>
          <li>
            <label
              class="question-button button03"
              :class="{ 'demo active': questionButton, demo: !questionButton }"
              @click="handleClick"
            >
              <input name="radio" type="radio" value="" />
              <span class="question-text03">ゴム手袋をかける</span>
            </label>
          </li>
          <li>
            <label
              class="question-button button04"
              :class="{ 'demo active': questionButton, demo: !questionButton }"
              @click="handleClick"
            >
              <input name="radio" type="radio" value="" />
              <span class="question-text04">注ぎ口の掃除をする。</span>
            </label>
          </li>
        </ul>
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
.question-answer li {
  list-style: none;
}
.question-answer li label {
  border: 1px solid #000;
  line-height: 1.16;
  font-size: 18px;
  padding: 4px 40px 4px 40px;
  height: 60px;
  display: flex;
  align-items: center;
}
.question-button input[type='radio']:checked + span {
  color: red;
}
.question-button input[type='radio'] {
  display: none;
}
</style>
