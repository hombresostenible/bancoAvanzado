interface expenses {
    supplierId: string;
    date: string;
    expenseAmount: number;
    expenseType: string;
  }
  
  const expensesDB: expenses[] =
[

    {
        supplierId: "898989723",
        date: "03/05/23",
        expenseAmount: 34000000,
        expenseType: "admin",
        },
        {
        supplierId: "9090909090",
        date: "03/05/23",
        expenseAmount: 34000000,
        expenseType: "marketing",
        },
        {
        supplierId: "7070707070",
        date: "03/05/23",
        expenseAmount: 34000000,
        expenseType: "logistics",
        },
        {
        supplierId: "808080808",
        date: "03/05/23",
        expenseAmount: 34000000,
        expenseType: "logistics",
        },
        {
        supplierId: "808080808",
        date: "03/05/23",
        expenseAmount: 34000000,
        expenseType: "productdevelopment",
        }
]
export { expensesDB, expenses };