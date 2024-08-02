# CRUD-NEM-TS
Crud using TypeScript...

## Install TypeScript locally or globally. - use TS docs - https://www.typescriptlang.org/download/
## npm i for installing node modules.
## npx tsc for build or dist.
## node build/server.js for running application.

// Import Mongoose: We import the mongoose library using the import syntax.
// Interface Definition: We define a TypeScript interface TaskInterface to represent the shape of our document. This provides type safety and better code completion.

// Generic Type for Schema: The mongoose.Schema constructor now uses the generic type TaskInterface to specify the shape of the documents.
// Generic Type for Model: The mongoose.model function also uses the generic type TaskInterface to specify the type of the returned model.
// Export: We export the Task model for use in other parts of your application.
