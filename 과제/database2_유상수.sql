create database world_2;
use world_2;

create table exchange_rate (
	code2 varchar(100) primary key not null unique,
    country_name varchar(100),
    currency_name varchar(100),
    exchange_rate decimal(15,2),
    cash_buying decimal(15,2),
    cash_selling decimal(15,2),
    remit_sending decimal(15,2),
    remit_receiving decimal(15,2),
    usd_conv_rate decimal(7,3),
    date datetime not null
);

insert into exchange_rate values
	('USA', '미국', 'USD', 1377.00, 1401.09, 1352.91, 1390.40, 1363.60, 1, '2024-07-13'),
    ('EU', '유럽연합', 'EUR', 1501.55, 1531.43, 1471.67, 1516.56, 1486.54, 1.091, '2024-07-13'),
    ('JPN', '일본', 'JPY (100엔)', 872.07, 887.33, 856.81, 880.61, 863.53, 0.6333, '2024-07-13'),
    ('CHN', '중국', 'CNY', 189.37, 198.83, 179.91, 191.26, 187.48, 0.138, '2024-07-13'),
    ('GBR', '영국', 'GBP', 1788.10, 1823.32, 1752.88, 1805.98, 1770.22, 1.299, '2024-07-13');
    
select * from exchange_rate;
	