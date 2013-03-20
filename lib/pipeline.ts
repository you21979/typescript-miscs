///<reference path='typescript/node.d.ts'/>
/** 
 * @fileOverview パイプライン
 */
var _setImmediate:Function = (()=>global.setImmediate ? global.setImmediate : process.nextTick)();
var MAX_PIPELINE:number = 100; // 実行数
/**
 *  パイプライン直列化クラス
 */
export class Pipeline{
    private q:Function[] = [];
    private runflag:bool = false;
    /**
     *  初期化
     */
    constructor(){
    }
    /**
     *  後始末
     */
    public finalize():void{
        this.q.length = 0;
    }
    /**
     *  パイプライン処理を開始する
     */
    public run():void{
        this.runflag = true;
        var self:Pipeline = this;
        _setImmediate(function T(){
            if(self.runflag){
                var len = self.q.length > MAX_PIPELINE ? MAX_PIPELINE : self.q.length;
                for(var i = 0; i<len; ++i){
                    var f = self.q[i];
                    if(f){
                        f();
                    }
                }
                if(len > 0){
                    self.q.splice(0, len);
                }
                _setImmediate(T);
            }
        });
    }
    /**
     *  パイプライン処理を停止する
     */
    public stop():void{
        this.runflag = false;
    }
    /**
     *  タスクを作成する
     */
    public createTask(funcs:Function[]):Function{
        var i:number = 0;
        var len:number = funcs.length;
        var q:Function[] = this.q;
        return function f(cb:Function, arg:any):void{
            if(i >= len){
                if(cb){
                    cb(null, arg);
                }
            }else{
                q.push(()=>{
                    if(i < len){
                        try{
                            funcs[i++]((argp:any)=>{f(cb, argp)}, arg);
                        }catch(e){
                            cb(e, arg);
                        }
                    }
                });
            }
        };
    }
}

