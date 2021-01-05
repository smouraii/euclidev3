import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar,
} from "../../partials/content/Portlet";
import { metronic } from "../../../_metronic";
import QuickStatsChart from "../../widgets/QuickStatsChart";
import OrderStatisticsChart from "../../widgets/OrderStatisticsChart";
import MyResponsivePie from "../../widgets/PieChart";
import pieData from "./data/pieData.json";
import MyResponsiveBar from "../../widgets/BarChart";
import barData from "./data/barData.json";
import DatePickerComp from "../../widgets/DatePicker";

import OrdersWidget from "../../widgets/OrdersWidget";
import SalesBarChart from "../../widgets/SalesBarChart";
import DownloadFiles from "../../widgets/DownloadFiles";
import NewUsers from "../../widgets/NewUsers";
import LatestUpdates from "../../widgets/LatestUpdates";
import BestSellers from "../../widgets/BestSellers";
import RecentActivities from "../../widgets/RecentActivities";
import PortletHeaderDropdown from "../../partials/content/CustomDropdowns/PortletHeaderDropdown";
import redaxios from "redaxios";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [title,setTitle]= useState(null);
  // const [dataPie, setDataPie] = useState(null);
  // const [dataSourcePie, setDataSourcePie] = useState([]);
  // const [dataRequest, setDataRequest] = useState([])

    //API GET HISTOGRAMME (BARCHART)
  React.useEffect(() => {
    redaxios
      .get("https://run.mocky.io/v3/a9305026-5281-4d60-8d7f-3b06f6b28988")
      .then((res) => setData(res.data));
  }, []);

  // API GET PIECHART
  // React.useEffect(() => {
  //   redaxios
  //     .get("https://run.mocky.io/v3/a9305026-5281-4d60-8d7f-3b06f6b28988")
  //     .then((res) => setDataPie(res.data));
  // }, []);

  //API REQUESTS TOTAL
    // React.useEffect(() => {
  //   redaxios
  //     .get("URL")
  //     .then((res) => setDataRequest(res.data));
  // }, []);

  //map for Requests
  // React.useEffect(()=>{
  //   if(!dataRequest) return;
  //   const mapRequestData = dataRequest.map((datarow)=>(
  //       {
  //           "status": "OnHold",
  //           "creationDate": "15-10-2020 00:00:00"
  //       },
  //       {
  //           "status": "OnHold",
  //           "creationDate": "15-10-2020 00:00:00"
  //       },
  //       {
  //           "status": "Open",
  //           "creationDate": "15-10-2020 05:49:00"
  //       },
  //       {
  //           "status": "Draft",
  //           "creationDate": "24-09-2020 00:00:00"
  //       },
  //       {
  //           "status": "Open",
  //           "creationDate": "23-04-2020 10:35:00"
  //       }
  //   ))
  // })

  //map for PieChart
  // React.useEffect(()=>{
  //   if(!dataSource) return;
  //   const mapPieData = dataPie.map((datarow)=>(    {
  //     "id": datarow.id,
  //     "label": datarow.label,
  //     "value":datarow.value,
  //     "color": datarow.color
  //   }))
  // });
//

  //map for Histogramme
  React.useEffect(() => {
    if (!data) return;
    const mapData = data.data.map((datarow) => ({
      range: datarow.range,
      Accepted: datarow.Accepted,
      Cancelled: datarow.Cancelled,
      Complete: datarow.Complete,
      Completed: datarow.Completed,
      Denied: datarow.Denied,
      Draft: datarow.Draft,
      Initial: datarow.Initial,
      OnHold: datarow.OnHold,
      Open: datarow.Open,
      PendingAcceptance: datarow.PendingAcceptance,
      Received: datarow.Received,
      Rejected: datarow.Rejected,
      Released: datarow.Released,
      Reported: datarow.Reported,
      Reviewed: datarow.Reviewed,
      Template: datarow.Template,
      FavoriteTemplate: datarow.FavoriteTemplate
    }));
    setDataSource(mapData);
    console.log("mapData", mapData);
  }, [data]);

  return (
    <>
      <div className="row d-flex justify-content-center">
          {/* <div className="col-xl-12">
            <div className="row row-full-height">
              <div className="col-sm-12 col-md-12 col-lg-4">
                <Portlet className="kt-portlet--height-fluid">
                  <div className="kt-widget1">
                    <div className="kt-widget1__item ng-star-inserted">
                      <div className="kt-widget1__info">
                        <h3 className="kt-widget1__title">
                          Total Requests Submitted
                        </h3>
                        <span className="kt-widget1__desc">
                          Submitted through Euclide
                        </span>
                      </div>
                      <span className="kt-widget1__number kt-font-danger">
                        450 
                        {/* {data.request} 
                      </span>
                    </div>
                  </div>
                </Portlet>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4">
                <Portlet className="kt-portlet--height-fluid">
                  <div className="kt-widget1">
                    <div className="kt-widget1__item ng-star-inserted">
                      <div className="kt-widget1__info">
                        <h3 className="kt-widget1__title">
                          Requests In Proccessing
                        </h3>
                        <span className="kt-widget1__desc">Multiple Status</span>
                      </div>
                      <span className="kt-widget1__number kt-font-warning">
                        150
                      </span>
                    </div>
                  </div>
                </Portlet>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4">
                <Portlet className="kt-portlet--height-fluid">
                  <div className="kt-widget1">
                    <div className="kt-widget1__item ng-star-inserted">
                      <div className="kt-widget1__info">
                        <h3 className="kt-widget1__title">Requests Completed</h3>
                        <span className="kt-widget1__desc">
                          Lifetime Requests Completed
                        </span>
                      </div>
                      <span className="kt-widget1__number kt-font-success">
                        300
                      </span>
                    </div>
                  </div>
                </Portlet>
              </div>
            </div>
          </div> */}

        <div className="col-xl-12">
          <div className="row row-full-height">
            <div className="col-sm-12 col-md-12 col-lg-6">
              <Portlet
                className="kt-portlet--height-fluid kt-portlet--border-bottom-dark"
                fluidHeight={true}
              >
                <PortletHeader
                  // title={data.title}
                  // toolbar={
                  //   <PortletHeaderToolbar>
                  //     <PortletHeaderDropdown />
                  //   </PortletHeaderToolbar>
                  // }
                />

                <PortletBody>
                {dataSource.length ? <MyResponsiveBar data={dataSource} /> : "error"}           
                 </PortletBody>
              </Portlet>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6">
              <Portlet
                className="kt-portlet--height-fluid kt-portlet--border-bottom-dark"
                fluidHeight={true}
              >
                <PortletHeader
                  title="Sample per Request"
                  // toolbar={
                  //   <PortletHeaderToolbar>
                  //     <PortletHeaderDropdown />
                  //   </PortletHeaderToolbar>
                  // }
                />

                <PortletBody>
                  <MyResponsivePie data={pieData} />
                </PortletBody>
              </Portlet>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
