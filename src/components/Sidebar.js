import React, { useState, Fragment }  from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

var classToggle;
var isCollapsed;
var Arrow;

export default function Sidebar() {

 const [toggled, setToggled] = useState(true);
  (!toggled) ? (classToggle = 'toggled') : (classToggle = '');

    return (
        <Fragment>
            <div className={'navbar-nav bg-sidebarmenu sidebar sidebar-dark accordion ' + classToggle} id="Sidebar">
                    <Item title='Sites' icon='fas fa-building' divider link='/site' togg={toggled}></Item>
                    <Item title='Admin' icon='far fa-user fa' divider link='/adm' togg={toggled}></Item>
                    <Item title='System' icon='far fa-cogs fa' divider link='/system' togg={toggled}></Item>
                    <div className="text-center d-none d-md-inline p-2">
                        <Button onClick={() => setToggled(!toggled)} className="rounded-circle border-0" id="sidebarToggle"></Button>
                    </div>
            </div>
          </Fragment>
    );
  }

  function Item(props) {
    let isActive = (props.link === window.location.pathname) ? 'nav-item active': 'nav-item';
    let isSubMenu = (props.children) ? 'collapse' : '';
    let divider;

    if (props.divider){
        (props.divider === '') ? (divider = <Divider/>) : (divider = <Divider title={ props.divider }/>)
    }

    const [collapsed, setCollapsed] = useState(true);

    if (!collapsed){
        isCollapsed = 'collapse show';
        Arrow = 'nav-link';
    } else {
        isCollapsed = 'collapse';
        Arrow = 'nav-link collapsed';
    };

    return (
        <Fragment>
        { divider }
        <li className={isActive}>
            <Link className={Arrow} data-toggle={isSubMenu} to={ props.link } onClick={() => setCollapsed(!collapsed)}>
                <i className={ props.icon }></i>
                { props.togg &&
                    <span>{ props.title }</span>
                }
            </Link>
            { props.children &&
                <SubMenu>
                    {props.children}
                </SubMenu>
            }
        </li>
        </Fragment>
    )
};

function SubMenu(props){
    return(
    <div className={isCollapsed}>
        <div className="bg-white py-2 collapse-inner rounded">
            {props.children}
        </div>
    </div>)
};

function Divider(props) {
    if (props.title){
        return(    
            <Fragment>
                <hr className="sidebar-divider d-none d-md-block" />
                <div className="sidebar-heading">
                    { props.title }
                </div>
            </Fragment>
        );
    } else {
        return (
            <hr className="sidebar-divider d-none d-md-block" />
        ); 
    }
};