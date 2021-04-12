<template>
  <div>
    <div>
      <span style="color: pink;">
        {{ minutes | zeroPad }}:{{ seconds | zeroPad }}:{{ milliSeconds | zeroPad(3) }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      animateFrame: 0, // requestAnimationFrame(cd)の返り値(requestID)が入る
      nowTime: 0, // 現在時刻
      diffTime: 0, // 現在時刻とスタートボタンを押した時刻の差
      startTime: 0, // スタートボタンを押した時刻
      isRunning: false // 計測中の状態保持
    }
  },
  created() {
    // タイマースタート
    // loop()内でthisの値が変更されるため退避
    var vm = this;
    // 計測開始フラグ
    vm.isRunning = true;

    // loop処理
    (function loop() {
      vm.nowTime = Math.floor(performance.now());
      vm.diffTime = vm.nowTime - vm.startTime;
      vm.animateFrame = requestAnimationFrame(loop);
    }());
    
  },
  computed: {
    minutes: function() {
      // 分数を計算(60分になったら0分に戻る)
      return Math.floor(this.diffTime / 1000 / 60) % 60;
    },
    seconds: function() {
      // 秒数を計算(60秒になったら0秒に戻る)
      return Math.floor(this.diffTime / 1000) % 60;
    },
    milliSeconds: function() {
      // ミリ秒を計算(1000ミリ秒になったら0ミリ秒に戻る)
      return Math.floor(this.diffTime % 1000)
    }
  },
  filters: {
    // フォーマット整形
    zeroPad: function(value, num) {
      // タイマーを0埋め
      var num = typeof num !== 'undefined' ? num : 2;
      return value.toString().padStart(num, "0");
    }
  },
}
</script>
