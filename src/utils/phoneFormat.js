export default (phone, phoneNum = phone.toString()) => {
  phoneNum = phoneNum.replace(/[- )(]/g, "")
  if (phoneNum.length >= 10) {
    let length = phoneNum.length - 10
    phoneNum = "+91" + phoneNum.substring(length)
  }
  return phoneNum
}
