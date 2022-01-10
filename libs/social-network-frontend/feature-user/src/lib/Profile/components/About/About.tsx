import React, { useState } from 'react';
import {
  MDBCard,
  MDBCol,
  MDBRow,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import './About.scss';
import WorkAndEducation from './WorkAndEducation';
import Contact from './Contact';
import { Profile } from '@sn-htc/social-network-frontend/data-access-user';
import Info from './Info';

interface AboutProps {
  currentUserId: string;
  userId: string;
  profile: Profile;
}

const About = (props: AboutProps) => {
  const [tabActive, setTabActive] = useState('workAndEducation');

  const handleTabsClick = (value: string) => {
    if (value === tabActive) {
      return;
    }

    setTabActive(value);
  };
  return (
    <MDBCard className='tab-profile pt-3 pe-5 pb-4 ps-4'>
      <h5>About</h5>
      <MDBRow>
        <MDBCol
          size='4'
          className='border-end about-nav'
          style={{ borderColor: 'rgba(82, 85, 90, .6)' }}
        >
          <MDBTabs className='flex-column'>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleTabsClick('workAndEducation')}
                active={tabActive === 'workAndEducation'}
              >
                Work and Education
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleTabsClick('contact')}
                active={tabActive === 'contact'}
              >
                Contact
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleTabsClick('basicInfo')}
                active={tabActive === 'basicInfo'}
              >
                Basic Info
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol size='8'>
          <MDBTabsContent>
            <MDBTabsPane
              show={tabActive === 'workAndEducation'}
              key={'workAndEducation' + Math.random() * 100}
            >
              <WorkAndEducation
                currentUserId={props.currentUserId}
                userId={props.userId}
              />
            </MDBTabsPane>
            <MDBTabsPane
              show={tabActive === 'contact'}
              key={'contact' + Math.random() * 100}
            >
              <Contact
                currentUserId={props.currentUserId}
                userId={props.userId}
                profile={props.profile}
              />
            </MDBTabsPane>
            <MDBTabsPane
              show={tabActive === 'basicInfo'}
              key={'basicInfo' + Math.random() * 100}
            >
              <Info
                currentUserId={props.currentUserId}
                userId={props.userId}
                profile={props.profile}
              />
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
};

export default About;
