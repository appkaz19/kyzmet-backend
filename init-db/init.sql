-- Явно создаём пользователя
DO
$$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles WHERE rolname = 'naimi'
   ) THEN
      CREATE ROLE naimi WITH LOGIN PASSWORD 'naimi' CREATEDB;
   END IF;
END
$$;

-- Создаём базы, если не существуют
CREATE DATABASE naimi OWNER naimi;
CREATE DATABASE naimi_shadow OWNER naimi;
