# 데이터베이스 생성
create schema mywork;
create database test__db;
# 데이터베이스 삭제
drop database test_db;

use mywork;

# sql을 사용해 테이블 만들기
create table highschool_students
(
	student_no	varchar(20),
	student_name	varchar(100),
	grade	tinyint,
	class	varchar(50),
	gender	varchar(20),
	age		smallint,
	enter_date	date
);

# 생성한 테이블의 구조를 출력하는 describe, desc
describe highschool_students;
desc highschool_students;

# 제약조건을 넣어서 만드려면 null, not null을 넣어줌
create table highschool_students2
(
	student_no varchar(20) not null,
    student_name varchar(100) not null,
    grade tinyint null,
    class varchar(50) null,
    gender varchar(20) null,
    age smallint null,
    enter_date date null
);

# 기본키를 포함해서 만들기
# 기본키는 = primary key

# 기본키 삭제하기 alter 사용
# alter는 만들어진 데이터베이스나 테이블을 수정할 때 사용하는 명령어
alter table highschool_students drop primary key;

select count(*)
from box_office;

select count(*)
from departments;

select count(*)
from dept_emp;

select count(*)
from dept_manager;

select count(*)
from employees;

select count(*)
from salaries;

select count(*)
from titles;
