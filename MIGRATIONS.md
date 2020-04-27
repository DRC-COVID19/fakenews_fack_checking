## Create a migration configuraiton file

In the root directory of the project, create a migration.json containing the following information. Replace the placeholders `<value>` by the appropriate information.

```
{
  "dbConnectionUri": "mongodb://<hostname>:<password>@<hostname>:<port>/<databasename>",
  "migrationsDir": "db/migrations"
}

```

## Create Migrations

```
mkdir db/migrations
node_modules/.bin/migrate create [MIGRATION_NAME] --config [MIGRATION_CONFIG_JSON_FILE]
```

## List Migrations

```
node_modules/.bin/migrate list --config [MIGRATION_CONFIG_JSON_FILE]
```

## Run Migrations

```
node_modules/.bin/migrate up [MIGRATION_NAME] --config [MIGRATION_CONFIG_JSON_FILE]
```

e.g.

```
yarn build && node_modules/.bin/migrate up schema_change --config migration.dev.json
```
