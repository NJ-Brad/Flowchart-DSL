import * as fs from 'fs';
import { Block } from './Block';
import { BlockParser } from './BlockParser';

import { StringBuilder } from "./Stringbuilder";
import { StringStream } from "./StringStream";
import { BlockToFlowchartConverter} from "./BlockToFlowchartConverter";
import { FlowchartWorkspace } from "./FlowchartWorkspace";
import { WorkspacePublisher } from "./WorkspacePublisher";

let message: string = 'Hello World';
console.log(message);

// export const shortFormQuestions: string = 
// `  [
//     { component: QuestionNames.LoanType },
//     { component: QuestionNames.HomeDescription },
//     { component: QuestionNames.TimeframeToPurchase, pageLogic: ShowOnlyForPurchase, },
//     { component: QuestionNames.FirstTimeHomeBuyer, pageLogic: ShowOnlyForPurchase, },
//     { component: QuestionNames.HomeValue, pageLogic: ShowOnlyForCashoutAndRefinance, },
//     { component: QuestionNames.MortgageBalance, pageLogic: ShowOnlyForCashoutAndRefinance },
//     { component: QuestionNames.Military },
//     { component: QuestionNames.WorkingWithAnAgent },
//     { component: QuestionNames.PurchasePrice, pageLogic: ShowOnlyForPurchase, },
//     { component: QuestionNames.DownPayment, pageLogic: ShowOnlyForPurchase, },
//     { component: QuestionNames.CreditProfile },
//     {
//       component: QuestionNames.PersonalInfo,
//       pageLogic: {
//         stopBlock: {
//           buttonText: "Submit",
//           submissionType: SubmissionTypes.Traditional,
//           redirectAfterSubmit: "/thank-you",
//         },
//       },
//     }
//   ]`;

// // https://stackoverflow.com/questions/38688822/how-to-parse-json-string-in-typescript

//   type MyType = {
//     name: string;
//     description: string;
//   };

//   type PageEntry = {
//     component: string;
//     pageLogic: string;
//   };

//   const safeJsonParse = <T>(guard: (o: any) => o is T) => 
//   (text: string): ParseResult<T> => {
//     const parsed = JSON.parse(text);
//     return guard(parsed) ? { parsed, hasError: false } : { hasError: true };
//   };

// type ParseResult<T> =
//   | { parsed: T; hasError: false; error?: undefined }
//   | { parsed?: undefined; hasError: true; error?: unknown };


// function isMyType(o: any): o is MyType {
//     return "name" in o && "description" in o;
//   }

// function isPageEntry(o: any): o is MyType {
// //    return "component" in o && "description" in o;
// //    return "component" in o;
// return true;
//   }

// const json = '{ "name": "Foo", "description": "Bar" }';

// const result = safeJsonParse(isMyType)(json); // result: ParseResult<MyType>
// if (result.hasError) {
//   console.log("error :/");  // further error handling here
// } else {
//   console.log(result.parsed.description); // result.parsed now has type `MyType`
// }

// const result2 = safeJsonParse(isPageEntry)(shortFormQuestions); // result: ParseResult<MyType>
// if (result2.hasError) {
//   console.log("error :/");  // further error handling here
// } else {
//   console.log(result2.parsed); // result.parsed now has type `MyType`
// }



// https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
// https://bobbyhadz.com/blog/typescript-cannot-find-name-process#:~:text=To%20solve%20the%20error%20%22Cannot,json%20and%20restarting%20your%20IDE.
const myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

// switch (myArgs[0]) {
//   case 'insult':
//     console.log(myArgs[1], 'smells quite badly.');
//     break;
//   case 'compliment':
//     console.log(myArgs[1], 'is really cool.');
//     break;
//   default:
//     console.log('Sorry, that is not something I know how to do.');
// }

//const fullText = document.getText();

//const fullText = fs.readFileSync('flight.txt').toString('utf-8');
const fullText = fs.readFileSync(myArgs[0]).toString('utf-8');

var stream: StringStream;
stream = new StringStream(fullText);

var bp: BlockParser = new BlockParser();

var block: Block = new Block();
bp.parse(block.children, stream, 0);

var btc4: BlockToFlowchartConverter = new BlockToFlowchartConverter();

var ws: FlowchartWorkspace = btc4.convert(block);

var publisher: WorkspacePublisher = new WorkspacePublisher();

//var newText: string = fullText;

var newText = "```mermaid" + "\r\n" + publisher.publish(ws, "Component", "MERMAID") + "\r\n" + "```";
fs.writeFileSync(myArgs[1], newText);
