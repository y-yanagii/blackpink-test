<template>
  <div class="text-center">
    <div class="test-card text-center">
      <div class="text-left test-number-area">
        {{ currentTest + 1 + " / " + testTotal }}
      </div>
      <!-- 問題エリア -->
      <Question
        :test="test"
      ></Question>
      <div class="content-area">
        <!-- コンテンツ領域 -->
        <!-- gifの場合 -->
        <div
          v-if="test.embedInfo.embedType === 0"
          class="gif"
        >
          <!-- defaultのGif画像を -->
          <iframe
            :src="test.embedInfo.embedCode"
            width="100%"
            height="100%"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          ></iframe>
        </div>
        
        <!-- <iframe width="85%" height="90%" src="https://www.youtube.com/embed/3E8l6I95cZY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> -->
        <!-- <blockquote class="twitter-tweet" data-dnt="true" data-theme="dark"><p lang="ko" dir="ltr"><a href="https://twitter.com/hashtag/BLACKP1NK_888?src=hash&amp;ref_src=twsrc%5Etfw">#BLACKP1NK_888</a> <a href="https://twitter.com/hashtag/BLACKP1NKINYOURAREA?src=hash&amp;ref_src=twsrc%5Etfw">#BLACKP1NKINYOURAREA</a> <a href="https://twitter.com/hashtag/BLACKPINK?src=hash&amp;ref_src=twsrc%5Etfw">#BLACKPINK</a> 와 <a href="https://twitter.com/hashtag/BLINK?src=hash&amp;ref_src=twsrc%5Etfw">#BLINK</a> 의 특별한 오늘을 축하합니다! <a href="https://t.co/OUTOtMyt7d">pic.twitter.com/OUTOtMyt7d</a></p>&mdash; BLACKPINK GLOBAL BLINK (@ygofficialblink) <a href="https://twitter.com/ygofficialblink/status/894574371083177984?ref_src=twsrc%5Etfw">August 7, 2017</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> -->

        <!-- MUSICの場合 -->
        <MusicTest
          v-if="test.modeType === 5"
          :test="test"
          :audio="getAudio"
        ></MusicTest>
      </div>
      <Options
        :test="test"
        :abcd="abcd"
        :isProcessing="false"
        @option-click="sendAnswer"
      ></Options>
    </div>
    <div
      v-if="test.embedInfo.detail"
      class="sub-code-area"
    >
      <!-- サブコード（埋め込み、api取得元のリンクなどあればここに表示） -->
      <!-- <p><a :href="test.embedInfo.detail.subCode">{{ test.embedInfo.detail.subContent }}</a></p> -->
      <!-- <div v-html="test.embedInfo.detail.subCode"></div> --> <!-- iframe用 -->
      <div
        v-if="test.modeType === $mode.music"
      >
        <a :href="test.embedInfo.detail.subCode">
          <img src="https://linkmaker.itunes.apple.com/assets/shared/badges/ja-jp/music-lrg.svg">
        </a>
      </div>
      <!-- <iframe allow="autoplay *; encrypted-media *; fullscreen *" frameborder="0" height="140" style="width:90%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/album/kill-this-love-japan-version-blackpink-2019-2020-world/1512384089?i=1512385038"></iframe> -->
    </div>
  </div>
</template>

<script>
import Question from '~/components/ui/Question.vue';
import Options from '~/components/ui/Options.vue';
import MusicTest from '~/components/tests/MusicTest.vue';

export default {
  data: function() {
    return {
      abcd: ["A. ", "B. ", "C. ", "D. "],
      audio: false,
    }
  },
  props: ["test", "currentTest", "testTotal"],
  methods: {
    sendAnswer(abcdStr, optionBtnInfo) {
      // 解答送信する前に$emitに渡すオブジェクトを生成
      let sendAnswerInfo = optionBtnInfo.answer
      // 選択した解答のテキストとABCD連番と連結
      sendAnswerInfo.answerContent = abcdStr + optionBtnInfo.optionContent;
      this.$emit('option-click', sendAnswerInfo);
    }
  },
  computed: {
    getAudio() {
      this.audio = this.test.modeType === 5 ? new Audio(this.test.embedInfo.embedCode) : false;
      return this.audio;
    }
  },
  watch: {
    test(newTest) {
      if (newTest.modeType === 5) {
        // 1つ前の問題の曲を止める
        this.audio.pause();
        this.audio = new Audio(newTest.embedInfo.embedCode)
      }
    }
  },
  components: {
    Question,
    Options,
    MusicTest,
  }
}
</script>

<style scoped lang="scss">
  .test-card {
    margin: auto;
    width: 90%;
    border: solid 2px $base-text-color;
    background-color: $card-background-color;
    border-radius: 9px;
  }

  .test-number-area {
    color: $base-text-color;
    padding: 2%;
  }

  // 問題文と解答文のアニメーション
  @keyframes text-in {
    0% {
      transform: translate(-1px, 0px);
      opacity: 0;
    }
  }
  // 問題文と解答文のアニメーション
  .question-item,.option-item {
    vertical-align: middle;
    padding-bottom: 2px;
    display: inline-block;
    min-width: 0.3em;
    animation-direction: normal;
    animation: text-in 0.8s cubic-bezier(0.22, 0.15, 0.25, 1.43) 0s backwards;
  }

// youtube埋め込み用
.movie-wrap {
  position: relative;
  padding-bottom: 56.25%; /*アスペクト比 16:9の場合の縦幅*/
  height: 0;
  overflow: hidden;
}

// youtube埋め込み用
.movie-wrap iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

// gif領域
.gif {
  height: 110px;
}

// サブコード領域（テストカードの下のリンクや埋め込み部分）
.sub-code-area {
  margin: 3%;
}
</style>
