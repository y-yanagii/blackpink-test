import axios from 'axios';

const actions = {
  sendSlackOfError(context, payload) {
    // エラー情報をスラックに通知
    // slack APIが受け取れるオブジェクトを生成
    const data = {
      text: payload.arrayMessage.join('\n'),
      username: 'Blink Games BOT',
      icon_emoji: ':ghost:',
    };

    // axiosでslack通知
    axios.post('/services' + process.env.SLACK_ERROR_PATH, data);
  },
};

export default {
  actions,
}
