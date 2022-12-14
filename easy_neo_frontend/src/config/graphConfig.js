import * as NeoVis from "neovis.js";
import neo4j from "./neo4jConfig";

const config = {
    containerId: "viz",
    neo4j: neo4j,
    "visConfig": {
        "nodes": {
          "shape": "ellipse",
          
        },
        "edges": {
        
          "arrows": {
            "from": {
              "enabled": false
            },
            "to": {
              "enabled": true
            }
          },
          "color": "black"
        }
      },
    labels: {
        Company: {
            label: "Company",
            title_properties: [
                "Company",
                "RegisteredCapital"
            ],
            [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
                static:{
                    group:"Company"
                },
                function:{
                    title:(node)=>{
                        return NeoVis.objectToTitleHtml(node, [
                        "Company",
                        "Address",
                        "RegisteredCapital",
                        "Email"
                    ])},
                }

            }
        },
        BusinessRange: {
            label: "BusinessRange",
            [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
                static:{
                    group:"BusinessRange",
                }
            }
        },
        LegalPerson: {
            label:"LegalPerson",
            [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
                static:{
                    group:"LegalPerson",
                },
                function:{
                    title:(node)=>NeoVis.objectToTitleHtml(node, [
                        "LegalPerson"
                    ]),
                }
            }
        },
        AssetCategory: {
            label:"AssetCategory",
            [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
                static:{
                    group:"AssetCategory",
                }
            }
        },
        AssetName: {
            label: "AssetName",
            [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
                static:{
                    group:"AssetName",
                }
            }
        },
        City:{
            label:"City",
            [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
                static:{
                    group:"City",
                }
            }
        },
        CostCenter:{
            label:"CostCenter",
            [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
                static:{
                    group:"CostCenter",
                }
            }
        },
        District:{
            label:"District",
            [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
                static:{
                    group:"District",
                }
            }
        },
        Industry:{
            label:"Industry",
            
            [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
                static:{
                    group:"Industry",
                }
            }
        },
        Province:{
            label:"Province",
            [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
                static:{
                    group:"Province",
                }
            }
        },
        Stock:{
            label:"Stock",
            [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
                static:{
                    group:"Stock",
                }
            }
        },
        StorageLocationName:{
            label:"StorageLocationName",
            [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
                static:{
                    group:"StorageLocationName",
                }
            }
        }
    },
    relationships: {
            ???????????????:{
                    [NeoVis.NEOVIS_ADVANCED_CONFIG]:{function:{
                    label:(relation)=>{return relation.type}},
                    static:{font:{size:15}}
            }},
            ?????????:{[NeoVis.NEOVIS_ADVANCED_CONFIG]:{function:{
                label:(relation)=>{return relation.type}}
            }},
            ?????????:{
                [NeoVis.NEOVIS_ADVANCED_CONFIG]:{function:{
                    label:(relation)=>{return relation.type}}
            }},
            ?????????:{
                [NeoVis.NEOVIS_ADVANCED_CONFIG]:{function:{
                    label:(relation)=>{return relation.type}}
            }},
            ?????????:{
                [NeoVis.NEOVIS_ADVANCED_CONFIG]:{function:{
                    label:(relation)=>{return relation.type}}
            }},
            ???????????????:{
                [NeoVis.NEOVIS_ADVANCED_CONFIG]:{function:{
                    label:(relation)=>{return relation.type}}
            }},
            ??????:{
                [NeoVis.NEOVIS_ADVANCED_CONFIG]:{function:{
                    label:(relation)=>{return relation.type}}
            }},
            ???????????????:{
                [NeoVis.NEOVIS_ADVANCED_CONFIG]:{function:{
                    label:(relation)=>{return relation.type}}
            }}

    },
    initialCypher: "MATCH (n)-[r]->(m) RETURN * LIMIT 50"
}





export default config;