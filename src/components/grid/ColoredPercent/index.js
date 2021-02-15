import React from 'react';

import { ColoredWrap } from "./styles";

const ColoredPercent = ({item}) => {
  const value = ((item.o - item.c) / item.o)
  const sign = Math.sign(value) === 1 ? '+' : '–'
  const formattedValue = Math.abs(value).toFixed(2)
  const formattedString = isFinite(value) ?`${sign}${formattedValue}%` : '0%'
  return (
    <ColoredWrap sign={sign}>
      {formattedString}
    </ColoredWrap>
  )
}

export default React.memo(ColoredPercent)