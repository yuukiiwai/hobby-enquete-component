import React,{useState} from 'react';

export interface enqprops {
    q:Array<___question>,
    getRest:(num:number)=>any,
    getAns:(value:string)=>any,
    debug?:boolean,
}

export type ___question = {
    parent:Array<string>,
    title?:string,
    question:string,
    answers:Array<___answer>
}

export type ___answer = {
    ansid:string,
    anstext:string,
    ansvalue:string
}

export const is___questions = (arg:any):arg is Array<___question> => {
    try {
        let questionsCheck = true;
        if(Array.isArray(arg) === false){
            return false;
        }
        for(let i = 0;i<arg.length;i++){
            questionsCheck = questionsCheck && is___question(arg[i]);
        }
        return questionsCheck;
    } catch (error) {
        return false;
    }
}

export const is___question = (arg:any):arg is ___question =>{
    try {
        const parentCheck = typeof(arg.parent) !== "undefined" && Array.isArray(arg.parent) && typeof(arg.parent[0]) === 'string';
        const questionCheck = typeof(arg.question) === 'string';
        const answersCheck = typeof(arg.answers) !== "undefined" && Array.isArray(arg.answers);
        let answerCheck = true;
        for(let i = 0;i<arg.answers.length;i++){
            answerCheck = answerCheck && is___answer(arg.answers[i]);
        }
        return parentCheck && questionCheck && answersCheck && answerCheck;
    } catch (error) {
        return false;
    }
}

export const is___answer = (arg:any):arg is ___answer =>{
    try {
        const ansidCheck = typeof(arg.ansid) === "string";
        const anstextCheck = typeof(arg.anstext) === "string";
        const ansvalueCheck = typeof(arg.ansvalue) === "string" ;
        return ansidCheck && anstextCheck && ansvalueCheck;
    } catch (error) {
        return false;
    }
}

export const Enq:React.FC<enqprops> = (props:enqprops) => {
    const qdata:Array<___question> = props.q;
    const [qstuck,setQStuck] = useState<Array<___question>>(qdata.filter((q)=>{return q.parent.indexOf("") !== -1}).slice(1));
    const [qhead,setQHead] = useState<___question | undefined>(qdata[0]);

    // head???????????????
    const goNextQ = (newqstuck:Array<___question>) => {
        // nextqhead ... ??????????????????????????????
        const nextqhead:___question|undefined = newqstuck[0];
        setQHead(nextqhead);
    }

    // ???????????????????????????
    const makeNextQs = (id:string):Array<___question> => {
        let tmpqstuck:Array<___question> = [];
        for(let i = 0; i < qstuck.length; i++){
            tmpqstuck.push(qstuck[i]);
        }
        for(let i = 0 ; i < qdata.length; i++){
            if(qdata[i].parent.indexOf(id) !== -1){
                tmpqstuck.push(qdata[i]);
            }
        }

        // nextqstuck ... ????????????????????????????????????
        const nextqstuck = tmpqstuck.slice(1);
        setQStuck(nextqstuck);

        return tmpqstuck;
    }

    // ?????????????????????????????????
    const enqUpdate = (id:string) => {
        const newqstuck = makeNextQs(id);
        goNextQ(newqstuck);
        
        return newqstuck.length;
    }

    // ???????????????
    const backUpdate = (restlen:number,value:string) => {
        // Enq??????????????????????????????????????????????????????
        props.getRest(restlen);    // ?????????????????????????????????????????????????????????length?????????????????????????????????
        props.getAns(value);
    }


    // ???????????????
    const clk = (id:string,value:string) => {
        const restlen = enqUpdate(id);
        backUpdate(restlen,value);
    }

    return (
        <div>
            {
                (qstuck.length !== 0 || qhead !== undefined) &&
                <div>
                    {
                        props.debug &&
                        <>
                            <h1>enq component</h1>
                            <p>parent id :{(qhead as ___question) .parent}</p>
                        </>
                    }
                    {
                        (qhead as ___question).title !== undefined &&
                        <p className='___qtitle'>{(qhead as ___question).title}</p>
                    }
                    <p className='___qhead'>{(qhead as ___question).question}</p>
                    <ul className='___selectul'>
                        {(qhead as ___question).answers.map((item,key)=>
                            <li className='___selectli' key={key} onClick={() => clk(item.ansid,item.ansvalue)}>
                                {item.anstext}
                                {props.debug && 
                                <>
                                    {""} | ansID : {item.ansid} | ansVALUE : {item.ansvalue}
                                </>
                                }
                            </li>
                        )}
                    </ul>
                    {
                        props.debug && 
                        <hr>
                        </hr>
                    }
                </div>
            }
        </div>
    );
}