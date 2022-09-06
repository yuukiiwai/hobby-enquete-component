import React,{useState} from 'react';

export interface enqprops {
    q:Array<___question>,
    getRest:(num:number)=>any,
    getAns:(value:string)=>any,
    debug?:boolean,
}

export interface ___question {
    parent:Array<string>,
    title?:string,
    question:string,
    answers:Array<___answer>
}

export interface ___answer {
    ansid:string,
    anstext:string,
    ansvalue:string
}

export const Enq:React.FC<enqprops> = (props:enqprops) => {
    const qdata:Array<___question> = props.q;
    const [qstuck,setQStuck] = useState<Array<___question>>(qdata.filter((q)=>{return q.parent.indexOf("") !== -1}).slice(1));
    const [qhead,setQHead] = useState<___question | undefined>(qdata[0]);

    // headを更新する
    const goNextQ = (newqstuck:Array<___question>) => {
        // nextqhead ... 次の読み込みでの表示
        const nextqhead:___question|undefined = newqstuck[0];
        setQHead(nextqhead);
    }

    // スタックを更新する
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

        // nextqstuck ... 次の読み込みでのスタック
        const nextqstuck = tmpqstuck.slice(1);
        setQStuck(nextqstuck);

        return tmpqstuck;
    }

    // コンポーネント更新処理
    const enqUpdate = (id:string) => {
        const newqstuck = makeNextQs(id);
        goNextQ(newqstuck);
        
        return newqstuck.length;
    }

    // 返り値処理
    const backUpdate = (restlen:number,value:string) => {
        // Enqを呼び出したコンポーネントへの戻り値
        props.getRest(restlen);    // 最初の質問はスタックに入っていないからlengthもそのままあげて良い。
        props.getAns(value);
    }


    // クリック時
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