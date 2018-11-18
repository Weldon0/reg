// const regex = /hello/;

/**
 * 横向模糊匹配
 * {m,n}，表示连续出现最少m次，最多n次。
 */
(() => {
    const regex = /ab{2,5}c/g; // 第一个字符是a, 第2-5个字符是b，接下来是c的字符
    const string = "abc abbc abbbc abbbbc abbbbc abbbbbbc";
    console.log(string.match(regex));
    // => ["abbc", "abbbc", "abbbbc", "abbbbbc"]
})();

/**
 * 纵向模糊匹配
 * [abc]，表示该字符是可以字符“a”、“b”、“c”中的任何一个。
 */
(() => {
    const regex = /a[0123]b/g;
    const string = 'a0b a2b a3b a9b';
    console.log(string.match(regex));
})();

/**
 * 字符组
 * 比如[123456abcdefGHIJKLM]，可以写成[1-6a-fG-M]。用连字符-来省略和简写。
 * [-az]或[az-]或[a\-z] 转义-
 */
// 范围表示方法
(() => {
    const regex = /a[a-z0-9]b/g;
    const string = 'a0b akb a88b a9b';
    console.log(string.match(regex));
})();

// 排除字符串 ^脱义  反的概念
(() => {
    const regex = /a[^k]/g;
    const string = 'a0b akb a89b a9b';
    console.log(string.match(regex));
})();

/**
 * 简写形式
 * \d [0-9]一位数字  digit数字
 * \D[^0-9]除数字以外任何数
 * \w[0-9a-zA-Z_]数字字母下划线 单字符  word
 * \W 非单字符
 * \s [ \t\v\n\r\f]空白字符
 * \S非空白字符
 * . [^\n\r\u2028\u2029]任意字符：通配符 除了换行符回车符行分段分符外
 * 任意字符：[\d\D]、[\w\W]、[\s\S]和[^]
 */
(() => {
    const regex = /a[^]b/g;
    const string = 'a0b akb a89b a9b';
    console.log(string.match(regex));
})();

/**
 * 量词简写形式
 * {m,}:至少出现m次
 * {m}： = {m, m}出现m次
 * ？：={0, 1}出现或者不出现
 * +： = {1,}至少出现一次
 * *: 任意次，或者不出现
 */
(() => {
    const regex = /a\w+b/g;
    const string = 'a0b akb a89b a9b';
    console.log(string.match(regex));
})();

/**
 * 贪婪匹配和惰性匹配
 */
// 贪婪匹配
(() => {
    const regex = /\d{2,5}/g;
    const string = "123 1234 12345 123456";
    console.log(string.match(regex));
    // => ["123", "1234", "12345", "12345"]
})();

// 惰性匹配 后面添加?就能惰性匹配
(() => {
    const regex = /\d{2,5}?/g;
    const string = "123 1234 12345 123456";
    console.log(string.match(regex));
    // => ["12", "12", "34", "12", "34", "12", "34", "56"]
})();

/**
 * 多选分支:惰性匹配，匹配到就不在查找
 */
(() => {
    const regex = /good|nice/g;
    const string = 'good idea, nice try';
    console.log(string.match(regex));

    const regex1 = /goodbye|good/g;
    const string1 = "goodbye";
    console.log( string1.match(regex1) );
})();

// ----------------案例：匹配16进制颜色
(() => {
    const regex = /#([0-9a-zA-Z]}{6}|[0-9a-zA-Z]{3})/g;
    const string = "#ffbbad #Fc01DF #FFF #ffE";
    console.log( string.match(regex) );
})();

// -----------匹配时间 ^字符串开始位置  $字符串结束位置
(() => {
    const regex = /^(0?[0-9]|1[0-9]|[2][0-3]):0?[0-9]|[1-5][0-9]$/;
    console.log( regex.test("23:59") );
    console.log( regex.test("02:07") );
    console.log( regex.test("2:7") );
    // => true
    // => true
})();

// ----匹配日期
(() => {
    const regex = /^[0-9]{4}-(0?[0-9]|1[0-2])-([0-2]?[0-9]|3[0-1])$/;
    console.log( regex.test("2010-1-01") );
})();

// ----- 匹配id
(() => {
    const regex = /id=".*?"/;
    const string = '<div id="container" class="main"></div>';
    console.log(string.match(regex)[0]);
})();

/**
 * 正则表达式匹配位置
 */
// ^和$ 匹配开头结尾
(() => {
    const result = 'hello'.replace(/^|$/g, '#'); // 单行匹配
    const resultLine = "I\nlove\njavascript".replace(/^|$/gm, '#'); // 多行匹配
    console.log(resultLine)
})();

// \b单词边界：具体就是\w和\W之间的位置，也包括\w和^之间的位置，也包括\w和$之间的位置。
// \B 非单词边界
(() => {
    const result = "[JS] Lesson_01.mp4".replace(/\b/g, '#');
    console.log(result);
})();

//  (?=p)和(?!p) (?=p)，其中p是一个子模式，即p前面的位置。(?!p):不是p前面的位置
(() => {
    const result = 'hello'.replace(/(?!l)/g, '#');
    console.log(result)
})();

// ------匹配数字千位分隔符
(() => {
    const result = '123123123'.replace(/(?!^)(?=(\d{3})+$)/g, ',');
    console.log(result)
})();
