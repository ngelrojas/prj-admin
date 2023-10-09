## delete all data related in console sql
#### run in console sql
```
SET FOREIGN_KEY_CHECKS  = 0;

truncate table permission;
truncate table role;

SET FOREIGN_KEY_CHECKS = 1;
```