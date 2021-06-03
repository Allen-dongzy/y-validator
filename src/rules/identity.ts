import { isFunction, getType } from '../tools/validationTypes'
import { Value, RulesResponse } from '../types'
import ruleBack from './ruleBack'

// 默认错误提示
const errMsg: string = '身份证格式错误'

// 身份证校验-严谨结果
export const identity = (value: Value): RulesResponse => {
  const expectType: string = 'string'
  const currentType: string = getType(value)
  return ruleBack({
    res: isIdentity(value),
    errMsg,
    expectType,
    currentType
  })
}

// 身份证校验-简单结果
export const isIdentity = (value: Value, info?: string | Function, toast?: Function): boolean => {
  if (isFunction(info)) {
    toast = info as Function
    info = errMsg
  }
  const identityRegExg: RegExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  const res = identityRegExg.test(value as string)
  if (!res && info && toast) toast(info as string)
  return res
}
