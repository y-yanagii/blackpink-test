<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
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
                    v-for="(notice, index) in notices"
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
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="pageLength"
              class="pagenation-btn"
              color="#f4a6b8"
            ></v-pagination>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase";

export default {
  data() {
    return {
      notices: [],
      displayNotices: [],
      page: 1,
      pageLength: 3,
    }
  },
  firestore: {
    notices: db.collection("notices").orderBy('createdAt', 'desc')
  },
  filters: {
    dateFormat: function(value) {
      // yyyy/mm/ddの形に変換
      const date = value;
      return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    }
  },
}
</script>

<style scoped lang="scss">
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
  color: $base-text-color !important;
  border-bottom: solid 1px $base-text-color !important;
}

// テーブルのcontent領域
.notice-content {
  word-break: break-all;
}
</style>
