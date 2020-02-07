import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import DocsPage from "./docs/DocsPage";
import { LayoutSplashScreen } from "../../../_metronic";
import FolderList from "./FolderList";
import NewRequest from "./NewRequest";
import Efiles from "./Efiles";
import Lims from "./Lims";
import MailServer from "./MailServer";
import DBConfiguration from "./DBConfiguration";
import SecurityRoles from "./SecurityRoles";
import UserConfiguration from "./UserConfiguration";
import AuditConfiguration from "./AuditConfiguration";
import EfilesConfiguration from "./EfilesConfiguration";
import BugReport from "./BugReport";
import ErrorLog from "./ErrorLog";
import AuditLog from "./AuditLog";
import WrappedInputComp from "./Lims";
import SwitchComp from "../../widgets/SwitchComp";
import WrappedLims from "./Lims";
import WrappedDbconfiguration from "./DBConfiguration";

const GoogleMaterialPage = lazy(() =>
  import("./google-material/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./react-bootstrap/ReactBootstrapPage")
);

export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        {/* <Route path="/builder" component={Builder} /> */}
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/docs" component={DocsPage} />
        <Route path="/folderlist" component={FolderList} />
        <Route path="/newrequest" component={NewRequest}/>
        <Route path="/efiles" component={Efiles}/>
        {/* this is a test */}
        <Route path="/lims" component={WrappedLims}/>
        <Route path="/switchComp" component={SwitchComp}/>
        <Route path="/DB-Configuration" component={WrappedDbconfiguration} />
        <Route path="/mailServer" component={MailServer} />

        {/* <Route path="/security-Roles" component={SecurityRoles} /> */}
        {/* <Route path="/users-configuration" component={UserConfiguration} />
        <Route path="/audit-configuration" component={AuditConfiguration} />
        <Route path="/efiles-configuration" component={EfilesConfiguration} />
        <Route path="/bugreport" component={BugReport} /> 
        <Route path="/errorlog" component={ErrorLog} />
        <Route path="/auditlog" component={AuditLog} /> */}
        
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
