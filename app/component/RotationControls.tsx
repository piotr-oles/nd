
import Slider from 'material-ui/Slider';
import * as React from 'react';
import { SFC } from 'react';
import { Angle } from '../../src/math/Angle';
import { ControlsWrapper, ControlWrapper, LabelWrapper, SliderWrapper } from './RotationControls.s';
import degrees = Angle.degrees;

export namespace RotationControls {
  export type Axis = number;
  export type Theta = number;
  export type Rotation = [Axis, Axis, Theta];
  export type Props = {
    rotations: Rotation[];
    onRotationChange: (rotation: Rotation) => void;
  };
}

export const RotationControls: SFC<RotationControls.Props> = props => 
  <ControlsWrapper>
    {props.rotations.map(([axisA, axisB, theta]) =>
      <ControlWrapper key={`${axisA}x${axisB}`}>
        <LabelWrapper>
          {axisA + 1}x{axisB + 1}: {Math.round(degrees(theta))}°
        </LabelWrapper>
        <SliderWrapper>
          <Slider
            value={theta}
            onChange={(event, theta) => props.onRotationChange([axisA, axisB, theta])}
            min={-Math.PI}
            max={Math.PI}
            sliderStyle={{margin: 0}}
          />
        </SliderWrapper>
      </ControlWrapper>
    )}
  </ControlsWrapper>;
