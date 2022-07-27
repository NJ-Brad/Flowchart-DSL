import { Block } from "./Block";
import { FlowchartItem } from "./FlowchartItem";
import { FlowchartRelationship } from "./FlowchartRelationship";
import { FlowchartWorkspace } from "./FlowchartWorkspace";
import { LineParser } from "./LineParser";

export class CodeBlockToFlowchartConverter
{
    previousItemId : string = "";
    previousConditionId: string = "";

    public convert(block: Block) : FlowchartWorkspace {
        return this.convertWorkspace(block);
    }

    // https://stackoverflow.com/questions/2140627/how-to-do-case-insensitive-string-comparison
    ciEquals(a: string, b : string) {
        return typeof a === 'string' && typeof b === 'string'
            ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0
            : a === b;
    }    

     convertWorkspace(block: Block ) : FlowchartWorkspace {
        var rtnVal: FlowchartWorkspace  = new FlowchartWorkspace();

            var child: Block;
            var grandChild: Block;
            for (var bn = 0; bn < block.children.length; bn++)
            {
                child = block.children[bn];
                this.convertFlowItem(rtnVal.items, rtnVal.relationships, child);
            }
            this.linkItems(rtnVal.items, rtnVal.relationships);

         return rtnVal;
     }

     linkItems(items: FlowchartItem[], connections: FlowchartRelationship[])
     {
        var prevItemName: string = "";
        for (var itemNum = 0; itemNum < items.length; itemNum++)
        {
            if(prevItemName !== "")
            {
                var newConn: FlowchartRelationship = new FlowchartRelationship();
                newConn.label = " ";
                newConn.from = prevItemName;
                newConn.to = items[itemNum].id;
                connections.push(newConn);
            }
            if(items[itemNum].itemType === "DECISION")
            {
                prevItemName = "";
            }
            else
            {
                prevItemName = items[itemNum].id;
            }
        }
    }

convertFlowItem(items: FlowchartItem[], connections: FlowchartRelationship[], block: Block){
    var newItem: FlowchartItem = new FlowchartItem();

    var parts: string[];

    var lp: LineParser = new LineParser();
    parts = lp.parse(block.blockText);

    var itemType: string = "";
    var label: string = "";
    var itemId: string = "";
    var technology: string = "";
    var label: string = "";
    var conditionLabel: string = "";
    var description: string = "";

    // ignore a comment
    if(block.blockText[0] === '\'')
    {
        return;
    }

    if(parts.length < 2)
    {
        return;
    }

    if(parts[0].toLowerCase() === "component:")
    {
        itemType = "ACTION";
        label = parts[1];
        itemId = parts[1];
    }

    if(parts[1].toLowerCase() === "component:")
    {
        itemType = "ACTION";
        label = parts[2];
        itemId = parts[2];
    }

    if(parts.length === 6)
    {
        if(parts[1].toLowerCase() === "component:")
        {
            itemType = "ACTION";
            label = parts[2];
            itemId = parts[2];
            conditionLabel = parts[4];
        }
        else if(parts[3].toLowerCase() === "component:")
        {
            itemType = "ACTION";
            label = parts[4];
            itemId = parts[4];
            conditionLabel = parts[2];
        }

    }

    label = this.trimComma(label.trim());
    itemId = this.fixId(this.trimComma(itemId.trim()));

    label = this.spaceLabel(this.removeEnumName(label));
    itemId = this.removeEnumName(itemId);

    if(this.previousConditionId !== "")
    {
        // connect the previous condition to this item (or its condition)
        if(conditionLabel.length > 0){
            this.addConnection(this.previousConditionId, itemId+"_cnd", "No", connections);
        }
        else
        {
            this.addConnection(this.previousConditionId, itemId, "No", connections);
        }

        // connect the previous item to this item
        //this.addConnection(this.previousItemId, itemId, " ", connections);

        this.previousConditionId = "";
    }

    if(conditionLabel.length > 0){
        // add a decision into the flow
        this.addDecision(this.spaceLabel(conditionLabel), itemId+"_cnd", items);
//        this.addConnection(this.previousItemId, itemId+"_cnd", " ", connections);
        this.addConnection(itemId+"_cnd", itemId, "Yes", connections);

        // store this connection so that it can be connected to the next item properly
        this.previousConditionId = itemId+"_cnd";
    }

    this.previousItemId = itemId;

    itemType = itemType.toUpperCase();
    switch(itemType)
    {
        case "ACTION":
            newItem = new FlowchartItem ();
            newItem.itemType = itemType;
            newItem.label = label;
            newItem.id = itemId;
            newItem.description = description;

            // this will allow for defining explicit "Next Step"
            for (var cn = 0; cn < block.children.length; cn++)
            {
                 var child = block.children[cn];
                 this.convertConnection(itemId, items, connections, child);
            }

            items.push(newItem);
            break;
        case "DECISION":
            newItem = new FlowchartItem ();
            newItem.itemType = itemType;
            newItem.label = label;
            if(itemId === "")
            {
                itemId = this.fixId(label);
            }
            newItem.id = itemId;
            newItem.description = description;
            for (var cn = 0; cn < block.children.length; cn++)
            {
                 var child = block.children[cn];
                 this.convertConnection(itemId, items, connections, child);
            }
            items.push(newItem);
            break;
        case "START":
            newItem = new FlowchartItem ();
            newItem.itemType = itemType;
            newItem.label = "Start";
            if(itemId === "")
            {
                itemId = this.fixId(label);
            }
            newItem.id = itemId;
            items.push(newItem);
            break;
        case "END":
            newItem = new FlowchartItem ();
            newItem.itemType = itemType;
            newItem.label = "End";
            if(itemId === "")
            {
                itemId = this.fixId(label);
            }
            newItem.id = itemId;
            items.push(newItem);
            break;
        case "CONNECTION":
            var newConn: FlowchartRelationship = new FlowchartRelationship();
            if(parts.length === 4)
            {
                newConn.from = parts[1];
                newConn.to = parts[2];
                newConn.label = this.fixConnectionLabel(parts[3]);
            }
    
            if(parts.length === 3)
            {
                newConn.from = parts[1];
                newConn.to = parts[2];
                newConn.label = " ";
            }
    
            if (newConn !== null)
            {
                connections.push(newConn);
            }
            break;
            case "YES":
                    var newConn: FlowchartRelationship = new FlowchartRelationship();
                    newConn.from = parts[1];
                    newConn.to = parts[2];
                    newConn.label = "Yes";
                    connections.push(newConn);
                break;
            case "NO":
                    var newConn: FlowchartRelationship = new FlowchartRelationship();
                    newConn.from = parts[1];
                    newConn.to = parts[2];
                    newConn.label = "No";
                    connections.push(newConn);
                break;
            }
        }

        convertConnection(myId: string,  items: FlowchartItem[], connections: FlowchartRelationship[], block: Block)
        {
            var parts: string[];

            var lp: LineParser = new LineParser();
            parts = lp.parse(block.blockText);

//            var myId: string = this.fixId(items[items.length - 1].id);

            var newConn: FlowchartRelationship = new FlowchartRelationship();
            newConn.label = this.fixConnectionLabel(parts[0]);
            newConn.from = myId;
            newConn.to = this.fixId(parts[1]);
            connections.push(newConn);
        }

        fixId(input: string) : string
        {
            // https://bobbyhadz.com/blog/javascript-typeerror-replaceall-is-not-a-function
//            console.log('input: ', input);

            var brokenLabel: string = input.trim().split(' ').join('_');        
            return brokenLabel;
        }

        fixConnectionLabel(input: string) : string
        {
            // https://bobbyhadz.com/blog/javascript-typeerror-replaceall-is-not-a-function
//            console.log('input: ', input);

            var brokenLabel: string = input.trim();
            if(brokenLabel === "_")
            {
                brokenLabel = " ";
            }
            return brokenLabel;
        }

        trimComma(input: string) : string
        {
            var rtnVal: string = input;
            // remove the trailing period if necessary
            if(rtnVal.endsWith(',')){
                rtnVal = rtnVal.substring(0, rtnVal.length - 1);
            }

            return rtnVal;
        }

        removeEnumName(input: string) : string
        {
            var rtnVal: string = input;

            if(rtnVal.startsWith('QuestionNames.')){
                rtnVal = rtnVal.substring(14);
            }

            return rtnVal;
        }

        spaceLabel(input: string) : string
        {
            var rtnVal: string = "";

            for (let ltr of input) {
                if(this.isUpper(ltr))
                {
                    if(rtnVal.length > 0)
                    {
                        rtnVal += " ";
                    }
                }
                rtnVal += ltr;
            }
            return rtnVal;
        }   

        isUpper(c: string) : boolean
        {
            return (c == c.toUpperCase() && !(c >= '0' && c <= '9') &&(c >='A' && c <= 'Z')); 
        }

        addDecision(label: string, itemId:string, items: FlowchartItem[]){
            var newItem: FlowchartItem = new FlowchartItem ();
            newItem.itemType = "DECISION";
            newItem.label = label;
            newItem.id = itemId;
            items.push(newItem);
        }

//        this.AddConnection(itemId+"_cnd", itemId, "Yes", connections);

    addConnection(from: string, to: string, label: string, connections: FlowchartRelationship[]){

        var newConn: FlowchartRelationship = new FlowchartRelationship();
        newConn.from = from;
        newConn.to = to;
        newConn.label = this.fixConnectionLabel(label);
        connections.push(newConn);
    }


// https://stackoverflow.com/questions/1027224/how-can-i-test-if-a-letter-in-a-string-is-uppercase-or-lowercase-using-javascrip
        // function solution(s) {
        //     var c = s[0];
            
        //     if (c == c.toUpperCase() && !(c >= '0' && c <= '9') &&(c >='A' && c <= 'Z')) {
        //         return 'upper';
        //     } else if (c == c.toLowerCase() && !(c >= '0' && c <= '9') &&(c >='a' && c <= 'z')){
        //         return 'lower';
        //     } else if (c >= '0' && c <= '9'){
        //        return 'digit'
        //     } else {
        //       return 'other' 
        //     }
        //     }
            
        //     var str1= (solution('A')) // upper
        //     var str2 = solution('b') // lower
        //     var str3 = solution('1') // digit
        //     var str4 = solution('_') // other
        //     console.log(`${str1} ${str2} ${str3} ${str4}`)

}
