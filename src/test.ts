import { Mathf } from "./commands/trading-card/utils/Mathf";

var t1="123";
var t2="2e2";
var t3="qweqwe";

var res1=Mathf.isNumeric(t1);
var res2=Mathf.isNumeric(t2);
var res3=Mathf.isNumeric(t3);

console.log(res1,res2,res3);