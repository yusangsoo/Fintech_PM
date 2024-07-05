


// 주석은 앞에 '/'를 2개 입력하거나 여러 줄을 하고 싶을 땐 '/* */'으로 활용

/*
변수 : 자료를 넣는 상자. 1개만 담을 수 있음. 나중에 담은 것으로 대체 가능
사용법
var 변수명 -> 얘는 요즘 안씀
let 변수명 -> 자료를 업데이트할 수 있음
const 변수명 -> 처음 선언할 때만 자료를 넣을 수 있고 업데이트가 안됨

변수 명명법
카멜 표기법 -> myName, finalResult
*/

// let은 같은 이름의 변수를 생성할 수 없음
let num; //num이라는 변수 생성
num = 10; //10이라는 값 넣음

let num2 = 20; //선언과 동시에 할당가능

console.log(num);
document.write(num);

// const는 상수형 변수, 같은 이름의 변수 생성 불가, 선언 후 할당 불가
// const num3; 선언만 했기 때문에 오류
const num3 = 30;
document.write(num3);

let num4 = 50;
const num5 = 100;
let result = num4 + num5;
document.write(result);

/*
자료형
숫자형, 문자형, 논리형, 배열(array[숫자, 문자, 함수, 객체리터럴 등이 들어감]), 객체 리터럴
*/

// 숫자형
num = 10;
num2 = 3.14;
num4 = 3;
console.log(num * num2); // 실수
console.log(num / num2); // 실수
console.log(num / num4); // 실수
// 결과가 정수면 정수형임

// 문자형
let string1 = "hello";
let string2 = "javascript";
console.log(string1+string2); // 문자 + 문자는 띄어쓰기 없이 연결
console.log(string1,string2);

// 탈출 문자 = escape
console.log(string1+"\t"+string2); // '\t'는 탭 역할
console.log(string1+"\n"+string2); // '\n'는 줄 바꿈 역할
console.log(string1+"\'"+string2+"\'"); // '\''는 따옴표 역할

// 템플릿 문자열 (백틱 사용 ``)
let string3 = `템플릿 문자열은 따옴표가 아닌 백틱(\`)으로 문자열을 만듦.`
console.log(string3);
let string4 = `쓰는 이유는 \$\{\}을 이용해 변수의 내용을 바로 출력 가능 ${num}`;
console.log(string4);
console.log(`num + num2 = ${num+num2}`);

// 배열 array -> 여러 개의 자료가 나열되어 있는 형태의 자료형
// [] 대괄호 안에 여러 개의 다른 데이터 형태의 자료도 넣을 수 있음
// 순서가 있는 자료형으로 인덱싱, 슬라이싱이 가능
// 인덱싱, 슬라이싱의 경우 순서가 0번부터 시작

let studentScore = [80,70,90,60];
console.log(studentScore[1]);

let arrayValues = [80,3.4,"배열",[1, '신기해', {배열 : 'array'}]];
console.log(arrayValues);
console.log(arrayValues[3][1]);

// 객체 리터럴 json
// 형태 -> {key : value}
// key를 호출하면 value가 나옴
let addressList = {name : '홍길동', school : '서초', age : 14};
console.log(addressList);
let addressList2 = {
    name : ['홍길동', '둘리','오마이걸'],
    school : ['서초', '강남', '망원'],
    age : [14,15,16]
};
console.log(addressList2['name'][1]);
console.log(addressList2.name[1]);

// 형변환 : 자료형을 바꿈
const numChar = 10 + "10";
console.log(numChar);
// js에서는 숫자와 문자 연산을 할 경우 문자로 변환

let strNum = "10";
num = 10;

if (num==strNum) {
    console.log("같음");
}
// 비교할 때에도 자동으로 변환 -> strNum이 숫자형태라 가능
if (num===strNum) {
    console.log("같음");
}else{
    console.log("다름");
}
// =이 3개면 자료형까지 비교

/*
number() -> 문자를 숫자로 변환
string() -> 숫자를 문자로 변환
*/
if (num==Number(strNum)) {
    console.log("같음");
}else{
    console.log("다름");
}

/* 연산자
+
-
*
/
% -> 나머지
** -> 제곱

단항 산술 연산자
++ -> 1씩 증가
++a 는 a를 먼저 1증가 후 +연산
a++는 먼저 연산 후 1증가시켜 내보냄
-- -> 1씩 감소
후치연산
전치연산
*/
let a = 1;
let b = 1;
console.log("a+b = ", a+b);
console.log("a++ + b++ = ", a,b,a++ + b++);
console.log("++a + b++ = ", a,b,++a + b++);

// 논리 연산자
// && -> and연산
// || -> or연산
//삼항 연산자
let score = 89;
let grade = score >= 90? 'A+' : 'B';
console.log(grade)

/* 조건문 if else, else if
if (조건) {
    참일 때 실행문
}else {
    거짓일 때 실행문
}
*/

num = 10;
if (num % 2 ===0) {
    console.log("숫자는 짝수")
}else{
    console.log("숫자는 홀수")
}

num = 9;
if (num % 2 ===0) {
    console.log("숫자는 짝수")
} else if (num % 2 ===1) {
    console.log("숫자는 홀수")
}else{
    console.log("잘못된 숫자")
}

/* 반복문 for, for.. in
형태 -> for(let i = 0; i < 5; i++) {
    반복시킬 문장
}
*/

for (let i = 0; i < 5 ; i++) {
    console.log(studentScore[i]);
}

// 중첩 반복도 가능
for (let i = 0; i <= 12; i++) {
    for (let j = 0; j <= 59; j++) {
        console.log(`${i}시 ${j}분`);
    }
}

// for ... in 반복문
for (let index in studentScore) {
    console.log(studentScore[index]);
}
for (let key in addressList) {
    console.log(addressList[key]);
}

for (let key in addressList2) {
    for (let index in addressList2[key]) {
        console.log(addressList2[key][index]);
    }
}

for (let key in addressList2) {
    for (let i = 0; i < 3; i++) {
        console.log(key, addressList2[key][i]);
    }
}

/*
break : 특정 조건이 충족되면 반복을 중단시키기 위해 사용
continue : 특정 조건이 충족되면 건너뛰게 하기 위해 사용
*/
for (i = 0; i <= 100; i++) {
    console.log(i)
    if (i == 10) {
        break;
    }
}

// 1부터 100까지 홀수만 출력
for (i = 1; i<=100; i++) {
    if (i %2 == 1) {
        console.log(i);
    }else {
        continue;
    }
}

/*
함수
형태
function 함수명(인자값) {
    실행할 코드
    return 값
}

실행방법
함수명(값)
*/

// 구구단 만들기
function gugudan(num) {
    for(let i = 1; i <= 9; i++) {
        console.log(`${num}*${i} = ${num*i}`);
    }
}

gugudan(5);

/*
const 변수명 = function 함수명() {
    실행할 코드
}
*/

const fn = function gugudan(num) {
                for(let i = 1; i <= 9; i++) {
                    console.log(`${num}*${i} = ${num*i}`);
                }
            }

fn(2);

const calcSum = (num, num2) => {
    result = num + num2;
    return result;
}

console.log(calcSum(2,40));

// 두개의 숫자를 입력해서 그 사이에 있는 숫자 중 홀수인 수만 출력
function odd(num1, num2) {
    if (num1 > num2) {
        for (let i = num2; i <= num1; i++) {
            if (i % 2 == 1) {
                console.log(i);
            }
        }
    }else if (num1 < num2) {
        for (let i = num1; i <= num2; i++) {
            if (i % 2 == 1) {
                console.log(i);
            }
        }
    }else {
        console.log("숫자가 같으면 안됩니다")
    }
}

odd(19,19);

// 두개의 숫자를 입력해서 그 사이에 있는 숫자 중 홀수인 수만 출력하고 리턴
const hol = (num1, num2) => {
    let arr = []
    for(num1; num1 <= num2; num1++) {
        if(num1 % 2 === 1) {
            console.log(num1);
            arr.push(num1);
        }
    }
    return arr;
}

let holResult = hol(1,10)
console.log(holResult);

// 브라우저 객체 모델 사용
// 챗 gpt에 물어봤는데 크롤링엔 도움이 되지 않음
// 단지 이것들로 html을 조작하거나 정보를 얻거나 하는 등의 역할을 하기 때문에
// 짚고 넘어가는 듯함.

function popup() {
    window.open('popup.html', '팝업', 'width = 200', 'height = 100')
}

const el = document.querySelector(".box-1");
console.log(el)