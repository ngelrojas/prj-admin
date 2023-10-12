## delete all data related in console sql
#### run in console sql
```
SET FOREIGN_KEY_CHECKS  = 0;

truncate table permission;
truncate table role;

SET FOREIGN_KEY_CHECKS = 1;
```

### pakage faker
- npm i faker
- npm i -D @types/faker
- npm install --save-dev @faker-js/faker
- https://www.npmjs.com/package/@faker-js/faker

### multer
- npm i multer
- npm i -D @types/multer

### json2csv
- npm i json2csv
- npm i -D @types/json2csv