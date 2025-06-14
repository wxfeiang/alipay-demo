export const testUserName = (name) => {
  return /^(?=[a-z0-9A-Z\u4e00-\u9fa5·]{2,20}$)[a-z0-9A-Z\u4e00-\u9fa5]+·?[a-z0-9A-Z\u4e00-\u9fa5]+$/.test(
    name,
  )
}
