import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import Switch from '@ql/components/uielements/switch';
import Select, { SelectOption } from '@ql/components/uielements/select';
import Form from '@ql/components/uielements/form';
import Box from '@ql/components/utility/box';
import LayoutWrapper from '@ql/components/utility/layoutWrapper';
import ContentHolder from '@ql/components/utility/contentHolder';
import basicStyle from '@ql/styles/constants';
import { switchOptions, selectOptions, defaultValues } from './config';
import CodeComponent from './CodeComponent.styles';

const CodeDisplayer = () => {
  const data = useSelector((state) => state.place.data);
  const loading = useSelector((state) => state.place.loading);
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    ...defaultValues,
    basicOptions: {
      lineNumbers: true,
      readOnly: false,
      tabSize: 4,
      mode: 'javascript',
      theme: 'zenburn',
    },
  });


  // console.log(data);
  // console.log(data.description);
  // console.log(data.url);

  const FormItem = Form.Item;
  const Option = SelectOption;

  function updateCode(mode, value) {
    setState({
      ...state,
      [mode]: value,
    });
  }
  function toggleOptions() {
    const { basicOptions } = state;
    return switchOptions.map((option, index) => {
      const id = option.id;
      const onChange = () => {
        basicOptions[id] = !basicOptions[id];
        setState({ ...state, basicOptions });
      };
      return (
        <FormItem label={option.title} key={option.id}>
          <Switch
            checked={option.value === basicOptions[id]}
            onChange={onChange}
          />
        </FormItem>
      );
    });
  }
  function selctOptions() {
    const { basicOptions } = state;
    return selectOptions.map((option, index) => {
      const id = option.id;
      const handleChange = (value) => {
        basicOptions[id] = isNaN(value) ? value : parseInt(value, 10);
        setState({ ...state, basicOptions });
      };
      return (
        <FormItem label={option.title} key={option.id}>
          <Select defaultValue={`${basicOptions[id]}`} onChange={handleChange}>
            {option.options.map((opt) => (
              <Option value={opt} key={opt}>
                {opt}
              </Option>
            ))}
          </Select>
        </FormItem>
      );
    });
  }

  const { rowStyle, colStyle, gutter } = basicStyle;

  return (
    <LayoutWrapper>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={24} sm={24} xs={24} style={colStyle}>
          <Box title="Json content from the QL API. Just for debugging!">
            <ContentHolder>
              {/* <CodeComponentToolbar className="isoOptionWrapper">
                {toggleOptions()}
                {selctOptions()}
              </CodeComponentToolbar> */}
              <CodeComponent
                value={state.basic}
                onChange={(value) => updateCode('basic', value)}
                options={state.basicOptions}
              />
            </ContentHolder>
          </Box>
        </Col>
      </Row>
    </LayoutWrapper>
  );
};

export default CodeDisplayer;
