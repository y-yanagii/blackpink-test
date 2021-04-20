<template>
  <div class="text-center">
    <div class="test-card text-center">
      <div class="text-left test-number-area">
        {{ currentTest + 1 + " / " + testTotal }}
      </div>
      <div class="question-area">
        <!-- 問題文を1文字ずつ表示させるためv-forでかつspanタグ -->
        {{ q }}
        <span
          v-for="(q, index) in test.question"
          :key="index"
          v-text="q"
          class="question-item"
          :style="{animationDelay: index*100+'ms'}"
        />
      </div>
      <div class="content-area">
        <!-- コンテンツ領域 -->
        <!-- <iframe width="85%" height="90%" src="https://www.youtube.com/embed/3E8l6I95cZY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> -->
        <!-- <blockquote class="twitter-tweet" data-dnt="true" data-theme="dark"><p lang="ko" dir="ltr"><a href="https://twitter.com/hashtag/BLACKP1NK_888?src=hash&amp;ref_src=twsrc%5Etfw">#BLACKP1NK_888</a> <a href="https://twitter.com/hashtag/BLACKP1NKINYOURAREA?src=hash&amp;ref_src=twsrc%5Etfw">#BLACKP1NKINYOURAREA</a> <a href="https://twitter.com/hashtag/BLACKPINK?src=hash&amp;ref_src=twsrc%5Etfw">#BLACKPINK</a> 와 <a href="https://twitter.com/hashtag/BLINK?src=hash&amp;ref_src=twsrc%5Etfw">#BLINK</a> 의 특별한 오늘을 축하합니다! <a href="https://t.co/OUTOtMyt7d">pic.twitter.com/OUTOtMyt7d</a></p>&mdash; BLACKPINK GLOBAL BLINK (@ygofficialblink) <a href="https://twitter.com/ygofficialblink/status/894574371083177984?ref_src=twsrc%5Etfw">August 7, 2017</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> -->
      </div>
      <div class="options-area">
        <!-- 選択肢領域 -->
        <div
          v-for="(optionBtnInfo, index) in test.options"
          :key="index"
        >
          <v-btn
            outlined
            class="option-btn"
            nuxt
            @click="sendAnswer(abcd[index], optionBtnInfo)"
          >
            {{abcd[index]}}
            <span
              v-for="(t, index) in optionBtnInfo.optionContent"
              :key="index"
              v-text="t"
              class="option-item"
              :style="{animationDelay: index*100+'ms'}"
              ref="test_card"
            />
          </v-btn>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      testTotal: 15,
      q: "Q. ",
      abcd: ["A. ", "B. ", "C. ", "D. "],
    }
  },
  props: ["test", "currentTest"],
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
    
  },
  created() {
  }
}
</script>

<style scoped lang="scss">
  .test-card {
    margin: auto;
    width: 90%;
    height: 510px;
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
</style>
