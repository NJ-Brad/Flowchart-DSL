import { Block } from "./Block";
import { FlowchartItem } from "./FlowchartItem";
import { FlowchartRelationship } from "./FlowchartRelationship";
import { FlowchartWorkspace } from "./FlowchartWorkspace";
import { LineParser } from "./LineParser";



export class BlockToFlowchartConverter
{
    public convert(block: Block) : FlowchartWorkspace {
        var rtnVal: FlowchartWorkspace = new FlowchartWorkspace();

        var child: Block;
        for (var bn = 0; bn < block.children.length; bn++)
        {
            child = block.children[bn];
            if(this.ciEquals(child.blockText, "flow")) {
                rtnVal = this.convertWorkspace(child);
            }
        }

        return rtnVal;
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

         return rtnVal;
     }

convertFlowItem(items: FlowchartItem[], connections: FlowchartRelationship[], block: Block){
    var newItem: FlowchartItem = new FlowchartItem();

    var parts: string[];

    var lp: LineParser = new LineParser();
    parts = lp.parse(block.blockText);

    var itemType: string = "";
    var itemId: string = "";
    var technology: string = "";
    var label: string = "";
    var description: string = "";

       for (var pn = 0; pn < parts.length; pn++)
       {
            var str = parts[pn];

        if (pn === 0)
        {
            itemType = str;
        }
       else if (pn === 1)
       {
           itemId = str;
       }
       else
       {
            if (str[0] === "(")
            {
               description = str.trim();
               description = description.substring(1, description.length - 2);
            }
            else
            {
                label = str.trim();
            }
        }
    }

    itemType = itemType.toUpperCase();
    switch(itemType)
    {
        case "BOUNDARY":
           newItem = new FlowchartItem ();
           newItem.itemType = itemType;
           newItem.label = label;
           newItem.id = itemId;
           newItem.description = description;
           for (var cn = 0; cn < block.children.length; cn++)
           {
                var child = block.children[cn];
                this.convertFlowItem(newItem.items, connections, child);
            }
    
            items.push(newItem);
            break;
        case "ACTION":
            newItem = new FlowchartItem ();
            newItem.itemType = itemType;
            newItem.label = label;
            newItem.id = itemId;
            newItem.description = description;
            items.push(newItem);
            break;
        case "DECISION":
            newItem = new FlowchartItem ();
            newItem.itemType = itemType;
            newItem.label = label;
            newItem.id = itemId;
            newItem.description = description;
            items.push(newItem);
            break;
        case "CONNECTION":
            var newConn: FlowchartRelationship = new FlowchartRelationship();
            if(parts.length === 4)
            {
                newConn.from = parts[1];
                newConn.to = parts[2];
                newConn.label = parts[3].trim();
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
}
