db.createUser(
    {
        user: 'mahambig',
        pwd: 'supersecret',
        roles: {
            role: 'readWrite',
            db: 'pizza-servicess'
        }
    }
);