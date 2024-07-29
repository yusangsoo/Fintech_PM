use world;

show tables;

desc city;
desc country;
desc countrylanguage;

select id, name
from city;
    
select *
from city
where countrycode = 'kor'
	and district like 'k%';
    
select *
from city
where countrycode = 'kor'
	and district like '%k';
    
select *
from city
where countrycode = 'kor'
	and district like '%ong%';
    
select *
from city
where countrycode = 'kor'
	and district in ('seoul', 'kyonggi');
    
select name
from country
where population > 100000000;

select name, population
from country
where name = 'south korea';

select name, population
from country
where population >= 45000000 and population <= 55000000; #between으로도 가능

use mywork;
desc box_office ;

select *
from box_office
where release_date between '2018-01-01' and '2018-12-31'
and countries = '한국'
;

select *
from box_office
where release_date
between '2019-01-01' and '2019-12-31'
and audience_num >= 10000000;

use world;
select *
from country
where population > 100000000
order by population desc;

# 정렬 기준이 2개 이상인 경우
# 인구 5천만 이상 나라를 찾아 대륙, 지역을 기준으로 오름차순 정렬
select *
from country
where population >= 50000000
order by continent desc, region;

desc country;

select concat_ws(' : ', 'this', 'is', 'my sql');

select cast(25.2 as float);

use world;

select code, concat(name,' (',continent, ')') as 이름, region, population
from country
where population
between 45000000 and 50000000
;











