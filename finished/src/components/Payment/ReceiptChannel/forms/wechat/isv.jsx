/**
 * Create by liukang on 2018/03/06
 * */
import React, { PropTypes } from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

const form = ({
                 item,
                 getFieldDecorator,
}) => {
  const FormItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  return (
    <div>
      <FormItem label="appId" {...FormItemLayout}>
        {getFieldDecorator('appId', {
          initialValue: item.appId,
          rules: [{
            pattern: /^[a-zA-Z0-9]{1,32}$/,
            message: 'appId输入不合法！',
          }],
        })(<Input type="text" />)}
      </FormItem>
      <FormItem label="商户号" {...FormItemLayout}>
        {getFieldDecorator('mchId', {
          initialValue: item.mchId,
          rules: [{
            message: '请输入商户号！',
            required: true,
          }],
        })(<Input type="text" />)}
      </FormItem>
    </div>
  );
};

form.propTypes = {
  item: PropTypes.object,
  getFieldDecorator: PropTypes.func,
};

export default form;
