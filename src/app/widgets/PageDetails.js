import React, { useState } from "react";
import { Table, Input, Button, Icon, DatePicker } from "antd";
import {
  PortletBody,
  Portlet,
  PortletHeader,
} from "../partials/content/Portlet";
import redaxios from "redaxios";


export default function PageDetails(){
    const [pagination, setPagination] = useState({});

     //Result Table
  const [columnsResultsApi, setColumnsResultsApi] = useState([]);
  const [dataResults, setDataResults] = useState(null);
  const [dataSourceResults, setDataSourceResults] = useState(null);
  const [columnsDataResults, setColumnsDataResults] = useState(null);

   // Sample Table
   const [columnsSampleApi, setColumnsSampleApi] = useState([]);
   // const [dataSample, setDataSample] = useState(null);
   const [dataSourceSample, setDataSourceSample] = useState(null);
   const [columnsDataSample, setColumnsDataSample] = useState(null);
 

//mapping de pagedetails
//   React.useEffect(() => {
//     redaxios
//       .get(`http://localhost:8080/EuclideV2/api/getResults?dc=com.euclide.sdc.${columnsData.pagedetails.sdcid}&id=${userInfo.id}`)
//       .then((res) => setDataResults(res.data));
//   }, []);
//   console.log("DataResults", dataResults);

//    React.useEffect(() => {
//     if (!data) return;
//     const mapDataSample = data.data.map((datarow) => ({
//       id: datarow.id,
//       s_sampleid: datarow.s_sampleid,
//       sampledesc: datarow.sampledesc,
//       samplestatus: datarow.samplestatus,
//       templateflag: datarow.templateflag,
//     }));
//     setDataSourceSample(mapDataSample);
//     console.log("mapDataSample", mapDataSample);
//   }, [data]);

//   React.useEffect(() => {
//     if (!columnsData) return;
//     const mapColumnsSample = columnsData.pagedetails.map((column, index) =>
//       column.pagedetailscolumns.map(
//         (detailcolumn) => ({
//           title: detailcolumn.title,
//           dataIndex: detailcolumn.data,
//           key: detailcolumn.name,
//           ...getColumnSearchProps(detailcolumn.data),
//           sorter: (a, b) =>
//             a instanceof String || null
//               ? a.userInfo.localeCompare(b.userInfo)
//               : a.userInfo - b.userInfo,
//         }),
//         //need a condition here
//         //need to see why the datasetcolumns doesn't work as
//         columnsData.linkeddataset === true
//           ? column.datasetcolumns.map((resultcolumn, index) => ({
//               title: resultcolumn.title,
//               dataIndex: resultcolumn.data,
//               key: resultcolumn.name,
//               ...getColumnSearchProps(resultcolumn.data),
//               sorter: (a, b) =>
//                 a instanceof String || null
//                   ? a.userInfo.localeCompare(b.userInfo)
//                   : a.userInfo - b.userInfo,
//             }))
//           : null
//       )
//     );
//     setColumnsSampleApi(mapColumnsSample[0]);
//     setColumnsResultsApi(mapColumnsSample[1]);
//     console.log("userinfoSample", userInfo);
//     console.log("mapColumnsSample", mapColumnsSample);
//   }, [columnsData, userInfo]);


const handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...pagination };
    pager.current = pagination.current;
    setPagination(pager);
  };


    return(
        <>
         <Portlet>
              <PortletBody fit={true}>
                <PortletHeader title={columnsData.pagedetails.sdcid} />
                <Table
                  style={{ backgroundColor: "white" }}
                  columns={columnsSampleApi}
                  dataSource={dataSourceSample}
                  // pagination={pagination}
                />
              </PortletBody>
            </Portlet>
            <Portlet>
              <PortletBody fit={true}>
                <PortletHeader title="Results" />
                <Table
                  style={{ backgroundColor: "white" }}
                  columns={columnsResultsApi}
                  dataSource={dataSourceSample}
                  // pagination={pagination}
                  onChange={handleTableChange}
                />
              </PortletBody>
            </Portlet>
        </>
    )
}