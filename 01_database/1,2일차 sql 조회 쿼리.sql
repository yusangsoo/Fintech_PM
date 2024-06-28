use titanic;

select * from passenger;
select * from passenger limit 10;

select * from p_info where age = 20;
select * from p_info where age >= 30;
select * from p_info where age < 20 and sex = 'male' or parch > 3
order by parch desc;

select * from p_info where age >= 20 and age < 50 and sex = 'female';
select * from p_info where sibsp & parch >= 1;
select * from t_info where pclass = 1;
select * from t_info where pclass = 2 or fare > 50;
select * from survived where survived = 1;

select * from p_info where name = 'braund';
select * from p_info where age in (20,21,22);
select * from p_info where name like 'Braund%';
select * from p_info where name like '%Laina';
select * from p_info where name like '%mrs%';
select * from p_info where name not like '%mrs%';
select * from p_info where sibsp in (0,1,2);
select * from p_info where sibsp not in (0,1,2);
select * from p_info where sibsp between 0 and 1;
select * from p_info where age is null;
select * from p_info where age is not null;

# 연습문제
select * from t_info where fare between 100 and 1000;
select * from t_info where ticket like 'pc%' and embarked = ('c' or 's');
select * from t_info where ticket like 'pc%' and embarked in ('c', 's');
select * from t_info where pclass in (1,2);
select * from t_info where cabin like '%59%' ;
select * from p_info
where age is not null
and name like ('%james%')
and age >= 40
and sex = 'male';

select *
from p_info
where age is not null
and name like '%miss%'
and age <= 40
and sex = 'female'
order by age desc;

select sex, avg(age)
from p_info
where age is not null
group by sex;

select sibsp, avg(age), min(age)
from p_info
where age is not null
group by sibsp
order by sibsp
;

select pclass, avg(fare)
from t_info
group by pclass
having avg(fare) > 50;

select * from passenger;
select * from ticket;

select *
from passenger as pa
inner join ticket as ti
on pa.passengerid = ti.passengerid;

select *
from passenger as p
left join ticket as t
on p.passengerid = t.passengerid;

select *
from passenger as p
right join ticket as t
on p.passengerid = t.passengerid;

select *
from passenger as p
left join ticket as t
on p.passengerid = t.passengerid
union
select *
from passenger as p
right join ticket as t
on p.passengerid = t.passengerid;
;

# 1번
select p.name, p.age, p.sex, t.pclass, s.survived
from passenger as p
inner join ticket as t
on p.passengerid = t.passengerid
inner join survived as s
on p.passengerid = s.passengerid
where s.survived = 1;

# 2번
select p.name, p.age, p.sex, t.pclass, s.survived
from passenger as p
inner join ticket as t
on p.passengerid = t.passengerid
inner join survived as s
on p.passengerid = s.passengerid
where s.survived = 1
limit 10;

# 3번
select p.name, p.sex, t.pclass
from passenger as p
left join ticket as t
on p.passengerid = t.passengerid
left join survived as s
on p.passengerid = s.passengerid
where s.survived = 1
and p.sex = 'female'
and t.pclass = 1;

# 4번
select p.name, p.sex
from passenger as p
left join ticket as t
on p.passengerid = t.passengerid
left join survived as s
on p.passengerid = s.passengerid
where survived = 1
and age between 10 and 20
and pclass = 2;

# 5번
select p.name, p.sex, t.pclass
from passenger as p
left join ticket as t
on p.passengerid = t.passengerid
left join survived as s
on p.passengerid = s.passengerid
where (sex = 'female' or pclass = 1)
and survived = 1;


# 6번
select p.name, p.sex, t.pclass, parch, survived
from passenger as p
left join ticket as t
on p.passengerid = t.passengerid
left join survived as s
on p.passengerid = s.passengerid
where survived = 1
and name like '%mrs%';

# 7번
select name, sex, age
from passenger as p
left join ticket as t
on p.passengerid = t.passengerid
left join survived as s
on p.passengerid = s.passengerid
where pclass in (1,2)
and embarked in ('s', 'c')
and survived = 1;

# 8번
#이름에 James가 들어간 사람중 생존자를 찾아 이름, 성별, 나이 를 표시하고 나이를 기준으로 내림차순 정렬하시오.
select name, sex, age
from passenger as p
left join ticket as t
on p.passengerid = t.passengerid
left join survived as s
on p.passengerid = s.passengerid
where name like '%james%'
and survived = 1
order by age desc;

# 9번
select sex, count(survived) as total
from passenger as p
inner join ticket as t
on p.passengerid = t.passengerid
inner join survived as s
on p.passengerid = s.passengerid
where survived = 1
group by sex;

# 10번
select sex, count(survived) as total, round(avg(age),1)
from passenger as p
inner join ticket as t
on p.passengerid = t.passengerid
inner join survived as s
on p.passengerid = s.passengerid
where survived = 1
group by sex;















## 조인한 테이블을 from으로 사용
select *
from (select p.passengerid, p.name, p.age, t.pclass
from passenger as p
left join ticket as t
on p.passengerid = t.passengerid) laid
where age >= 19;

