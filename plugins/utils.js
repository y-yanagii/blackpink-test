// injectで関数を共通化
// 選択値をシャッフル
const shuffleOptions = (test) => {
  return test
}

// injectでexport
export default ({}, inject) => {
  inject('test', shuffleOptions)
}
