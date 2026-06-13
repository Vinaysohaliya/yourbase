-- GoTrue requires the `auth` schema to exist before it runs migrations
CREATE SCHEMA IF NOT EXISTS auth;

-- Grant privileges to postgres user
GRANT ALL PRIVILEGES ON SCHEMA auth TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA auth TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA auth TO postgres;
