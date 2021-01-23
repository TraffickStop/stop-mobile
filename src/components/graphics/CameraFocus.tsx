import CSS from 'csstype';
import { withIonLifeCycle } from '@ionic/react';
import React from 'react';

interface CameraFocusProps {
    width: number;
    height: number;
    color: string;
    style: CSS.Properties;
}

interface CameraFocusPoints {
    p1?: string;
    p2?: string;
    p3?: string;
    p4?: string;
    p5?: string;
    p6?: string;
    p7?: string;
    p8?: string;
}

interface CameraFocusState {
    points: CameraFocusPoints;
    pathStyle: CSS.Properties;
}

class CameraFocus extends React.Component<CameraFocusProps> {
    state: CameraFocusState = {
        points: {},
        pathStyle: {}
    }

    ionViewDidEnter() {
        const h = this.props.height;
        const w = this.props.width;

        this.setState({
            points: {
                p1: `M0 ${h * 0.25} L0 0`,
                p2: `M0 0 L${w * 0.25} 0`,
                p3: `M${w * 0.75} 0 L${w} 0`,
                p4: `M${w} 0 L${w} ${h * 0.25}`,
                p5: `M${w} ${h * 0.75} L${w} ${h}`,
                p6: `M${w} ${h} L${w * 0.75} ${h}`,
                p7: `M${w * 0.25} ${h} L0 ${h}`,
                p8: `M0 ${h} L0 ${h * 0.75}`,
            },
            pathStyle: {
                stroke: this.props.color,
                strokeWidth: '5',
            }
        })
    }

    render() {
        return ( this.state.points &&
            <svg width={this.props.width} height={this.props.height} style={this.props.style}>
                <g fill="none">
                    <path d={this.state.points.p1} style={this.state.pathStyle}/>
                    <path d={this.state.points.p2} style={this.state.pathStyle}/>
                    <path d={this.state.points.p3} style={this.state.pathStyle}/>
                    <path d={this.state.points.p4} style={this.state.pathStyle}/>
                    <path d={this.state.points.p5} style={this.state.pathStyle}/>
                    <path d={this.state.points.p6} style={this.state.pathStyle}/>
                    <path d={this.state.points.p7} style={this.state.pathStyle}/>
                    <path d={this.state.points.p8} style={this.state.pathStyle}/>
                </g>
            </svg>
        )
    }
}

export default withIonLifeCycle(CameraFocus);