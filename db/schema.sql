drop database if exists burger_db;
create database burger_db;

USE burger_db;

create table burgers(
	id int(5) auto_increment not null,
    name varchar(100) not null,
    devoured boolean not null default false,
    primary key(id)
);


select * from burgers;