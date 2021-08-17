import React from 'react';
import { Slider } from './index';

class LabeledSlider extends React.Component
{
    render()
    {
        return (
            <div 
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto',
                    gridColumnGap: '40px',
                    alignItems: 'center',
                }}
            >
                <label>{this.props.label}</label>
                <div
                    style={{
                        position: 'relative',
                        left: '100%',
                        transform: 'translateX(-100%)',
                        width: 'max-content',
                    }}
                >
                    <Slider 
                        min={this.props.min}
                        max={this.props.max}
                        step={this.props.step}
                        value={this.props.value}
                        onChange={(event) => { this.props.onChange(event); }}
                        width={this.props.width}
                    />
                </div>
            </div>
        );
    }
}

export { LabeledSlider };