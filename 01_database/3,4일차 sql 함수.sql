# sql 함수

# 절댓값 abs()
select abs(1), abs(-10);

# 문자열의 길이 length()
select length('1asfsaaf');

# 반올림 round()
# 소수점 n번째 자리까지 보여줌.
select round(1.51424, 1);

# 숫자형 함수
# +, -, *, /, %(나머지) = mod, div(몫), ceil(올림), floor(내림)

select 7 % 4, 7 div 4;
select 7 mod 2, 7/2;
select ceil(4.5), floor(4.5);

# 제곱(숫자, 제곱 수)
select power(4,3);

# 루트
select sqrt(3);

# 음수양수 확인, 양수면 1을, 음수면 -1을 반환
select sign(-5);

# 버림 truncate(숫자, 소수점 자릿수) -> 숫자를 소수점 자릿수만 보여주고 나머지 버려라
select truncate(2.421, 2);

# 문자 길이
select char_length('홍길동'), length('홍길동'), char_length('홍길동'), length('홍길동');
# 한글 영문 상관없이 문자 길이 수를 알고 싶을 땐 char_length() 함수 쓰기
# length는 바이트 기준임

#문자 연결함수 concat(), concat_ws()
select concat(null, 'is', 'sql'); # 공백없이 문자를 합침 그러나 null이 하나라도 있으면 반환값은 null이 됨
select concat_ws(' : ', 'this', 'is' 'my sql');

# 대소문자 변환
select upper('ABcd');
select lower('ABcd');

# 공백 채우기 함수
# lpad('sql', 7, '#')
# rpad

# 공백을 없애는 함수
select ltrim('  swd  ');
select rtrim('  swd  ');

select left('this is my sql', 3);

# 문자열의 중간에서 잘라내는 함수 substr (문자열, 시작위치, 길이)
select substr('this is sql', 6, 2);

select trim(leading '*' from '***mysql***');

# 날짜형 함수
select curdate(); # 현재 년월일
select curtime(); # 현재 시간
select now(); # 현재 년월일 + 시간
select current_timestamp(); # 현재 년월일 + 시간

select dayname(); #요일 표시
select dayofweek(); #요일을 숫자로 / 일요일이 1번
select dayofyear(); #1년 중 해당 일이 며칠인지
select last_day(); #현재 달의 마지막 날이 며칠인지
select year(); #연도 추출
select month(); #월 추출
select quarter(); #분기 추출
select weekofyear(); #1년 중 해당 일이 몇 주차인지
select date(); #일자 추출
select time(); #시간 추출
select date_add(); #날짜 더하기 (날짜, interval n day) day 자리에 week, month 등 다른 것도 사용 가능. n에 음수 가능
select adddate(); #일수 더하기 (날짜, n) n에 음수 가능
select subdate(); #날짜 빼기 (날짜, interval n day) day 자리에 week, month 등 다른 것도 사용 가능. n에 음수 가능
select subdate(); #일수 빼기 (날짜, n) n에 음수 가능
select extract(a from b); #a 자리에 year_month, day_hour, minute_second만 됨
select datediff(a,b); #a에서 b를 빼는 함수
select date_format(a,b); #a를 b형식에 맞게 반환하는 함수
select 
select
select
select