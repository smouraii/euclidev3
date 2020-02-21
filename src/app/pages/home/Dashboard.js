import React, { useMemo } from "react";
// import { useSelector } from "react-redux";
import {
  Portlet,
  PortletBody
} from "../../partials/content/Portlet";
// import { metronic } from "../../../_metronic";

import SalesBarChart from "../../widgets/SalesBarChart";
import MyResponsivePie from "../../widgets/PieChart";
import pieData from "./data/pieData.json";
import MyResponsiveBar from "../../widgets/BarChart";
import barData from "./data/barData.json";
import DatePickerComp from "../../widgets/DatePicker";


export default function Dashboard() {
  // const  {}} = useSelector(
  //   state => ({
  //     brandColor: metronic.builder.selectors.getConfig(
  //       state,
  //       "colors.state.brand"
  //     ),
  //     dangerColor: metronic.builder.selectors.getConfig(
  //       state,
  //       "colors.state.danger"
  //     ),
  //     successColor: metronic.builder.selectors.getConfig(
  //       state,
  //       "colors.state.success"
  //     ),
  //     primaryColor: metronic.builder.selectors.getConfig(
  //       state,
  //       "colors.state.primary"
  //     )
  //   })
  // );


  return (
    <>
  { /*   <div className="row">
        <div className="col-xl-6">
          <div className="row row-full-height">
            <div className="col-sm-12 col-md-12 col-lg-6">
              <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
                <PortletBody fluid={true}>
                  <QuickStatsChart
                    value={570}
                    desc="Total Sales"
                    data={chartOptions.chart1.data}
                    color={chartOptions.chart1.color}
                    border={chartOptions.chart1.border}
                  />
                </PortletBody>
              </Portlet>

              <div className="kt-space-20" />

              <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
                <PortletBody fluid={true}>
                  <QuickStatsChart
                    value={680}
                    desc="Completed Transactions"
                    data={chartOptions.chart2.data}
                    color={chartOptions.chart2.color}
                    border={chartOptions.chart2.border}
                  />
                </PortletBody>
              </Portlet>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-6">
              <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
                <PortletBody fluid={true}>
                  <QuickStatsChart
                    value="234+"
                    desc="Transactions"
                    data={chartOptions.chart3.data}
                    color={chartOptions.chart3.color}
                    border={chartOptions.chart3.border}
                  />
                </PortletBody>
              </Portlet>

              <div className="kt-space-20" />

              <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
                <PortletBody fluid={true}>
                  <QuickStatsChart
                    value="4.4M$"
                    desc="Paid Commissions"
                    data={chartOptions.chart4.data}
                    color={chartOptions.chart4.color}
                    border={chartOptions.chart4.border}
                  />
                </PortletBody>
              </Portlet>
            </div>
          </div>
        </div>
  
        <div className="col-xl-6">
          <Portlet fluidHeight={true}>
            <PortletHeader
              title="Order Statistics"
              toolbar={
                <PortletHeaderToolbar>
                  <PortletHeaderDropdown />
                </PortletHeaderToolbar>
              }
            />

            <PortletBody>
              <OrderStatisticsChart />
            </PortletBody>
          </Portlet>
        </div>
      </div>
  */}
      <Portlet>
        <PortletBody fit={true}>
        <div className="d-flex flex-row-reverse bd-highlight">
        <div className="p-2 bd-highlight" style={{ margin:20  }}>
       <DatePickerComp />
       </div>
       </div>
          <div className="row row-no-padding row-col-separator-x1">
          <div className="col-xl-12">
          <div className="row d-flex justify-content-center">
                      <h1>PieChart</h1> 
                    </div>
              <MyResponsivePie
                title="Revenue Change "
                data={pieData}
                desc="Revenue change breakdown by cities"
              />
            </div>
            <div className="row d-flex justify-content-center">
                      <h1>Barchat</h1> 
                    </div>
            <div className="col-xl-12">
              <MyResponsiveBar 
                title="Bar chart"
                data={barData}
                desc="this is a Bar chart"
              />
            </div> 
            <div className="row d-flex justify-content-center">
                      <h1>SalesBarChart</h1> 
                    </div>
            <div className="col-xl-12">
              <SalesBarChart
                title="Daily Sales"
                desc="Check out each column for more details"
              />
            </div>
          </div>
        </PortletBody>
      </Portlet>

     {/* <div className="row">
        <div className="col-xl-4">
          <DownloadFiles />
        </div>
        <div className="col-xl-4">
          <NewUsers />
        </div>
        <div className="col-xl-4">
          <LatestUpdates />
        </div>
      </div>

       <div className="row">
        <div className="col-xl-8"></div>
        <div className="col-xl-4">
          <AuthorsProfit />
        </div>
      </div> 

      <div className="row">
        <div className="col-xl-8">
          <BestSellers />
        </div>
        <div className="col-xl-4">
          <RecentActivities />
        </div>
      </div>
     */}
    </>
  );
}
