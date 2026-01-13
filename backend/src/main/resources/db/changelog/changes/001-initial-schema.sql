-- liquibase formatted sql

-- changeset seanhammack:1
CREATE
EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE restaurants
(
    id         UUID PRIMARY KEY         DEFAULT uuid_generate_v4(),
    name       VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users
(
    id            UUID PRIMARY KEY         DEFAULT uuid_generate_v4(),
    restaurant_id UUID                NOT NULL REFERENCES restaurants (id) ON DELETE CASCADE,
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255)        NOT NULL,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipes
(
    id            UUID PRIMARY KEY         DEFAULT uuid_generate_v4(),
    restaurant_id UUID           NOT NULL REFERENCES restaurants (id) ON DELETE CASCADE,
    name         VARCHAR(255)   NOT NULL,
    instructions  TEXT           NOT NULL,
    yield_amount  DECIMAL(10, 2) NOT NULL,
    yield_unit    VARCHAR(50)    NOT NULL,
    ingredients   TEXT           NOT NULL,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_recipes_restaurant ON recipes (restaurant_id);