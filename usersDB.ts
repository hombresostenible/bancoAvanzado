interface user {
    id: string;
    userName:string;
    password: string;
    email: string;
    role: string;

  }
  
  const usersDB: user[] =
[
    {
        id: "808080808",
        userName: "pepito1",
        password: "pepito8989",
        email: "pepito@mail.com",
        role: "Manager",
        },
         {
        id: "909090909",
        userName: "Jose1",
        password: "Jose67676",
        email: "jose@mail.com",
        role: "Manager",
            },
            {
                id: "909090909",
                userName: "Pedro2",
                password: "Peter222",
                email: "peter@mail.com",
                role: "CEO",
            }
]
        export { usersDB, user };