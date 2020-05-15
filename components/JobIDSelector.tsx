import { Select, Divider, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Option } = Select;

function JobIDSelector(props: {
  onSelectorChange: (value: Array<string>) => void
}) {
  const [items, setItems] = useState<Array<string>>([])
  const [name, setName] =  useState<string>('')

  const addItem = () => {
    if (name == null || name.length === 0) {
      return
    }
    setItems([...items, name])
    setName('')
  };

  return (
    <Select
      mode="multiple"
      style={{ width: '70%' }}
      placeholder="Job IDs you're interested"
      onChange={props.onSelectorChange}
      dropdownRender={menu => (
        <div>
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
            <Input 
              style={{ flex: 'auto' }} 
              value={name} 
              onChange={event => {
                  setName(event.target.value)
              }} />
            <a
              style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
              onClick={addItem}
            >
              <PlusOutlined /> Add Job ID
            </a>
          </div>
        </div>
      )}
    >
      {items.map(item => (
        <Option key={item} value={item}>{item}</Option>
      ))}
    </Select>
  );
}

export default JobIDSelector
