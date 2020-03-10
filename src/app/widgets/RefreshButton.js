import React from 'react';
import {Button, Icon} from 'antd';

function RefreshButton() {
  
  function refreshPage() {
    window.location.reload(false);
  }
  
  return (
    <div>
      <Button onClick={refreshPage}><Icon type="retweet" /></Button>
    </div>
  );
}

export default RefreshButton;