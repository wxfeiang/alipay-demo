/**
 * 显示消息提示框
 * @param title
 * @param options
 * @constructor
 */
export function Toast(title: string, options?: Partial<UniApp.ShowToastOptions>) {
  // #ifdef  MP-ALIPAY
  uni.showToast({
    title,
    duration: 3000,
    icon: 'none',
    ...options,
  })
  // #endif
  // #ifndef  MP-ALIPAY
  uni.showToast({
    title,
    duration: 3000,
    icon: 'none',
    mask: true,
    ...options,
  })
  // #endif
}

/**
 * 隐藏消息提示框
 */
export function HideToast() {
  uni.hideToast()
}

/**
 * 显示 loading 提示框
 * @param title
 * @param options
 * @constructor
 */
export function Loading(title: string, options?: Partial<UniApp.ShowLoadingOptions>) {
  // #ifdef  MP-ALIPAY
  uni.showLoading({
    title,
    // mask: true,
    ...options,
  })
  // #endif
  // #ifndef  MP-ALIPAY
  uni.showLoading({
    title,
    mask: true,
    ...options,
  })
  // #endif
}

/**
 * 隐藏 loading 提示框
 */
export function HideLoading() {
  uni.hideLoading()
}

/**
 * 显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮
 * @param options
 * @constructor
 */
export function Modal(options: UniApp.ShowModalOptions) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      ...options,
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res)
      },
    })
  })
}

/**
 * 从底部向上弹出操作菜单
 * @param options
 * @constructor
 */
export function ActionSheet(options: UniApp.ShowActionSheetOptions) {
  return new Promise((resolve, reject) => {
    uni.showActionSheet({
      ...options,
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res)
      },
    })
  })
}
