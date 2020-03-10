import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
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

export default function Dashboard() {
  const { brandColor, dangerColor, successColor, primaryColor } = useSelector(
    state => ({
      brandColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.brand"
      ),
      dangerColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.danger"
      ),
      successColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.success"
      ),
      primaryColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.primary"
      )
    })
  );

  const chartOptions = useMemo(
    () => ({
      chart1: {
        data: [10, 14, 18, 11, 9, 12, 14, 17, 18, 14],
        color: brandColor,
        border: 3
      },

      chart2: {
        data: [11, 12, 18, 13, 11, 12, 15, 13, 19, 15],
        color: dangerColor,
        border: 3
      },

      chart3: {
        data: [12, 12, 18, 11, 15, 12, 13, 16, 11, 18],
        color: successColor,
        border: 3
      },

      chart4: {
        data: [11, 9, 13, 18, 13, 15, 14, 13, 18, 15],
        color: primaryColor,
        border: 3
      }
    }),
    [brandColor, dangerColor, primaryColor, successColor]
  );

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-xl-12">
          <div className="row row-full-height">
            <div className="col-sm-12 col-md-12 col-lg-4">
              <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
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
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4">
              <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
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
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4">
              <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
              <PortletHeader
             title="Daily Sales" />
                <PortletBody fluid={true}>
                <SalesBarChart
                desc="Check out each column for more details"
              />
                </PortletBody>
              </Portlet>
            </div>
          </div>
        </div>
        


        <div className="col-xl-12">
          <div className="row row-full-height">
            <div className="col-sm-12 col-md-12 col-lg-6">
            <Portlet fluidHeight={true}>
            <PortletHeader
              title="Bar Chart"
              // toolbar={
              //   <PortletHeaderToolbar>
              //     <PortletHeaderDropdown />
              //   </PortletHeaderToolbar>
              // }
            />

            <PortletBody>
            <MyResponsiveBar 
                data={barData}
              />
            </PortletBody>
          </Portlet>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6">
            <Portlet fluidHeight={true}>
            <PortletHeader
              title="Pie Chart"
              // toolbar={
              //   <PortletHeaderToolbar>
              //     <PortletHeaderDropdown />
              //   </PortletHeaderToolbar>
              // }
            />

            <PortletBody>
            <MyResponsivePie
                data={pieData}
              />
            </PortletBody>
          </Portlet>
            </div>
          </div>
        </div>

      </div>

    </>
  );
}