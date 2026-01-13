## Stack

### Frontend
- Typescript
- Vite
- React
- Mantine
- React Query
- Ky
- Vitest
- React Testing Library
- MSW

### Backend
- Kotlin
- Spring Boot

### Database (Postgres)
### `restaurants`
- `id` (UUID, PK)
- `name` (VARCHAR)
- `created_at` (TIMESTAMP)

### `users`
- `id` (UUID, PK)
- `restaurant_id` (UUID, FK -> restaurants.id)
- `email` (VARCHAR, UNIQUE)
- `password_hash` (VARCHAR)
- `created_at` (TIMESTAMP)

### `recipes`
- `id` (UUID, PK)
- `restaurant_id` (UUID, FK -> restaurants.id)
- `name` (VARCHAR)
- `instructions` (TEXT)
- `yield_amount` (DECIMAL)
- `yield_unit` (VARCHAR)
- `ingredients` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)


## Design

Since it may have users from different restaurants, I added a restaurant table that both the users and recipes tables would have a foreign key to. The idea would be to implement row level security on the backend to make sure users from a certain restaurant would only be able to get recipes for that restaurant. (Did not implement, would have taken too long).

For recipes themselves, I originally planned on have ingredients as a separate entity that would either have its own table and have a many-to-many relationship or have them in a jsonb column as an array of ingredient objects. In the end both seemed too difficult and time consuming to do for this so I just went with a TEXT field instead. Also with only needing to design for up to 10,000 requests per day and only needing to save ~1000 recipes it seemed like the simplest best choice. Instructions followed the same model.

Since the non-functional requirements are so low I could have realistically chosen any stack. I chose the last stack I used since it was the one I was most familiar with.

## Run

Frontend:
```bash
pnpm dev
```

Backend:

Will start a Postgres container with the database.
```bash
./gradlew bootRun
```