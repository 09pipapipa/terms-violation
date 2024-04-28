<script setup lang="ts"></script>

<template>
  <div class="top-container">
    <div class="top-direction">
      <p class="confirmation-text">就業するにあたりコンプライアンス動画の視聴をお願いします。</p>
      <p class="confirmation-text">視聴が終了したら下記リンクから確認テストを実施して下さい。</p>
      <p class="confirmation-text">ボタンを押すと始まりテストは4択全10問となります。</p>
      <p class="confirmation-text">テスト終了後の画面は消さずに端末を従業員へ渡してください。</p>
    </div>
    <!-- 仮動画なので差し替え予定 -->
    <div class="compliance_video">
      <video controls width="550">
        <source src="/media/temporary.mp4" type="video/webm" />
      </video>
    </div>
    <nav>
      <div class="start-btn">
        <router-link to="/TestPage" class="btn-start">試験開始</router-link>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.top-direction {
  height: 150px;
  padding-bottom: 20px;
}

.confirmation-text {
  text-align: center;
}

.compliance_video {
  margin-bottom: 30px;
}

.start-btn {
  text-align: center;
  margin-bottom: 30px;
  height: 30px;
  width: 100%;
}
.btn-start {
  display: inline-block;
  background-color: #fff;
  border: 2px solid #333;
  padding: 0.6em 2.5em 0.6em 2em;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 5);
  text-decoration: none;
  text-align: center;
  color: black;
}

.btn-start:hover {
  background-color: #333;
  color: #fff;
  transition: 0.2s;
}
.btn-start:active {
  border-bottom: none;
  transform: translateY(2px);
  bottom: -1px;
}
</style>
