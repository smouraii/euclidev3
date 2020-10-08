import React, { useState } from "react";
import { ResponsivePieCanvas } from "@nivo/pie";
import redaxios from "redaxios"
export default function MyResponsivePie() {
const [data, setData] = useState(null);

  React.useEffect(() => {
    redaxios
      .get("https://run.mocky.io/v3/86b418dc-085b-415d-8c2d-bee469ac5b82")
      .then((res) => setData(res.data));
  }, []);

  return (
    <div style={{ height: 500,minWidth:450 }}>
    <ResponsivePieCanvas
      data={data}
      margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
      sortByValue={true}
      pixelRatio={1}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: "paired" }}
      borderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
      radialLabel={function(e){return e.id+" ("+e.value+")"}}
      radialLabelsSkipAngle={0}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: "color" }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      fill={[
        {
          match: {
            id: "ruby"
          },
          id: "dots"
        },
        {
          match: {
            id: "c"
          },
          id: "dots"
        },
        {
          match: {
            id: "go"
          },
          id: "dots"
        },
        {
          match: {
            id: "python"
          },
          id: "dots"
        },
        {
          match: {
            id: "scala"
          },
          id: "lines"
        },
        {
          match: {
            id: "lisp"
          },
          id: "lines"
        },
        {
          match: {
            id: "elixir"
          },
          id: "lines"
        },
        {
          match: {
            id: "javascript"
          },
          id: "lines"
        }
      ]}
      legends={[
        {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolShape:'circle',
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                      }
                ]
        }
      ]}
    />
  </div>
);
}
