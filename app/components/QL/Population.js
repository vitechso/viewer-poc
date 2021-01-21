import React from 'react';
import { useSelector } from 'react-redux';
import { checkNull } from '@ql/lib/helpers/utils'
import GenericDataComponent from './GenericDataComponent';
import PopulationInstance from './PopulationInstance';
import TabbedCards from './TabbedCards'

const Population = () => {
  const data = useSelector((state) => state.place.data);

  const dataProperties = () =>
    [
      {
        name: 'Total population',
        key: 'populationTotal',
        value: checkNull(data?.populationTotal)
      },
      {
        name: 'Male population',
        key: 'populationMale',
        value: checkNull(data?.populationMale)
      },
      {
        name: 'Female population',
        key: 'populationFemale',
        value: checkNull(data?.populationFemale)
      },
      {
        name: 'Other population',
        key: 'populationOther',
        value: checkNull(data?.populationOther)
      },
      {
        name: 'Sentinels count',
        key: 'demographicsCountSentinels',
        value: checkNull(data?.demographicsCountSentinels)
      },
      {
        name: '+85 count',
        key: 'demographicsCount85Plus',
        value: checkNull(data?.demographicsCount85Plus)
      },
      {
        name: 'Teens count',
        key: 'demographicsCountTeens',
        value: checkNull(data?.demographicsCountTeens)
      }
    ];

  return (
    <TabbedCards title="Population 1900-2020">
      <PopulationInstance />
      <GenericDataComponent data={data} dataProperties={dataProperties} />
    </TabbedCards>
  );
}

export default Population;