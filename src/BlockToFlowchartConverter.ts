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
            if(this.ciEquals(child.blockText, "workspace")) {
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

                if(this.ciEquals(child.blockText, "items")) {
                    for (var gcn = 0; gcn < child.children.length; gcn++)
                    {
                        grandChild = child.children[gcn];
                        this.convertItem(rtnVal.items, grandChild);
                 }
             }

              if(this.ciEquals(child.blockText, "connections")) {
                for (var gcn = 0; gcn < child.children.length; gcn++)
                {
                    grandChild = child.children[gcn];
                    this.convertConnection(rtnVal.relationships, grandChild);
                }
            }
         }

         return rtnVal;
     }

//      convertItem(items: C4Item[], block: Block){
//          var newItem: C4Item = new C4Item();

//          var parts: string[];

//          var lp: LineParser = new LineParser();
//          parts = lp.parse(block.blockText);

//          var itemType: string = "";
//          var itemId: string = "";
//          var technology: string = "";
//          var label: string = "";
//          var description: string = "";

//          var nextIsTechnology: boolean = false;

//             for (var pn = 0; pn < parts.length; pn++)
//             {
//                  var str = parts[pn];

//              if (pn === 0)
//              {
//                  itemType = str;
//              }
//             else if (pn === 1)
//             {
//                 itemId = str;
//             }
//             else
//             {
//                 if(this.ciEquals(str, "utilizing")) {
//                     nextIsTechnology = true;
//                  }
//                  else if (nextIsTechnology)
//                  {
//                      technology = str;
//                      nextIsTechnology = false;
//                  }
//                 else if (str[0] === "(")
//                  {
//                     description = str.trim();
//                     description = description.substring(1, description.length - 2);
//                  }
//                  else
//                  {
//                      label = str.trim();
//                  }
//              }
//          }

//          itemType = itemType.toUpperCase();
//          switch(itemType)
//          {
//              case "PERSON":
//                 newItem = new C4Item ();
//                 newItem.itemType = itemType;
//                 newItem.label = label;
//                 newItem.id = itemId;
//                 newItem.description = description;
//                 break;
//              case "EXTERNAL_PERSON":
//                 newItem = new C4Item ();
//                 newItem.itemType = "PERSON";
//                 newItem.label = label;
//                 newItem.id = itemId;
//                 newItem.description = description;
//                 newItem.external = true;
//                 break;
//              case "COMPONENT":
//                 newItem = new C4Item ();
//                 newItem.itemType = itemType;
//                 newItem.label = label;
//                 newItem.id = itemId;
//                 newItem.description = description;
//                 newItem.technology = technology;
//                 break;
//              case "EXTERNAL_COMPONENT":
//                 newItem = new C4Item ();
//                 newItem.itemType = "COMPONENT";
//                 newItem.label = label;
//                 newItem.id = itemId;
//                 newItem.description = description;
//                 newItem.technology = technology;
//                 newItem.external = true;
//                  break;
//              case "SYSTEM":
//                 newItem = new C4Item ();
//                 newItem.itemType = itemType;
//                 newItem.label = label;
//                 newItem.id = itemId;
//                 newItem.description = description;
//                  break;
//              case "EXTERNAL_SYSTEM":
//                 newItem = new C4Item ();
//                 newItem.itemType = "SYSTEM";
//                 newItem.label = label;
//                 newItem.id = itemId;
//                 newItem.description = description;
//                 newItem.external = true;
//                  break;
//              case "DATABASE":
//                 newItem = new C4Item ();
//                 newItem.itemType = itemType;
//                 newItem.label = label;
//                 newItem.id = itemId;
//                 newItem.description = description;
//                 newItem.technology = technology;
//                 newItem.database = true;
//                  break;
//              case "EXTERNAL_DATABASE":
//                 newItem = new C4Item ();
//                 newItem.itemType = "DATABASE";
//                 newItem.label = label;
//                 newItem.id = itemId;
//                 newItem.description = description;
//                 newItem.technology = technology;
//                 newItem.external = true;
//                 newItem.database = true;
//                  break;
//              case "SYSTEM_BOUNDARY":
//                 newItem = new C4Item ();
//                 newItem.itemType = itemType;
//                 newItem.label = label;
//                 newItem.id = itemId;
//                 newItem.description = description;
//                  break;
//              case "CONTAINER_BOUNDARY":
//                 newItem = new C4Item ();
//                 newItem.itemType = itemType;
//                 newItem.label = label;
//                 newItem.id = itemId;
//                 newItem.description = description;
//                  break;
//              case "ENTERPRISE_BOUNDARY":
//                 newItem = new C4Item ();
//                 newItem.itemType = itemType;
//                 newItem.label = label;
//                 newItem.id = itemId;
//                 newItem.description = description;
//                  break;
//              case "NODE":
//                 newItem = new C4Item ();
//                 newItem.itemType = itemType;
//                 newItem.label = label;
//                 newItem.id = itemId;
//                 newItem.description = description;
//                  break;
//              case "ENTERPRISE":
//                 newItem = new C4Item ();
//                 newItem.itemType = itemType;
//                 newItem.label = label;
//                 newItem.id = itemId;
//                 newItem.description = description;
//                  break;
//              case "CONTAINER":
//                 newItem = new C4Item ();
//                 newItem.itemType = itemType;
//                 newItem.label = label;
//                 newItem.id = itemId;
//                 newItem.description = description;
//                 newItem.technology = technology;
//                  break;
//              case "TABLE":
//                  newItem = new C4Item ();
//                  newItem.itemType = "TABLE";
//                  newItem.label = label;
//                  newItem.id = itemId;
//                  newItem.description = description;
//                  newItem.technology = technology;
//                  break;
//          }

//          if (newItem !== null)
//          {
//             for (var cn = 0; cn < block.children.length; cn++)
//             {
//                  var child = block.children[cn];
//                  this.convertItem(newItem.items, child);
//              }

//              items.push(newItem);
//          }
//    }

convertItem(items: FlowchartItem[], block: Block){
    var newItem: FlowchartItem = new FlowchartItem();

    var parts: string[];

    var lp: LineParser = new LineParser();
    parts = lp.parse(block.blockText);

    var itemType: string = "";
    var itemId: string = "";
    var technology: string = "";
    var label: string = "";
    var description: string = "";

    var nextIsTechnology: boolean = false;

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
           break;
        case "ACTION":
            newItem = new FlowchartItem ();
            newItem.itemType = itemType;
            newItem.label = label;
            newItem.id = itemId;
            newItem.description = description;
            break;
        case "DECISION":
            newItem = new FlowchartItem ();
            newItem.itemType = itemType;
            newItem.label = label;
            newItem.id = itemId;
            newItem.description = description;
            break;
    }

    if (newItem !== null)
    {
       for (var cn = 0; cn < block.children.length; cn++)
       {
            var child = block.children[cn];
            this.convertItem(newItem.items, child);
        }

        items.push(newItem);
    }
}
    // convertConnection(connections: C4Relationship[], block: Block) {
    //     var newItem: C4Relationship = new C4Relationship();

    //     var parts: string[];

    //     var lp: LineParser = new LineParser();
    //     parts = lp.parse(block.blockText);

    //     var origin: string = "";
    //     var destination: string = "";
    //     var technology: string = "";
    //     var label: string = "";

    //     var nextIsTechnology: boolean = false;

    //     for (var pn = 0; pn < parts.length; pn++)
    //     {
    //         var str = parts[pn];
    //         if (pn === 0)
    //         {
    //             origin = str;
    //         }
    //         else if (pn === 1)
    //         {
    //             label = str.trim();
    //         }
    //         else if (pn === 2)
    //         {
    //             destination = str;
    //         }
    //         else
    //         {
    //             if(this.ciEquals(str, "utilizing")) {
    //                 nextIsTechnology = true;
    //             }
    //             else if (nextIsTechnology)
    //             {
    //                 technology = str;
    //                 nextIsTechnology = false;
    //             }
    //         }
    //     }

    //     newItem = new C4Relationship();
    //     newItem.from = origin;
    //     newItem.to = destination;
    //     newItem.label = label;
    //     newItem.technology = technology;

    //     if (newItem !== null)
    //     {
    //         connections.push(newItem);
    //     }
    // }
    convertConnection(connections: FlowchartRelationship[], block: Block) {
        var newItem: FlowchartRelationship = new FlowchartRelationship();

        var parts: string[];

        var lp: LineParser = new LineParser();
        parts = lp.parse(block.blockText);

        var origin: string = "";
        var destination: string = "";
        var label: string = "";


        if(parts.length === 3)
        {
            origin = parts[0];
            label = parts[1].trim();
            destination = parts[2];
        }

        if(parts.length ===2)
        {
            origin = parts[0];
            label = " ";
            destination = parts[1];
        }

        newItem = new FlowchartRelationship();
        newItem.from = origin;
        newItem.to = destination;
        newItem.label = label;

        if (newItem !== null)
        {
            connections.push(newItem);
        }
    }
}