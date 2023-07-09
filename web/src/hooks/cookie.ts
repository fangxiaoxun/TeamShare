import Cookies from 'js-cookie'

export const setCookie = (label: string, value: any, cookieExpires: any) => {
  //          名称   保存的值           保存的时间
  Cookies.set(label, value, { expires: cookieExpires })
}

export const getCookie = (label: string) => {
  const value = Cookies.get(label)
  if (value) return value
  else return false
}

export const delCookie = (label: string) => {
  Cookies.remove(label)
}
