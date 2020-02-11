import React from "react";
import { Tabs, Icon, Button } from "antd";
import { Portlet, PortletBody } from "../../partials/content/Portlet";


const { TabPane } = Tabs;

export default function AuditConfiguration (){

return(
    <>
    <Portlet>
    <PortletBody>
  <Tabs defaultActiveKey="2">
    <TabPane
      tab={
        <span>
          <Icon type="apple" />
          Tab 1
        </span>
      }
      key="1"
    >
      Tab 1
    </TabPane>
    <TabPane
        tab={
            <span>
                <Icon type=""></Icon>
                Tab 2
            </span>
        }
        key="2"
        >
        		<div class="form row">
						<div class="col-md-12">

							<div class="row">
								<div class="col-md-6">

									<h3 class="form-section">audit bugReport api</h3>

									<div class="form-group">
										<div class="input-group">
											<input name="apiURL" class="form-control" value="${bugTrackerUrl}"/>
											<span class="input-group-btn">
												<Button id="apiURL">Update</Button>
											</span>
										</div>
									</div>

								</div>
								<div class="col-md-6">
									<h3 class="form-section">bugReport synchronization</h3>

									<table class="table table-hover table-bordered">
										<tbody><tr>
											<td>
												 issueReport customFields
											</td>
											<td>
												<Button class="btn default" id="customFieldSync">issueReport synchronize</Button>
											</td>
										</tr>
										<tr>
											<td>
												 issueReport categories
											</td>
											<td>
												<Button class="btn default" id="categoriesSync">issueReport synchronize</Button>
											</td>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

    </TabPane>
    <TabPane
      tab={
        <span>
          <Icon type="android" />
          Tab 3
        </span>
      }
      key="3"
    >
      Tab 3
    </TabPane>
  </Tabs>
  </PortletBody>
  </Portlet>
  </>
);
}