// Global/js/useShare.js

export default {
  onShareAppMessage() {
    return {
      title: '雄安一卡通',
      path: '/pages/index/index',
      imageUrl: '',
      success(res) {
        console.log('分享成功')
        uni.showToast({ title: '分享成功' })
        if (res.shareTickets && res.shareTickets.length > 0) {
          console.log('分享到群成功')
        }
      },
      fail(res) {
        console.log('分享失败', res)
      },
    }
  },
  onShareTimeline() {
    return {
      title: '雄安一卡通',
      query: 'key=value',
      imageUrl: '/static/images/logo.png',
    }
  },
}
