export function getDefaultProps(props: any) {
  const defaults: Record<string, any> = {}
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      const prop = props[key]
      // 检查是否有默认值
      if (prop.default !== undefined) {
        // 如果 default 是一个函数，则调用它获取默认值
        defaults[key] = typeof prop.default === 'function' ? prop.default() : prop.default
      }
      else if (prop.type === Boolean) {
        // 如果属性类型是 Boolean 并且没有指定默认值，则默认为 false
        defaults[key] = false
      }
      else if (prop.type === Number) {
        // 如果属性类型是 Number 并且没有指定默认值，则默认为 0
        defaults[key] = 0
      }
      else if (prop.type === String) {
        // 如果属性类型是 String 并且没有指定默认值，则默认为空字符串
        defaults[key] = ''
      }
      else if (prop.type === Array) {
        // 如果属性类型是 Array 并且没有指定默认值，则默认为空数组
        defaults[key] = []
      }
      else if (prop.type === Object) {
        // 如果属性类型是 Object 并且没有指定默认值，则默认为空对象
        defaults[key] = {}
      }
      else {
        // 如果没有匹配的类型，默认值为 undefined
        defaults[key] = undefined
      }
    }
  }
  return defaults
}
