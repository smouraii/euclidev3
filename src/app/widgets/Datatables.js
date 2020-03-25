import React from 'react';
import { MDBDataTable } from 'mdbreact';

const Datatable = () => {
  const data = {
    columns: [
      {
        label: 'Status',
        field: 'Status',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Number Request',
        field: 'NumRequest',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Customer',
        field: 'Customer',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Description',
        field: 'Description',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Cration Date',
        field: 'CrateDt',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Conclusion',
        field: 'Conclusion',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Donwload latest Report',
        field: 'DllLatestReport',
        sort: 'asc',
        width: 100
      }
    ],
    rows: [
      {
        Status: 'Tiger Nixon',
        NumRequest: 'System Architect',
        Customer: 'Edinburgh',
        Description: '61',
        CrateDt: '2011/04/25',
        Conclusion: '$320'
      },
      {
        Status: 'Garrett Winters',
        NumRequest: 'Accountant',
        Customer: 'Tokyo',
        Description: '63',
        CrateDt: '2011/07/25',
        Conclusion: '$170'
      },
      {
        Status: 'Ashton Cox',
        NumRequest: 'Junior Technical Author',
        Customer: 'San Francisco',
        Description: '66',
        CrateDt: '2009/01/12',
        Conclusion: '$86'
      },
      {
        Status: 'Cedric Kelly',
        NumRequest: 'Senior Javascript Developer',
        Customer: 'Edinburgh',
        Description: '22',
        CrateDt: '2012/03/29',
        Conclusion: '$433'
      },
      {
        Status: 'Airi Satou',
        NumRequest: 'Accountant',
        Customer: 'Tokyo',
        Description: '33',
        CrateDt: '2008/11/28',
        Conclusion: '$162'
      },
      {
        Status: 'Brielle Williamson',
        NumRequest: 'Integration Specialist',
        Customer: 'New York',
        Description: '61',
        CrateDt: '2012/12/02',
        Conclusion: '$372'
      },
      {
        Status: 'Herrod Chandler',
        NumRequest: 'Sales Assistant',
        Customer: 'San Francisco',
        Description: '59',
        CrateDt: '2012/08/06',
        Conclusion: '$137'
      },
      {
        Status: 'Rhona Davidson',
        NumRequest: 'Integration Specialist',
        Customer: 'Tokyo',
        Description: '55',
        CrateDt: '2010/10/14',
        Conclusion: '$327'
      },
      {
        Status: 'Colleen Hurst',
        NumRequest: 'Javascript Developer',
        Customer: 'San Francisco',
        Description: '39',
        CrateDt: '2009/09/15',
        Conclusion: '$205'
      },
      {
        Status: 'Sonya Frost',
        NumRequest: 'Software Engineer',
        Customer: 'Edinburgh',
        Description: '23',
        CrateDt: '2008/12/13',
        Conclusion: '$103'
      },
      {
        Status: 'Jena Gaines',
        NumRequest: 'Customer ManDescriptionr',
        Customer: 'London',
        Description: '30',
        CrateDt: '2008/12/19',
        Conclusion: '$90'
      },
      {
        Status: 'Quinn Flynn',
        NumRequest: 'Support Lead',
        Customer: 'Edinburgh',
        Description: '22',
        CrateDt: '2013/03/03',
        Conclusion: '$342'
      },
      {
        Status: 'Charde Marshall',
        NumRequest: 'Regional Director',
        Customer: 'San Francisco',
        Description: '36',
        CrateDt: '2008/10/16',
        Conclusion: '$470'
      },
      {
        Status: 'Haley Kennedy',
        NumRequest: 'Senior Marketing Designer',
        Customer: 'London',
        Description: '43',
        CrateDt: '2012/12/18',
        Conclusion: '$313'
      },
      {
        Status: 'Tatyana Fitzpatrick',
        NumRequest: 'Regional Director',
        Customer: 'London',
        Description: '19',
        CrateDt: '2010/03/17',
        Conclusion: '$385'
      },
      {
        Status: 'Michael Silva',
        NumRequest: 'Marketing Designer',
        Customer: 'London',
        Description: '66',
        CrateDt: '2012/11/27',
        Conclusion: '$198'
      },
      {
        Status: 'Paul Byrd',
        NumRequest: 'Chief Financial Customerr (CFO)',
        Customer: 'New York',
        Description: '64',
        CrateDt: '2010/06/09',
        Conclusion: '$725'
      },
      {
        Status: 'Gloria Little',
        NumRequest: 'Systems Administrator',
        Customer: 'New York',
        Description: '59',
        CrateDt: '2009/04/10',
        Conclusion: '$237'
      },
      {
        Status: 'Bradley Greer',
        NumRequest: 'Software Engineer',
        Customer: 'London',
        Description: '41',
        CrateDt: '2012/10/13',
        Conclusion: '$132'
      },
      {
        Status: 'Dai Rios',
        NumRequest: 'Personnel Lead',
        Customer: 'Edinburgh',
        Description: '35',
        CrateDt: '2012/09/26',
        Conclusion: '$217'
      },
      {
        Status: 'Jenette Caldwell',
        NumRequest: 'Development Lead',
        Customer: 'New York',
        Description: '30',
        CrateDt: '2011/09/03',
        Conclusion: '$345'
      },
      {
        Status: 'Yuri Berry',
        NumRequest: 'Chief Marketing Customerr (CMO)',
        Customer: 'New York',
        Description: '40',
        CrateDt: '2009/06/25',
        Conclusion: '$675'
      },
      {
        Status: 'Caesar Vance',
        NumRequest: 'Pre-Sales Support',
        Customer: 'New York',
        Description: '21',
        CrateDt: '2011/12/12',
        Conclusion: '$106'
      },
      {
        Status: 'Doris Wilder',
        NumRequest: 'Sales Assistant',
        Customer: 'Sidney',
        Description: '23',
        CrateDt: '2010/09/20',
        Conclusion: '$85'
      },
      {
        Status: 'Angelica Ramos',
        NumRequest: 'Chief Executive Customerr (CEO)',
        Customer: 'London',
        Description: '47',
        CrateDt: '2009/10/09',
        Conclusion: '$1'
      },
      {
        Status: 'Gavin Joyce',
        NumRequest: 'Developer',
        Customer: 'Edinburgh',
        Description: '42',
        CrateDt: '2010/12/22',
        Conclusion: '$92'
      },
      {
        Status: 'Jennifer Chang',
        NumRequest: 'Regional Director',
        Customer: 'Singapore',
        Description: '28',
        CrateDt: '2010/11/14',
        Conclusion: '$357'
      },
      {
        Status: 'Brenden Wagner',
        NumRequest: 'Software Engineer',
        Customer: 'San Francisco',
        Description: '28',
        CrateDt: '2011/06/07',
        Conclusion: '$206'
      },
      {
        Status: 'Fiona Green',
        NumRequest: 'Chief Operating Customerr (COO)',
        Customer: 'San Francisco',
        Description: '48',
        CrateDt: '2010/03/11',
        Conclusion: '$850'
      },
      {
        Status: 'Shou Itou',
        NumRequest: 'Regional Marketing',
        Customer: 'Tokyo',
        Description: '20',
        CrateDt: '2011/08/14',
        Conclusion: '$163'
      },
      {
        Status: 'Michelle House',
        NumRequest: 'Integration Specialist',
        Customer: 'Sidney',
        Description: '37',
        CrateDt: '2011/06/02',
        Conclusion: '$95'
      },
      {
        Status: 'Suki Burks',
        NumRequest: 'Developer',
        Customer: 'London',
        Description: '53',
        CrateDt: '2009/10/22',
        Conclusion: '$114'
      },
      {
        Status: 'Prescott Bartlett',
        NumRequest: 'Technical Author',
        Customer: 'London',
        Description: '27',
        CrateDt: '2011/05/07',
        Conclusion: '$145'
      },
      {
        Status: 'Gavin Cortez',
        NumRequest: 'Team Leader',
        Customer: 'San Francisco',
        Description: '22',
        CrateDt: '2008/10/26',
        Conclusion: '$235'
      },
      {
        Status: 'Martena Mccray',
        NumRequest: 'Post-Sales support',
        Customer: 'Edinburgh',
        Description: '46',
        CrateDt: '2011/03/09',
        Conclusion: '$324'
      },
      {
        Status: 'Unity Butler',
        NumRequest: 'Marketing Designer',
        Customer: 'San Francisco',
        Description: '47',
        CrateDt: '2009/12/09',
        Conclusion: '$85'
      },
      {
        Status: 'Howard Hatfield',
        NumRequest: 'Customer ManDescriptionr',
        Customer: 'San Francisco',
        Description: '51',
        CrateDt: '2008/12/16',
        Conclusion: '$164'
      },
      {
        Status: 'Hope Fuentes',
        NumRequest: 'Secretary',
        Customer: 'San Francisco',
        Description: '41',
        CrateDt: '2010/02/12',
        Conclusion: '$109'
      },
      {
        Status: 'Vivian Harrell',
        NumRequest: 'Financial Controller',
        Customer: 'San Francisco',
        Description: '62',
        CrateDt: '2009/02/14',
        Conclusion: '$452'
      },
      {
        Status: 'Timothy Mooney',
        NumRequest: 'Customer ManDescriptionr',
        Customer: 'London',
        Description: '37',
        CrateDt: '2008/12/11',
        Conclusion: '$136'
      },
      {
        Status: 'Jackson Bradshaw',
        NumRequest: 'Director',
        Customer: 'New York',
        Description: '65',
        CrateDt: '2008/09/26',
        Conclusion: '$645'
      },
      {
        Status: 'Olivia Liang',
        NumRequest: 'Support Engineer',
        Customer: 'Singapore',
        Description: '64',
        CrateDt: '2011/02/03',
        Conclusion: '$234'
      },
      {
        Status: 'Bruno Nash',
        NumRequest: 'Software Engineer',
        Customer: 'London',
        Description: '38',
        CrateDt: '2011/05/03',
        Conclusion: '$163'
      },
      {
        Status: 'Sakura Yamamoto',
        NumRequest: 'Support Engineer',
        Customer: 'Tokyo',
        Description: '37',
        CrateDt: '2009/08/19',
        Conclusion: '$139'
      },
      {
        Status: 'Thor Walton',
        NumRequest: 'Developer',
        Customer: 'New York',
        Description: '61',
        CrateDt: '2013/08/11',
        Conclusion: '$98'
      },
      {
        Status: 'Finn Camacho',
        NumRequest: 'Support Engineer',
        Customer: 'San Francisco',
        Description: '47',
        CrateDt: '2009/07/07',
        Conclusion: '$87'
      },
      {
        Status: 'Serge Baldwin',
        NumRequest: 'Data Coordinator',
        Customer: 'Singapore',
        Description: '64',
        CrateDt: '2012/04/09',
        Conclusion: '$138'
      },
      {
        Status: 'Zenaida Frank',
        NumRequest: 'Software Engineer',
        Customer: 'New York',
        Description: '63',
        CrateDt: '2010/01/04',
        Conclusion: '$125'
      },
      {
        Status: 'Zorita Serrano',
        NumRequest: 'Software Engineer',
        Customer: 'San Francisco',
        Description: '56',
        CrateDt: '2012/06/01',
        Conclusion: '$115'
      },
      {
        Status: 'Jennifer Acosta',
        NumRequest: 'Junior Javascript Developer',
        Customer: 'Edinburgh',
        Description: '43',
        CrateDt: '2013/02/01',
        Conclusion: '$75'
      },
      {
        Status: 'Cara Stevens',
        NumRequest: 'Sales Assistant',
        Customer: 'New York',
        Description: '46',
        CrateDt: '2011/12/06',
        Conclusion: '$145'
      },
      {
        Status: 'Hermione Butler',
        NumRequest: 'Regional Director',
        Customer: 'London',
        Description: '47',
        CrateDt: '2011/03/21',
        Conclusion: '$356'
      },
      {
        Status: 'Lael Greer',
        NumRequest: 'Systems Administrator',
        Customer: 'London',
        Description: '21',
        CrateDt: '2009/02/27',
        Conclusion: '$103'
      },
      {
        Status: 'Jonas Alexander',
        NumRequest: 'Developer',
        Customer: 'San Francisco',
        Description: '30',
        CrateDt: '2010/07/14',
        Conclusion: '$86'
      },
      {
        Status: 'Shad Decker',
        NumRequest: 'Regional Director',
        Customer: 'Edinburgh',
        Description: '51',
        CrateDt: '2008/11/13',
        Conclusion: '$183'
      },
      {
        Status: 'Michael Bruce',
        NumRequest: 'Javascript Developer',
        Customer: 'Singapore',
        Description: '29',
        CrateDt: '2011/06/27',
        Conclusion: '$183'
      },
      {
        Status: 'Donna Snider',
        NumRequest: 'Customer Support',
        Customer: 'New York',
        Description: '27',
        CrateDt: '2011/01/25',
        Conclusion: '$112'
      }
    ]
  };

  return (
   
    <div style={{margin:20}}>
    <MDBDataTable
      striped
      bordered
      hover
      data={data}
    />
    </div>
  );
}

export default Datatable;