interface IHoge {
    call:(type:number)=>number;
}
interface IFuga {
    one:string;
    two:string;
    three:number;
}
class Hoge implements IHoge{
    public call(type:number):number{
        return 0;
    }
}
class Fuga implements IFuga{
    static version:number = 0;
    public one:string;
    public two:string;
    private three:number;
    constructor(){
        this.one = "";
        this.two = "";
        this.three = 0;
    }
}
module mod{
    export class Test{
        public call():string{
            return hoge;
        }
    }
    export var hage:Test = new Test();
    var hoge:string = "private";
    export var huge:string = "no";
}
[
// 基本
()=>{
    var a:number = 0;
    var b:string = "aaa";
},
// 基本配列
()=>{
    var a:number[] = [];
    a.push(1);
    var b:string[] = [];
    b.push("hoge");
    var c:number[][] = [[],[]]
    c[0].push(100);
    var d:string[][] = [[],[]]
    d[0].push("aaaaaa");
},
// 関数
()=>{
    var a:Function = (x)=>x+1;
    var b:(x:number)=>number = (x)=>x+1;
    var c:()=>void = ()=>{};
},
// 関数配列
()=>{
    var a:Function[] = [(x)=>x+1];
    //var b:(x:number)=>number = [];
    // リテラル版どうやってやるんだ？
},
// オブジェクト
()=>{
    var a:{hoge:string;} = {
        hoge : "aaa"
    };
},
// オブジェクト配列
()=>{
    var a:{hoge:string;}[] = [{
        hoge : "aaa"
    },{
        hoge : "bbb"
    }];
},
// クラス
()=>{
    var a:Hoge = new Hoge();
    var b:Fuga = new Fuga();
},
// クラス配列
()=>{
    var a:Hoge[] = [new Hoge()];
    var b:Fuga[] = [new Fuga()];
},
// インターフェイスオブジェクト
// インターフェイスでオブジェクトの縛りはやめたほうがいいかも
()=>{
    var a:IHoge = {
    };//通ってしまうおかしい？
    var b:IFuga = {
        one : "hoge",
        two : "hoge",
        three : 0,
    };
},
// モジュール
()=>{
    var a:string = mod.hage.call();
},
()=>{}
].forEach((f)=>{f()});
