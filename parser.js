// 测试数据
var jsonStr = '{"a":1,"b":true,"c":false,"foo":null,"bar":[1,2,3]}'
var i = 0

// 判断传进来是什么类型
function parseValue() {
    if (str[i] === '{') {
        return parseObject()
      } else if (str[i] === '[') {
        return parseArray()
      } else if (str[i] === 'n') {
        return parseNull()
      } else if (str[i] === 't') {
        return parseTrue()
      } else if (str[i] === 'f') {
        return parseFalse()
      } else if (str[i] === '"') {
        return parseString()
      } else {//如果不考虑出错的话，不是以上所有的情况即
        return parseNumber()
      }
}

// 