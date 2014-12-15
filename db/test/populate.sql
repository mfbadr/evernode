insert into users (username, password, avatar, token) values ('b', 'b', 'a.png', 'token');
insert into users (username, password, avatar, token) values ('c', 'b', 'a.png', 'token');
insert into users (username, password, avatar, token) values ('d', 'b', 'a.png', 'token');

delete from users;

insert into users (id, username, password, avatar, token) values (1, 'bob', '$2a$08$3oM4O.GL9TGXSqDFoq3ww.62O.tydqdpbBHnuf7xQYwhGGOo9sdzG', 'a.png', 'token');

insert into notes (title, body, user_id) values ('note1', 'note1body', 1);
insert into notes (title, body, user_id) values ('note2', 'note2body', 1);
delete from notes;
insert into notes (id, title, body, user_id) values (1, 'note3', 'note3body', 1);
