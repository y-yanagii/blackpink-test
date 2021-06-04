<template>
  <div class="notice-parent">
    <v-row justify="center" align="center" class="notice">
      <v-col cols="12" md="6" style="height: 100%;">
        <div class="text-center">
          <div class="text-center">
            <div class="OtherLogo">
              <span class="title-logo">
                NOTICE
              </span>
            </div>
          </div>
          <div class="text-center">
            <div>
              <v-simple-table
                dense
                fixed-header
                class="notices-table"
                height="400px"
              >
                <thead>
                  <tr>
                    <th class="text-left notice-header">UPDATE</th>
                    <th class="text-left notice-header">NOTICE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(notice, index) in displayNotices"
                    :key="index"
                  >
                    <td class="text-left notice-created-at">
                      {{ notice.createdAt.toDate() | dateFormat }}
                    </td>
                    <td class="text-left notice-content">
                      {{ notice.content }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </div>
          </div>
          <div class="text-center mt-2">
            <v-pagination
              v-model="page"
              :length="pageLength"
              class="pagenation-btn"
              color="#f4a6b8"
              @input="pageChange"
            ></v-pagination>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1, // 初期ページ
      pageSize: 10, // 1ページに対してのお知らせの数
    }
  },
  computed: {
    notices() {
      // notices情報取得
      return this.$store.state.notices.notices
    },
    displayNotices: {
      // デフォルトでcomputedはget()。pageChangeメソッドでセットしたいためset(value) {}を設定
      get() {
        // sliceで選択したページ数と一致するnoticesを取得
        return this.notices.slice(this.pageSize * (this.page - 1), this.pageSize * (this.page));
      },
      set(value) {}
    },
    pageLength() {
      // 小数点を切り上げてページ数を返す
      return Math.ceil(this.notices.length / this.pageSize);
    }
  },
  methods: {
    pageChange(pageNumber) {
      // sliceの引数は要素数なので第一引数は-1
      this.displayNotices = this.notices.slice(this.pageSize * (pageNumber - 1), this.pageSize * (pageNumber));
    },
  },
  filters: {
    dateFormat: function(value) {
      // yyyy/mm/ddの形に変換
      const date = value;
      return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    }
  },
  created() {
    // noticesコレクションの初期化
    this.$store.dispatch('notices/init');
  },
}
</script>

<style scoped lang="scss">
.notice-parent {
  height: 100%;
}
.notice {
  height: 100%;
  // background: linear-gradient(247deg,pink 50%,pink 50%,black 50%,black 50%) !important;
}

// テーブル
.notices-table {
  width: 100%;
  background-color: $base-bg-color;
  border: solid 2px $base-text-color;
}

// テーブルヘッダ
.notice-header {
  background-color: $base-bg-color !important;
  color: $base-text-color !important;
}

// テーブルのupdate, content領域
.notice-created-at, .notice-content {
  border-bottom: solid 1px $base-text-color !important;
}

// テーブルのcontent領域
.notice-content {
  word-break: break-all;
}
</style>
