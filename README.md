# NEWS
In ___question interface, the title state become be not necessary.  
```
title:string -> title?:string
```
I will delete this state step by step.  
Plese don't use title state.
# hobby-enquete-component
## how to install
npm i @yuukiiwai/hobby-enquete-component

## where is package
https://www.npmjs.com/package/@yuukiiwai/hobby-enquete-component

## where is github
https://github.com/yuukiiwai/hobby-enquete-component

## css class name
* ___qtitle ... for title css
* ___qhead ... for question sentence css
* ___selectul ... for choices ul css
* ___selectli ... for choices li css

## Data type
### Define  
```
export interface enqprops {
    q:Array<___question>,
    getRest:(num:number)=>any,
    getAns:(value:string)=>any,
    debug?:boolean,
}

interface ___question {
    parent:Array<string>,
    title?:string,
    question:string,
    answers:Array<___answer>
}

interface ___answer {
    ansid:string,
    anstext:string,
    ansvalue:string
}
```

### Example
```
[
    {
        "parent":[""],
        "title":"first question",
        "question":"what's your ...",
        "answers":[
            {
                "ansid":"a11",
                "anstext":"answer a11",
                "ansvalue":"kotae"
            },
            {
                "ansid":"a12",
                "anstext":"answer a22",
                "ansvalue":"kotae"
            }
        ]
    },
    {
        "parent":["a11"],
        "title":"this question is ...",
        "question":"what's your ...",
        "answers":[
            {
                "ansid":"a111",
                "anstext":"answer",
                "ansvalue":"kotae"
            },
            {
                "ansid":"a112",
                "anstext":"answer",
                "ansvalue":"kotae"
            }
        ]
    },
    {
        "parent":["a12"],
        "question":"what's your ...",
        "answers":[
            {
                "ansid":"a221",
                "anstext":"answer",
                "ansvalue":"kotae"
            },
            {
                "ansid":"a222",
                "anstext":"answer",
                "ansvalue":"kotae"
            }
        ]
    }
]
```