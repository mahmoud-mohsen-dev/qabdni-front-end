import React from 'react';

export type DivOrString = React.ReactElement<HTMLDivElement> | string;

export type FiveColorsType = 'indigo' | 'orange' | 'blue' | 'green' | 'pink';

export interface ValueItemType {
  name: string;
  color: 'indigo' | 'orange' | 'blue' | 'green' | 'pink';
}
