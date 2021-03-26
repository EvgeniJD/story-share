# project-final-vue

## Project description:
```
"Story Share" is a place to create unique, amazing stories together with other creative people. Just start writing your story and if you find it difficult, there is always a friend who will offer you a solution to continue your story. You can also help by offering solutions or you can just read all the other stories.

  Unathenticated users can reach only '/about', '/user/register', '/user/login' 
Authentication: email, password. 
  Authenticated users can:
    *view all stories, created from other authenticated users;
    *view details of every story; like and unlike the story; 
    *add a proposal for redacting the story. If your proposal is approved by the initiator of the current story, your proposal going to merge to the story content with prefix("Beginning {your email}") and postfix("End {your email}") and your email is going to add to the 'Contributors' table;
    *create their own stories; 
    *edit or delete them;
    *merge other user`s proposal or delete it; 

Hosting: https://story-share-4e313.web.app/
  
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
