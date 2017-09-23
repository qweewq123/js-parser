// 测试数据
let jsonStr = '{"a":1,"b":true,"c":false,"foo":null,"bar":[1,2,3]}';
let i = 0;

// 判断传进来是什么类型
function parseValue() {
    if (str[i] === '{') {
        return parseObject();
      } else if (str[i] === '[') {
        return parseArray();
      } else if (str[i] === 'n') {
        return parseNull();
      } else if (str[i] === 't') {
        return parseTrue();
      } else if (str[i] === 'f') {
        return parseFalse();
      } else if (str[i] === '"') {
        return parseString();
      } else {//如果不考虑出错的话，不是以上所有的情况即
        return parseNumber();
      }
}

// 所以的函数都是从i位置开始解析出相应的类型，同时移动i的位置，有种指针的感觉

//对字符串解析
function parseString() {
    let result = '';
    i++ //开始解析之前，i是指向字符开始的双引号，但不能包含此“
    while(str[i] != '"'){
        result += str[i++];
    }
    i++;
    return result;
}

// 对null的解析
function parseNull() {
    // 往后读出四位判别
    let content = str.substr(i,4);
    if ( content === 'null'){
        i+=4;
        return null;
    } else {
       throw new Error(`Unexpected char : ${i}`)
    }
    
}

// 对false的解析
function parseFalse() {
    let content = str.substr(i, 5);
    if ( content === 'false'){
        i+=5;
        return false;
    } else {
       throw new Error(`Unexpected char : ${i}`)
    }
}

// 对true的解析
function parseTrue() {
    let content = str.substr(i, 4);
    if ( content === 'true'){
        i+=4;
        return true;
    } else {
       throw new Error(`Unexpected char : ${i}`)
    }
}

// 对parsenumber处理
function parseNumber() {
    // 本函数的实现并没有考虑内容格式的问题，实际上JSON中的数值需要满足一个格式
  // 不过好在这个格式基本可以用正则表达出来，不过这里就不写了
  // 想写的话对着官网的铁路图写一个出来就行了
  // 并且由于最后调用了parseFloat，所以如果格式不对，还是会报错
    let numStr = '';//-2e+8
    while(isNumberChar(str[i])){
        numStr += str[i++]
    }
    return parseFloat(numStr);
}

// 判断字符c是否组成JSON中数值的符号
function isNumberChar(c) {
    let chars = {
        '-': true,
        '+': true,
        'e': true,
        'E': true,
        '.': true
    }
    if (chars[c]){
        return true;
    }
    if (c >= '0' && c <= '9') {
        return true;
      }
      return false;
}

// 解析数组，通过逗号分析
function parseArray() {
    i++;
    let result = [];
    while (str[i] != ']') {
        result.push(parseValue());
        if(str[i] === ','){
            i++;
        }
    }
    i++;
    return result;
}

// 解析对象
function parseObject() {
    i++
    let result = {}//{"a":1,"b":2}
    while(str[i] !== '}') {
      let key = parseString()
      i++//由于只考虑合法且无多余空白的JSON，所以这里就不判断是不是逗号了，正常应该是发现不是逗号就报错的
      let value = parseValue()
      result[key] = value
      if (str[i] === ',') {
        i++
      }
    }
    i++
    return result
  }