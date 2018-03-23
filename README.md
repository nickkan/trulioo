Collaborative Comic
======

## Starting the server
To start the server, simply get python to start the run.py script:
```
python run.py
```

## TypeScript Files
If you want the server to transpile new .ts files on server start, you will need to add the path to the file in tsconfig.json under "files". "filesGlob" is unique to the atom-typescript plugin for Atom. It supports multiple files and when you open/refresh the tsconfig.json in an Atom editor, it will automatically include any new .ts files it catches. For all other editors, manual additon to "files" is required.

App is currently deployed at:
https://still-bastion-81900.herokuapp.com/
