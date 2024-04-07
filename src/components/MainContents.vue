<script setup lang="ts"></script>

<template>
  <div class="top-container">
    <div class="top-direction">
      <p>就業するにあたりコンプライアンス動画の視聴をお願いします。</p>
      <p>視聴が終了したら下記リンクから確認テストを実施して下さい。</p>
      <p>テストは制限時間10分、4択全10問となります。</p>
      <p>テスト終了後の画面は消さずに端末を従業員へ渡してください。</p>
    </div>
    <div class="compliance_video">
      <video controls width="600">
        <source src="/media/temporary.mp4" type="video/webm" />
      </video>
    </div>
    <div class="start-btn">
      <button class="btn-start"></button>
    </div>
  </div>
</template>

<style scoped></style>
