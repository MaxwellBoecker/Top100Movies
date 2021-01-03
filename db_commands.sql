
create table movies (
  id serial primary key,
  title varchar(100),
  poster_path varchar(50),
  backdrop_path varchar(50),
  original_language varchar(25),
  overview varchar(1000)
  );

create table users (
  id serial primary key,
  google_id varchar(50),
  name varchar(50),
  email varchar(100)
);

create table user_movie (
  user_id int,
  movie_id int,
  foreign key (user_id) references users(id),
  foreign key (movie_id) references movies(id),
  primary key (user_id, movie_id)
  );

