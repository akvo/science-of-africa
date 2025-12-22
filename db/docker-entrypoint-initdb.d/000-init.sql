CREATE USER akvo WITH PASSWORD 'password';

CREATE DATABASE science_of_africa
WITH OWNER = akvo
     template = template0
     ENCODING = 'UTF-8'
     LC_COLLATE = 'en_US.UTF-8'
     LC_CTYPE = 'en_US.UTF-8';

\c science_of_africa

CREATE EXTENSION IF NOT EXISTS ltree WITH SCHEMA public;
