import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown-modal';
import { FaArrowRight, FaSortDown } from 'react-icons/fa';
import { MdSettings, MdInvertColors } from 'react-icons/md';
import { GoOrganization } from 'react-icons/go';

import changeAppTheme from '../../../helpers/change_theme';

const HeaderOptDropdownComp = (props) => {
  const myAppTheme = window.localStorage.getItem('myAppTheme');
  
  return (
    <Dropdown
      visible={props.dropdown_visible}
      onButtonClick={() => {
        props.setParentState({ dropdown_visible: true });
      }}
      onClose={() => {
        props.setParentState({ dropdown_visible: false });
      }}
      showArrow={true}
      arrowPosition={{ right: '0px' }}
      position={{
        right: '20px',
        top: '55px'
      }}
      modalBackground='var(--background-color)'
      modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
      modalBorder={false}
      modalContent={() => (
        <div>
          <div className='any-dropdown-content-item-999'
          >Signed in as <span style={{fontWeight: 'bold'}}>
            {props.auth.name.split(' ')[0]}</span>
          </div>

          <Link to='/settings'>
            <div className='any-dropdown-content-item-999'><MdSettings style={{
              marginRight: '8px',
              marginBottom: '-2px'
            }}/>Settings</div>
          </Link>

          <div className='any-dropdown-content-item-999'
            onClick={(e) => {
              changeAppTheme(myAppTheme === 'darkOnly' ? 'lightOnly' : 'darkOnly')
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          ><MdInvertColors style={{
            marginRight: '8px',
            marginBottom: '-2px'
          }}/>
            Dark theme
            <div style={myAppTheme === 'darkOnly' ? {
              background: 'var(--theme-color)',
              height: '13px',
              width: '13px',
              border: '1px solid var(--theme-color)',
              marginLeft: '9px',
              borderRadius: '50%'
            } : {
              height: '13px',
              width: '13px',
              border: '1px solid var(--theme-color)',
              marginLeft: '9px',
              borderRadius: '50%'
            }}></div>
          </div>

          <Link to='/about'>
            <div className='any-dropdown-content-item-999'><GoOrganization style={{
              marginRight: '8px',
              marginBottom: '-2px'
            }}/>About</div>
          </Link>

          <a href='/auth/logout'>
            <div className='any-dropdown-content-item-999'><FaArrowRight style={{
              marginRight: '8px',
              marginBottom: '-2px'
            }}/>Logout</div>
          </a>
        </div>
      )}
    >
      <div
        className='header-002-avatar-div'
        onClick={() => props.setParentState({ options_rodal_visible: true })}
      >
        <img src={props.auth.avatar_url}/>
        <FaSortDown style={{
          marginTop: '5px',
          marginLeft: '5px'
        }}/>
      </div>
    </Dropdown>
  );
}

export default HeaderOptDropdownComp;