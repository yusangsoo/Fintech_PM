## world 데이터베이스가 있어서 world_1로 만들었습니다.
create database World_1;
use World_1;

create table country_1 (
	Code varchar(100) primary key not null unique,
    Code2 varchar(100) not null,
    name varchar(100) not null,
    continent varchar(100) not null,
    surfacearea int null,
    population int null,
    lifeExpectancy float null,
    gnp int null
);

insert into country_1 (Code, Code2, name, continent, surfacearea, population, lifeExpectancy, gnp) values
	('CHN', 'CHN', '중국', 'Asia', 9572900, 1277558000, 71.4, 982268),
    ('DEU', 'EU', '독일', 'Europe', 357022, 82164700, 77.4, 2133367),
    ('GBR', 'GBR', '영국', 'Europe', 242900, 59623400, 77.7, 1378330),
    ('JPN', 'JPN', '일본', 'Asia', 377829, 126714000, 80.7, 3787042),
    ('USA', 'USA', '미국', 'North America', 9363520, 278357000, 77.1, 8510700);
    
select * from country_1;