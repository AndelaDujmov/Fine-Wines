# Fine-Wines
Web application for customer-selected craft wine sales built using MERN stack

## SERVER SIDE

### How to run the server?

```bash
    npm run dev
```

### Seeder 

To install the seeder run the command:

```bash
    npm install -g mongoose-data-seed

    # Create seeders folder, generate md-seed-config.js and update your package.json
    npx md-seed init 

    # Generate seeder file
    md-seed g admin

    # Run all seeders
    md-seed run
```