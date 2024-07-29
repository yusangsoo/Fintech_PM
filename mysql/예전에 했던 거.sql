use mywork;

create table emp_test (
	emp_no 		int			 not null,
    emp_name 	varchar(30)	 not null,
    hire_date 	date null,
    salry 		int	 null,
    primary key(emp_no)
    );
    
desc emp_test;

insert into emp_test
value 
(1005, '퀴리', '2021-03-01', 4000),
(1006, '호킹', '2021-03-05', 5000),
(1007, '패러데이', '2021-04-01', 2200),
(1008, '맥스웰', '2021-04-05', 3300),
(1009, '플랑크', '2021-04-05', 4400)
;

select *
from emp_test;

insert into emp_test
(emp_no, emp_name, hire_date)
value (
1003, '갈릴레오', '2021-03-01'
);

# 업데이트 문
#update 테이블
#set
#컬럼 1 = 값,
#컬럼2 = 값
#where 찾을 값

update emp_test
set
salary = 50
where emp_no = 1003
;

### 오토커밋 옵션 활성화 확인 방법
select @@autocommit;

### 오토커밋 설정
set autocommit = 1;


create table emp_tran1 as select * from emp_test;
create table emp_tran2 as select * from emp_test;

select * from emp_tran1;
alter table emp_tran1 add constraint primary key(emp_no);
alter table emp_tran2 add constraint primary key(emp_no);

desc emp_tran2;
delete from emp_tran1;
rollback;

create schema naver_db;
use naver_db;

create table member (
mem_id char(8) primary key,
mem_name varchar(10) not null,
mem_number tinyint not null,
addr char(2) not null,
phone1 char(3),
phone2 char(8),
height tinyint unsigned,
debut_date date
);

desc member;

create table buy (
num int primary key auto_increment,
mem_id char(8) not null,
prod_name char(6) not null,
group_name char(4),
price int unsigned not null,
amount smallint unsigned not null,
foreign key (mem_id) references member(mem_id)
);

desc buy;

insert into `member` values
('TWC', '트와이스', 9, '서울', '02', '11111111', 167, '2015-10-19'),
('BLK', '블랙핑크', 4, '경남', '055', '22222222', 163, '2016-08-08'),
('WMN', '여자친구', 6, '경기', '031', '33333333', 166, '2015-01-15'),
('OMY', '오마이걸', 7, '서울', NULL, NULL, 160, '2015-04-21'),
('GRL', '소녀시대', 8, '서울', '02', '44444444', 168, '2007-08-02'),
('ITZ', '잇지', 5, '경남', NULL, NULL, 167, '2019-02-12'),
('RED', '레드벨벳', 4, '경북', '054', '55555555', 161, '2014-08-01'),
('APN', '에이핑크', 6, '경기', '031', '77777777', 164, '2011-02-10'),
('SPC', '우주소녀', 13, '서울', '02', '88888888', 162, '2016-02-25'),
('MMU', '마마무', 4, '전남', '061', '99999999', 165, '2014-06-19')
;

insert into `buy` (mem_id, prod_name, group_name, price, amount) values 
('BLK', '지갑', NULL, 30, 2),
('BLK', '맥북프로', '디지털', 1000, 1),
('APN', '아이폰', '디지털', 200, 1),
('MMU', '아이폰', '디지털', 200, 5),
('BLK', '청바지', '패션', 50, 3),
('MMU', '에어팟', '디지털', 80, 10),
('GRL', '혼공SQL', '서적', 15, 5),
('APN', '혼공SQL', '서적', 15, 2),
('APN', '청바지', '패션', 50, 1),
('MMU', '지갑', NULL, 30, 1),
('APN', '혼공SQL', '서적', 15, 1),
('MMU', '지갑', NULL, 30, 4)
;
select * from buy;

select *
from member as m
inner join buy as b
on m.mem_id = b.mem_id;

select *
from member as m
left join buy as b
on m.mem_id = b.mem_id;

select *
from member as m
right join buy as b
on m.mem_id = b.mem_id;
SELECT * FROM naver_db.member;
# 이름이 에이핑크인 회원의 평균키보다 큰 회원을 조회하기

select *
from member
where height >
(select height
from member
where mem_name = '에이핑크')
;



