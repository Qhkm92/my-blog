# Golang - Pointer
Golang is a very easy to learn language but there are some things might be hard for developers who are coming from high level languange like javascript like me to comprehend. And one of that is the use of **pointer**. 

## Pointer
Pointer in go refers to the memory address

```go
package main

import “fmt”

// Person は人間を表す構造体。
type Person struct {
    Name string
    Age  int
}

func main() {
    // ポインタ型の変数を宣言する
    // pがポインタ型変数
	  // p is a variable with type pointer 
    // *Personポインタ型
    // *Person type pointer
    var p *Person

    p = &Person{
        Name: “太郎”,
        Age:  20,
    }
    fmt.Printf(“p :%+v\n”, p)
    fmt.Printf(“変数pに格納されているアドレス :%p”, p)
}

```

So if we refer to the example above, first we declare the variable p with type *Person type pointer `var p *Person` 

int型のポインター変数
`var pointer *int`

String型のポインター変数
`var pointer *string`

Person型のポインター変数
`var pointer *Person`

Variable 
Pointer variable

```c
//declare var a 
int a 
a = 3

//declare pointer variable p
int *p

//we insert into variable p with the adress of var a
p = &a

//Print out all the values
printf("%d\n", a) // 3
printf("%d\n", p) // address of a
printf("%d\n", *p) // 3

a = 5

printf("%d\n", *p) // 5 

```

So when we say its a pointer to an integer, it means that it points to a variable that is of type integer. Omg how easy it is after that aha moments. 

#golang
[The Go Playground](https://play.golang.org/p/3DlDydJtRLD)