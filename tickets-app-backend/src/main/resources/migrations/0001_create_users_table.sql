create table users
(
    id         serial primary key,
    username   varchar(255) not null unique,
    password   varchar(255) not null,
    first_name varchar(255) not null,
    last_name  varchar(255) not null
);
