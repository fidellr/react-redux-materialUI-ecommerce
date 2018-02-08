import React from 'react';
import Reboot from 'material-ui/Reboot'
import TopBar from '../containers/rootPartial/RootComponentContainer'

const Header = (props) => (
    <div>
        <Reboot />
        <TopBar children={props.children} />
    </div>
)
export default (Header)