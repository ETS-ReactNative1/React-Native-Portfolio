import React, {useState} from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import colors from '../../assets/config/colors';

const SliderWrapper = styled.View`
  justify-content: center;
`;

const ViewContainer = styled.View`
  align-self: center;
  justify-content: center;
`;
const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const LabelText = styled.Text`
  font-size: 12px;
`;

const Slider = () => {
  const [multiSliderValue, setMultiSliderValue] = useState([0, 10000000]);

  const multiSliderValuesChange = values => setMultiSliderValue(values);

  const price1 = multiSliderValue[0];
  const price2 = multiSliderValue[1];
  console.log(price1, price2);
  return (
    <ViewContainer>
      <SliderWrapper>
        <MultiSlider
          markerStyle={{
            ...Platform.select({
              ios: {
                height: 30,
                width: 30,
                shadowColor: '#000000',
                shadowOffset: {
                  width: 1,
                  height: 3,
                },
                shadowRadius: 1,
                shadowOpacity: 0.1,
              },
              android: {
                height: 30,
                width: 30,
                borderRadius: 50,
                backgroundColor: colors.secondary,
              },
            }),
          }}
          pressedMarkerStyle={{
            ...Platform.select({
              android: {
                height: 30,
                width: 30,
                borderRadius: 20,
                backgroundColor: colors.secondary,
              },
            }),
          }}
          selectedStyle={{
            backgroundColor: colors.secondary,
          }}
          trackStyle={{
            backgroundColor: '#CECECE',
          }}
          touchDimensions={{
            height: 40,
            width: 40,
            borderRadius: 20,
            slipDisplacement: 40,
          }}
          values={[multiSliderValue[0], multiSliderValue[1]]}
          sliderLength={320}
          onValuesChange={multiSliderValuesChange}
          min={0}
          max={10000000}
          step={1}
          selectedStyle={{backgroundColor: colors.secondary, height: 4}}
          snapped
          allowOverlap={false}
          minMarkerOverlapDistance={30}
        />
        <LabelWrapper>
          <LabelText>
            Rp.{multiSliderValue[0].toLocaleString({maximumFractionDigits: 2})}
          </LabelText>
          <LabelText>
            Rp.{multiSliderValue[1].toLocaleString({maximumFractionDigits: 2})}
          </LabelText>
        </LabelWrapper>
      </SliderWrapper>
    </ViewContainer>
  );
};

export default Slider;
