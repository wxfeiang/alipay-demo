// 全局要用的类型放到这里
type IUserInfo = {
  nickname?: string
  avatar?: string
  /** 微信的 openid，非微信没有这个字段 */
  openid?: string
  token?: string
  tokenTime?: number // 当前时间戳
  appSign?: string // app 签名
  userName?: string
  userPhone?: string
  userId?: string
  userDId?: string | number
  bankCard?: string // 社保卡默认的关联银行卡号
  sex?: '1' | '2' // 1:男 2:女
  cardType?: '0' | '1' | '2' | '3' // 是否申请完成判断  社保卡类型：0：未领取，1：持有二代卡，2：持有三代卡（非雄安一卡通），3：持有雄安一卡通
  cardStatus?: string // 电子社保卡状态：0：未申请电子社保卡，1：已申请电子社保卡，2：未知
  isAuth?: boolean // 是否认证
  isBind?: boolean // 是否绑定手机号
  isReal?: '1' | '0' // 1.实名，0.未实名
  address?: string
  merchantId?: string // 商户id
  cardId?: string // 卡id 社保卡详情用
  userAvatar?: string // 用户头像
  cardName?: string // 用户身份证姓名
  cardNameTm?: string // 用户身份证姓名 脱敏
  idCardNumber?: string
  idCardNumberTm?: string // 用户身份证号码 脱敏
  socialCardType?: string // 是否一卡通用户  0未申领  //1一卡通
  socialCard?: string // 社会保障卡号
  socialCardTm?: string // 社会保障卡号 脱敏
  loginType?: '1' | '2' // 1：微信快捷d登录 2：手机号
  isPay?: '0' | '1' // 是否支付密码 0：未设置 1：已设置
  payFeeLimit?: number // 支付限额
  trafficNumber?: string // 公交卡号
}

enum TestEnum {
  A = 'a',
  B = 'b',
}
