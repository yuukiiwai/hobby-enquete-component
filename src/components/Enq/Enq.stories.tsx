import React from 'react';
import { ComponentStory,ComponentMeta } from '@storybook/react';
import { Enq } from './Enq';

export default {
    title:'Enq/Enq',
    component:Enq
} as ComponentMeta<typeof Enq>;

const Template: ComponentStory<typeof Enq> = (args) => <Enq {...args}/>;

export const Default = Template.bind({});

Default.args = {
    q:
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
            "title":"this question is ... ",
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
    ],
    getRest:(num:number)=>{},
    getAns:(value:string)=>{},
}