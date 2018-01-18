import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import {white} from 'material-ui/styles/colors';


const GoogIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M457.732,216.625c2.628,14.041,4.063,28.743,4.063,44.098C461.796,380.688,381.481,466,260.204,466  c-116.023,0-210-93.977-210-210c0-116.023,93.977-210,210-210c56.704,0,104.077,20.867,140.44,54.73l-59.204,59.197v-0.135  c-22.046-21.002-50-31.762-81.236-31.762c-69.297,0-125.604,58.537-125.604,127.841c0,69.29,56.306,127.968,125.604,127.968  c62.87,0,105.653-35.965,114.46-85.312h-114.46v-81.902H457.732z"/>
    </SvgIcon>
);

const GoogleIcon = () => (
    <div>
        <GoogIcon color={white} viewBox='0 0 512 512' />
    </div>
);

export default GoogleIcon;